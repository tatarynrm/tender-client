"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Button,
  Card,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea,
} from "@/shared/components/ui";

import api from "@/shared/api/instance.api";
import { MultiSelect } from "@/shared/components/ui/multi-select";
import { Minus, Plus } from "lucide-react";
import { MyTooltip } from "@/shared/components/Tooltips/MyTooltip";
import { SearchInput } from "@/shared/components/Inputs/SearchInputWithResult";
import { toast } from "sonner";

// ---------- Interfaces ----------
export interface ICurrency {
  label: string;
  value: string;
}

export interface ITruckType {
  label: string;
  value: string;
}

// ---------- Zod Schemas ----------
const routeSchema = z.object({
  id: z.number().optional(),
  lat: z.number().optional(),
  lon: z.number().optional(),
  address: z.string().min(1, "Адреса обов'язкова"),
  ids_route_type: z.enum(["LOAD_FROM", "LOAD_TO"]),
  country: z.string().optional(),
  id_parent: z.number().optional(),
  order_num: z.number().optional(),
  id_country: z.number().optional(),
  city: z.string().optional(),
});
const trailerSchema = z.object({
  ids_trailer_type: z.string(),
});

const cargoServerSchema = z.object({
  id: z.number().optional(),
  price: z.number().nullable().optional(),
  id_usr: z.number().optional(),
  id_valut: z.number().optional(),
  id_client: z.number().optional().nullable(),
  load_info: z.string().optional(),
  crm_load_route_from: z.array(routeSchema).min(1),
  crm_load_route_to: z.array(routeSchema).min(1),
  crm_load_trailer: z.array(trailerSchema).min(1, "Оберіть тип транспорту"),
  is_price_request: z.boolean().optional(),
  is_collective: z.boolean().optional(),
  car_count_begin: z
    .number({ message: "Потрібно вказати хоча би 1 авто" })
    .min(1, "Мінімум 1")
    .max(100, "Максимум 100"),
});

export type CargoServerFormValues = z.infer<typeof cargoServerSchema>;

// ---------- Nominatim Input ----------
interface SearchInputProps {
  value: string;
  onChange: (
    val: string,
    lat?: number,
    lon?: number,
    country?: string,
    city?: string
  ) => void;
  placeholder?: string;
  onBlur?: () => void;
}

const NominatimInput = ({
  value,
  onChange,
  placeholder,
  onBlur,
}: SearchInputProps) => {
  const [results, setResults] = useState<any[]>([]);
  const [query, setQuery] = useState(value);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length < 3 || selected) return;
      try {
        const { data } = await api.get(`/nominatim/search?q=${query}`);
        setResults(data);
      } catch (err) {
        console.log(err);
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
          setSelected(null);
        }}
        onBlur={onBlur}
        className="w-full"
      />
      {results.length > 0 && !selected && (
        <ul className="absolute z-10 bg-white border w-full max-h-60 overflow-auto mt-1 rounded shadow dark:bg-zinc-900">
          {results.map((r, idx) => (
            <li
              key={idx}
              className="p-1 cursor-pointer"
              onClick={() => {
                console.log(r, "RRRRR 123");

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

// ---------- Main Component ----------
export default function CargoForm() {
  const [valutList, setValutList] = useState<ICurrency[]>([]);
  const [truckList, setTruckList] = useState<ITruckType[]>([]);
  const [selectedCompanyName, setSelectedCompanyName] = useState<string>("");
  const [selectedTrailers, setSelectedTrailers] = useState<string[]>([]);
  const [isNextCargo, setIsNextCargo] = useState(false);
  const [isLoadingSaveCargo, setIsLoadingSaveCargo] = useState(false);

  const form = useForm<CargoServerFormValues>({
    resolver: zodResolver(cargoServerSchema),
    defaultValues: {
      load_info: "",
      id_valut: 1,
      id_client: 1,
      crm_load_route_from: [
        { address: "", lat: 0, lon: 0, ids_route_type: "LOAD_FROM", city: "" },
      ],
      crm_load_route_to: [
        { address: "", lat: 0, lon: 0, ids_route_type: "LOAD_TO", city: "" },
      ],
      crm_load_trailer: [],
      price: null,
      car_count_begin: 1,
      is_collective: false,
      is_price_request: false,
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
  } = useFieldArray({
    control,
    name: "crm_load_route_from",
  });

  const {
    fields: toFields,
    append: appendTo,
    remove: removeTo,
  } = useFieldArray({
    control,
    name: "crm_load_route_to",
  });

  const getFormData = async () => {
    try {
      const { data } = await api.get("/form-data/getCreateCargoFormData");
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFormData();
  }, []);
  console.log(isNextCargo, "IS next");

  const onSubmit: SubmitHandler<CargoServerFormValues> = async (values) => {
    try {
      setIsLoadingSaveCargo(true);

      const { data } = await api.post("/crm/load/save", values);

      if (Number(data.data[0])) {
        toast.success("Успішне створення заявки!");

        // Якщо користувач хоче додати схожу заявку — не скидаємо форму
        if (isNextCargo) {
          return;
        }

        // 🔄 Повний ресет форми
        form.reset({
          load_info: "",
          id_valut: 1,
          id_client: null,
          crm_load_route_from: [
            { address: "", lat: 0, lon: 0, ids_route_type: "LOAD_FROM" },
          ],
          crm_load_route_to: [
            { address: "", lat: 0, lon: 0, ids_route_type: "LOAD_TO" },
          ],
          crm_load_trailer: [],
          price: null,
          car_count_begin: 1,
          is_collective: false,
          is_price_request: false,
        });

        // 🧹 Очищаємо додаткові локальні стани
        setValue("id_client", null);
        setValue("crm_load_trailer", []);
        setSelectedCompanyName("");
        setSelectedTrailers([]);
      }
    } catch (error) {
      console.error("Помилка при збереженні заявки:", error);
      toast.error("Не вдалося зберегти заявку!");
    } finally {
      setIsLoadingSaveCargo(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-3">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="flex flex-col md:flex-row gap-6 w-full">
            {/* LOAD_FROM */}
            <div className="flex-1 space-y-3 w-full">
              {fromFields.map((field, index) => (
                <div key={field.id} className="flex flex-row items-center">
                  <FormField
                    control={control}
                    name={`crm_load_route_from.${index}.address`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <div className="flex gap-2 items-center text-center">
                          <FormLabel>Адреса завантаження</FormLabel>
                          <MyTooltip
                            text={`Впишіть адресу завантаження, можете вказати місто , вулицю , номер вулиці.\nКоли виберете адресу, в полі буде вказано назву міста,  проте на карті буде зазначено точну адресу яку ви вказали!`}
                          />
                        </div>

                        <FormControl>
                          <NominatimInput
                            value={watch(
                              `crm_load_route_from.${index}.address`
                            )}
                            placeholder="Введіть адресу завантаження..."
                            onBlur={() => {
                              if (
                                watch(`crm_load_route_from.${index}.address`)
                              ) {
                                clearErrors(
                                  `crm_load_route_from.${index}.address`
                                );
                              }
                            }}
                            onChange={(address, lat, lon, country, city) => {
                              setValue(
                                `crm_load_route_from.${index}.address`,
                                address
                              );
                              setValue(`crm_load_route_from.${index}.lat`, lat);
                              setValue(`crm_load_route_from.${index}.lon`, lon);
                              setValue(
                                `crm_load_route_from.${index}.country`,
                                country
                              );
                              setValue(
                                `crm_load_route_from.${index}.city`,
                                city
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage>
                          {
                            errors.crm_load_route_from?.[index]?.address
                              ?.message
                          }
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                  {index === 0 ? null : (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeFrom(index)}
                      className="mt-2 text-sm h-[20px]"
                      size="icon"
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
                      country: "",
                      ids_route_type: "LOAD_FROM",
                      city: "",
                    })
                  }
                  size="icon"
                >
                  <Plus />
                </Button>
              )}
            </div>

            {/* LOAD_TO */}
            <div className="flex-1 space-y-3 w-full">
              {toFields.map((field, index) => (
                <div key={field.id} className="flex flex-row items-center">
                  <FormField
                    control={control}
                    name={`crm_load_route_to.${index}.address`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Адреса розвантаження</FormLabel>
                        <FormControl>
                          <NominatimInput
                            value={watch(`crm_load_route_to.${index}.address`)}
                            placeholder="Введіть адресу розвантаження..."
                            onChange={(address, lat, lon, country, city) => {
                              console.log(address);

                              setValue(
                                `crm_load_route_to.${index}.address`,
                                address
                              );
                              setValue(`crm_load_route_to.${index}.lat`, lat);
                              setValue(`crm_load_route_to.${index}.lon`, lon);
                              setValue(
                                `crm_load_route_to.${index}.country`,
                                country
                              );
                              setValue(`crm_load_route_to.${index}.city`, city);
                              setValue(
                                `crm_load_route_to.${index}.country`,
                                country
                              );
                              clearErrors(`crm_load_route_to.${index}.address`);
                            }}
                          />
                        </FormControl>
                        <FormMessage>
                          {errors.crm_load_route_to?.[index]?.address?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                  {index === 0 ? null : (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeTo(index)}
                      className="mt-2 text-sm h-[20px]"
                      size="icon"
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
                      country: "",
                      ids_route_type: "LOAD_TO",
                    })
                  }
                  size="icon"
                >
                  <Plus />
                </Button>
              )}
            </div>
          </div>

          {/* Компанія */}
          <FormField
            control={control}
            name="id_client"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <Label>Компанія</Label>
                  <MyTooltip text="Оберіть компанію зі списку, щоб прив’язати до заявки" />
                </FormLabel>
                <FormControl>
                  <SearchInput
                    url="/company/name"
                    placeholder="Пошук компанії..."
                    onChange={(selectedCompany) =>
                      field.onChange(selectedCompany?.id)
                    }
                  />
                </FormControl>
                <FormMessage>{errors.id_client?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Тип авто */}
          <Controller
            control={control}
            name="crm_load_trailer"
            render={({ field }) => (
              <MultiSelect
                options={truckList}
                value={field.value.map((t) => t.ids_trailer_type)} // читає напряму з форми
                placeholder="Оберіть транспорт"
                onValueChange={(values) =>
                  field.onChange(values.map((v) => ({ ids_trailer_type: v })))
                }
              />
            )}
          />
          <FormMessage>{errors.crm_load_trailer?.message}</FormMessage>
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
                Додати вантаж
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Card>
  );
}