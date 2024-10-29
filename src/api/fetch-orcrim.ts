import { getToken } from "@/services/token-service";
import axios from "@/utils/axios";

export interface OrcrimBody {
  id: number;
  orcrim_name: string;
  city_id: number;
}

export interface OrcrimResponse {
  data: OrcrimBody[];
}

export const fetchOrcrim = async (): Promise<OrcrimResponse> => {
  const token = await getToken();

  try {
    const response = await axios.get("/orcrims", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as OrcrimResponse;
  } catch (error) {
    console.error("Error fetching people:", error);
    throw error;
  }
};
