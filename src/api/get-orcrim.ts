import { getToken } from "@/services/token-service";
import axios from "@/utils/axios";

export interface OrcrimBody {
  id: number;
  orcrim_name: string;
  cityId: number;
}

export interface OrcrimResponse {
  data: OrcrimBody[];
}

export const getOrcrim = async (): Promise<OrcrimResponse> => {
  const token = await getToken();

  const response = await axios.get("/orcrims", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as OrcrimResponse;
};
