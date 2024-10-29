import { getToken } from "@/services/token-service";
import axios from "@/utils/axios";

export interface CityBody {
  id: number;
  city_name: string;
}

export interface CitiesResponse {
  data: CityBody[];
}

export const fetchCities = async (): Promise<CitiesResponse> => {
  const token = await getToken();

  try {
    const response = await axios.get("/cities", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as CitiesResponse;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};
