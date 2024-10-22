import { getToken } from "@/services/token-service";
import axios from "@/utils/axios";

export interface Person {
  id: number;
  name: string;
  cpf: string;
  image: string | null;
  organization_id: number;
  created_at: string;
  updated_at: string;
}

export interface SinglePersonResponse {
  data: Person;
}

export const getPeopleById = async ({
  id,
}: {
  id: number;
}): Promise<SinglePersonResponse> => {
  const token = await getToken();

  const response = await axios.get(`/people/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as SinglePersonResponse;
};
