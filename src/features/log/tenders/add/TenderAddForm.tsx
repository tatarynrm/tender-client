"use client";
import React, { useEffect, useState } from "react";
import {
  useForm,
  Controller,
  useFieldArray,
  SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Textarea,
  Button,
  Switch,
  Label,
  SelectTrigger,
  SelectValue,
  Select,
  SelectContent,
  SelectItem,
} from "@/shared/components/ui";
import AsyncSelect from "react-select/async";
import { default as ReactSelect } from "react-select";
import api from "@/shared/api/instance.api";
import { toast } from "sonner";
import { Minus, Plus } from "lucide-react";
import { MyTooltip } from "@/shared/components/Tooltips/MyTooltip";
import { useRouter } from "next/navigation";

import { useAuth } from "@/shared/providers/AuthCheckProvider";
import { useSockets } from "@/shared/providers/SocketProvider";


// ---------- Schemas ----------
const routeSchema = z.object({
  id: z.number().optional(),
  lat: z.number().optional(),
  lon: z.number().optional(),
  address: z.string().min(1, "Адреса обов'язкова"),
  ids_route_type: z.enum(["LOAD_FROM", "LOAD_TO"]),
  country: z.string().optional(),
  city: z.string().optional(),
  order_num: z.number(),
  // zam?:
  // zam_na_mici?:
});

const trailerSchema = z.object({
  ids_trailer_type: z.string(),
});

const cargoServerSchema = z.object({
  price: z.number().nullable().optional(),
  id_valut: z.number().optional(),
  id_client: z.number().optional().nullable(),
  load_info: z.string().optional(),
  crm_load_route_from: z.array(routeSchema).min(1),
  crm_load_route_to: z.array(routeSchema).min(1),
  crm_load_trailer: z.array(trailerSchema).min(1, "Оберіть тип транспорту"),
  is_price_request: z.boolean().optional(),
  is_collective: z.boolean().optional(),
  car_count_begin: z.number().min(1, "Мінімум 1").max(100, "Максимум 100"),
});

export type CargoServerFormValues = z.infer<typeof cargoServerSchema>;

// ---------- Nominatim Input ----------
interface NominatimInputProps {
  value: string;
  onChange: (
    address: string,
    lat?: number,
    lon?: number,
    country?: string,
    city?: string
  ) => void;
  placeholder?: string;
  defaultValue?: string;
}

const NominatimInput = ({
  value,
  onChange,
  placeholder,
  defaultValue,
}: NominatimInputProps) => {
  const [results, setResults] = useState<any[]>([]);
  const [query, setQuery] = useState(value || defaultValue || "");
  const [selected, setSelected] = useState<string | null>(value ? value : null); // якщо є value - вважаємо що обране

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length < 3 || selected) return; // не шукати, якщо вже selected
      try {
        const { data } = await api.get(`/nominatim/search?q=${query}`);
        setResults(data);
      } catch (err) {
        console.error(err);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query, selected]);

  return (
    <div className="relative">
      <Input
        value={query}
        placeholder={placeholder}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelected(null); // редагуємо – dropdown може відкриватися
        }}
      />
      {results.length > 0 && !selected && (
        <ul className="absolute z-10 bg-gray-300 dark:bg-slate-700 border w-full max-h-60 overflow-auto mt-1 rounded shadow">
          {results.map((r, idx) => (
            <li
              key={idx}
              className="p-1 cursor-pointer "
              onClick={() => {
                onChange(
                  r.name,
                  parseFloat(r.lat),
                  parseFloat(r.lon),
                  r.address.country_code,
                  r.address.city
                );
                setQuery(r.name);
                setSelected(r.display_name);
                setResults([]);
              }}
            >
              {r.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

interface LoadFormProps {
  defaultValues?: Partial<CargoServerFormValues> & {
    company_name?: string;
    id?: number;
  };
  isEdit?: boolean; // чи це режим редагування
}

// ---------- Main Component ----------
export default function TenderAddForm({
  defaultValues,
  isEdit = false,
}: LoadFormProps) {
  const [valutList, setValutList] = useState<
    { label: string; value: string | number }[]
  >([]);
  const [truckList, setTruckList] = useState<
    { label: string; value: string }[]
  >([]);

  const [loadSocket, setLoadSocket] = useState<any>(null);
  const [isNextCargo, setIsNextCargo] = useState(false);
  const [isLoadingSaveCargo, setIsLoadingSaveCargo] = useState(false);
  const [companyLabel, setCompanyLabel] = useState<string>("");
  const router = useRouter();

  const { profile } = useAuth();
  const {load} = useSockets();

  const form = useForm<CargoServerFormValues>({
    resolver: zodResolver(cargoServerSchema),
    defaultValues: {
      load_info: "",
      id_valut: 1,
      id_client: null,
      crm_load_route_from: [
        {
          address: "",
          lat: 0,
          lon: 0,
          ids_route_type: "LOAD_FROM",
          city: "",
          order_num: 1,
        },
      ],
      crm_load_route_to: [
        {
          address: "",
          lat: 0,
          lon: 0,
          ids_route_type: "LOAD_TO",
          city: "",
          order_num: 1,
        },
      ],
      crm_load_trailer: [],
      price: null,
      car_count_begin: 1,
      is_collective: false,
      is_price_request: false,
      ...defaultValues,
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = form;

  const {
    fields: fromFields,
    append: appendFrom,
    remove: removeFrom,
  } = useFieldArray({ control, name: "crm_load_route_from" });
  const {
    fields: toFields,
    append: appendTo,
    remove: removeTo,
  } = useFieldArray({ control, name: "crm_load_route_to" });

  const getFormData = async () => {
    try {
      const { data } = await api.get(
        "/tender/form-data/getCreateTenderFormData"
      );
      setValutList(
        data.data.valut_dropdown.map((v: any) => ({
          value: v.id,
          label: v.value,
        }))
      );
      setTruckList(
        data.data.trailer_type_dropdown.map((t: any) => ({
          value: t.id,
          label: t.value,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFormData();
  }, []);

  const onSubmit: SubmitHandler<CargoServerFormValues> = async (values) => {
    try {
      setIsLoadingSaveCargo(true);

      const payload = {
        ...values,
        ...(defaultValues?.id ? { id: defaultValues.id } : {}), // додаємо id, якщо він є
      };
      console.log(payload, "PAYLOAD");

      const { data } = await api.post("/crm/load/save", payload);

      //   if (Number(data.data[0])) {
      //     if (!isNextCargo) form.reset();
      //     if (defaultValues) {
      //       console.log(profile?.id, "PROFILE ID");

      //       socket.emit("send_update", {
      //         loadId: profile?.id,
      //         data: { status: "updated" },
      //       });
      //       toast.success("Успішне редагування заявки!");
      //       router.push("/log/cargo/active");
      //       refetch();
      //     } else {
      //       socket.emit("send_update", {
      //         loadId: profile?.id,
      //         data: { status: "updated" },
      //       });
      //       toast.success("Успішне створення заявки!");
      //       refetch();
      //     }
      //   }
    } catch (err) {
      console.error(err);
      toast.error("Не вдалося зберегти заявку!");
    } finally {
      setIsLoadingSaveCargo(false);
    }
  };

  // Тип для опцій компанії
  interface CompanyOption {
    value: number;
    label: string;
    [key: string]: any; // додаткові поля компанії, якщо потрібні
  }
  // Функція для завантаження опцій, приймає URL
  const loadOptionsFromApi = (url: string) => async (inputValue: string) => {
    if (!inputValue) return [];
    try {
      const response = await api.get<any>(
        `${url}/${encodeURIComponent(inputValue)}`
      );
      return response.data.map((company: { id: any; company_name: any }) => ({
        value: company.id,
        label: company.company_name,
        ...company, // весь об'єкт компанії, якщо потрібно
      }));
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    if (!defaultValues) return;

    form.reset({
      ...defaultValues,
    });
    // якщо передано назву компанії — підставляємо її в AsyncSelect
    if (defaultValues.company_name) {
      setCompanyLabel(defaultValues.company_name);
    }
  }, [defaultValues, form.reset]);

  return (
    <Card className="max-w-2xl mx-auto p-3 mb-20">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-20">
          {/* Routes */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              {fromFields.map((field, idx) => (
                <div key={field.id} className="flex items-center gap-2 mb-2">
                  <FormField
                    control={control}
                    name={`crm_load_route_from.${idx}.address`}
                    render={({ field: formField }) => (
                      <FormItem className="flex-1">
                        <FormLabel>
                          {`Адреса завантаження #${idx + 1}`}
                        </FormLabel>
                        <FormControl>
                          <NominatimInput
                            value={formField.value} // беремо value прямо з RHF
                            placeholder="Введіть адресу завантаження..."
                            onChange={(address, lat, lon, country, city) => {
                              formField.onChange(address); // RHF оновлює value
                              setValue(`crm_load_route_from.${idx}.lat`, lat);
                              setValue(`crm_load_route_from.${idx}.lon`, lon);
                              setValue(
                                `crm_load_route_from.${idx}.country`,
                                country
                              );
                              setValue(`crm_load_route_from.${idx}.city`, city);
                              clearErrors(`crm_load_route_from.${idx}.address`);
                            }}
                          />
                        </FormControl>
                        <FormMessage>
                          {errors.crm_load_route_from?.[idx]?.address?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                  {idx > 0 && (
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        removeFrom(idx);
                        setTimeout(() => {
                          const updated = form
                            .getValues("crm_load_route_from")
                            .map((r, i) => ({
                              ...r,
                              order_num: i + 1,
                            }));
                          form.setValue("crm_load_route_from", updated);
                        }, 0);
                      }}
                    >
                      <Minus />
                    </Button>
                  )}
                </div>
              ))}

              {fromFields.length < 4 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    appendFrom({
                      address: "",
                      lat: 0,
                      lon: 0,
                      ids_route_type: "LOAD_FROM",
                      city: "",
                      order_num: fromFields.length + 1, // ✅
                    })
                  }
                >
                  <Plus />
                </Button>
              )}
            </div>

            <div className="flex-1">
              {toFields.map((field, idx) => (
                <div key={field.id} className="flex items-center gap-2 mb-2">
                  <FormField
                    control={control}
                    name={`crm_load_route_to.${idx}.address`}
                    render={() => (
                      <FormItem className="flex-1">
                        <FormLabel>
                          {`Адреса розвантаження #${idx + 1}`}
                        </FormLabel>
                        <FormControl>
                          <NominatimInput
                            value={watch(`crm_load_route_to.${idx}.address`)}
                            placeholder="Введіть адресу розвантаження..."
                            onChange={(address, lat, lon, country, city) => {
                              setValue(
                                `crm_load_route_to.${idx}.address`,
                                address
                              );
                              setValue(`crm_load_route_to.${idx}.lat`, lat);
                              setValue(`crm_load_route_to.${idx}.lon`, lon);
                              setValue(
                                `crm_load_route_to.${idx}.country`,
                                country
                              );
                              setValue(`crm_load_route_to.${idx}.city`, city);
                              clearErrors(`crm_load_route_to.${idx}.address`);
                            }}
                          />
                        </FormControl>
                        <FormMessage>
                          {errors.crm_load_route_to?.[idx]?.address?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                  {idx > 0 && (
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        removeTo(idx);
                        setTimeout(() => {
                          const updated = form
                            .getValues("crm_load_route_to")
                            .map((r, i) => ({
                              ...r,
                              order_num: i + 1,
                            }));
                          form.setValue("crm_load_route_to", updated);
                        }, 0);
                      }}
                    >
                      <Minus />
                    </Button>
                  )}
                </div>
              ))}
              {toFields.length < 4 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    appendTo({
                      address: "",
                      lat: 0,
                      lon: 0,
                      ids_route_type: "LOAD_TO",
                      city: "",
                      order_num: toFields.length + 1, // ✅
                    })
                  }
                >
                  <Plus />
                </Button>
              )}
            </div>
          </div>
          {/* Company */}
          <FormField
            control={control}
            name="id_client"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Компанія</FormLabel>
                <FormControl>
                  <AsyncSelect<CompanyOption, false>
                    cacheOptions
                    loadOptions={loadOptionsFromApi("/company/name")}
                    defaultOptions
                    placeholder="Пошук компанії..."
                    noOptionsMessage={() => "Немає результатів"}
                    value={
                      field.value
                        ? { value: field.value, label: companyLabel }
                        : null
                    }
                    onChange={(option) => {
                      field.onChange(option?.value ?? null);
                      setCompanyLabel(option?.label ?? "");
                    }}
                    styles={{
                      option: (base, state) => ({
                        ...base,
                        color: "black", // 🔹 колір тексту у випадаючому списку
                        backgroundColor: state.isFocused
                          ? "rgba(0, 128, 128, 0.1)" // легкий teal при наведенні
                          : "white", // фон опції
                        cursor: "pointer",
                      }),
                      singleValue: (base) => ({
                        ...base,
                        color: "black", // 🔹 колір вибраного значення у полі
                      }),
                      input: (base) => ({
                        ...base,
                        color: "black", // 🔹 колір введеного тексту при пошуку
                      }),
                      placeholder: (base) => ({
                        ...base,
                        color: "#666", // 🔹 колір placeholder’а
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: "white", // фон випадаючого списку
                        zIndex: 10,
                      }),
                    }}
                  />
                </FormControl>
                <FormMessage>{errors.id_client?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Trailer */}
          <FormField
            control={control}
            name="crm_load_trailer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Тип транспорту</FormLabel>
                <FormControl>
                  <ReactSelect
                    isMulti
                    placeholder="Оберіть типи транспорту"
                    options={truckList}
                    value={truckList.filter((t) =>
                      field.value.some(
                        (v: any) => v.ids_trailer_type === t.value
                      )
                    )}
                    onChange={(options: any) => {
                      field.onChange(
                        options
                          ? options.map((o: any) => ({
                              ids_trailer_type: o.value,
                            }))
                          : []
                      );
                    }}
                    closeMenuOnSelect={false} // не закриває після кліку
                    {...({ menuShouldCloseOnSelect: false } as any)} // 👈 так обійдемо TS
                    hideSelectedOptions={false}
                    styles={{
                      menu: (base) => ({
                        ...base,
                        backgroundColor: "rgba(255, 255, 255, 0.7)", // напівпрозорий білий фон
                        backdropFilter: "blur(8px)", // ефект "скла"
                        border: "1px solid rgba(0,0,0,0.1)",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                      }),
                      multiValue: (base) => ({
                        ...base,
                        backgroundColor: "teal",
                        color: "white",
                      }),
                      multiValueLabel: (base) => ({
                        ...base,
                        color: "white",
                      }),
                      multiValueRemove: (base) => ({
                        ...base,
                        color: "white",
                        ":hover": {
                          backgroundColor: "darkcyan",
                          color: "white",
                        },
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected
                          ? "teal" // якщо опція вибрана
                          : state.isFocused
                          ? "teal" // якщо на неї навели курсор
                          : undefined,
                        color: "black", // текст буде білим і для вибраних, і для наведених
                      }),
                    }}
                  />
                </FormControl>
                <FormMessage>{errors.crm_load_trailer?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_collective"
            render={({ field }) => (
              <FormItem className="flex items-center mt-4 md:mt-0">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="mr-2">Збірний вантаж?</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_price_request"
            render={({ field }) => (
              <FormItem className="flex items-center mt-4 md:mt-0">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="mr-2">Запит ціни?</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="load_info"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Інформація про вантаж</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex items-center text-center  gap-4 ">
            <FormField
              control={control}
              name="car_count_begin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>К-сть авто</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={field.value ?? ""}
                      className="text-center w-[60px]"
                      onChange={(e) => {
                        const val =
                          e.target.value === "" ? null : Number(e.target.value);
                        field.onChange(val);
                      }}
                    />
                  </FormControl>
                  <FormMessage>{errors.car_count_begin?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ціна перевезення</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={field.value ?? ""}
                      className="text-center"
                      onChange={(e) => {
                        const val =
                          e.target.value === "" ? null : Number(e.target.value);
                        field.onChange(val);
                      }}
                    />
                  </FormControl>
                  <FormMessage>{errors.price?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="id_valut"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Валюта</FormLabel>
                  <FormControl>
                    <Select
                      // disabled={isLoadingRegister}
                      value={field.value?.toString() || ""}
                      onValueChange={(val) => field.onChange(Number(val))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Вкажіть валюту" />
                      </SelectTrigger>
                      <SelectContent>
                        {valutList
                          ?.slice(0, 4)
                          .map(
                            (item: any, idx: React.Key | null | undefined) => {
                              console.log(item, "ITEM");

                              return (
                                <SelectItem
                                  key={idx}
                                  value={String(item.value)}
                                >
                                  {item.label.toUpperCase()}
                                </SelectItem>
                              );
                            }
                          )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Дії */}
          <div className="flex justify-between p-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="is_next_cargo">
                Збираєтесь додати схожу заявку
              </Label>
              <MyTooltip
                important
                text="Якщо ви включите цю опцію, форма не перезапишеться і ви зможете внести схожу заявку"
              />
              <Switch
                id="is_next_cargo"
                checked={isNextCargo}
                onCheckedChange={(checked) => setIsNextCargo(checked)}
              />
            </div>

            <div>
              <Button
                type="submit"
                disabled={isLoadingSaveCargo}
                loading={isLoadingSaveCargo}
              >
                {defaultValues ? "Редагувати" : "  Додати вантаж"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Card>
  );
}
