import { TransportPageInfo } from "@/features/dashboard/cabinet/car-park/_model/types/transport.type";
import TransportTabs from "@/features/dashboard/cabinet/car-park/tabs/TransportTabHeader";
import { fetchServer } from "@/shared/server/fetchServer";
type ApiResponse = {
  data: TransportPageInfo;
  status: string;
};

const CarPark = async () => {
  const res = await fetchServer.post<ApiResponse>("/transport/page-info");
  const transport = await fetchServer.post<ApiResponse>("/transport/list");
  console.log(transport.data, "TRANSPORT DATA");

  // Витягуємо дані
  const { transport_count, trailer_type_dropdown, vehicle_type_dropdown } =
    res.data;



  return (
    <div>
      <TransportTabs
        transportCount={transport_count}
        // trailerTypes={trailer_type_dropdown}
        // vehicleTypes={vehicle_type_dropdown}
      />
    </div>
  );
};

export default CarPark;
