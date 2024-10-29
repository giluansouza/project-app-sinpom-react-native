import { getToken } from "@/services/token-service";
import axios from "@/utils/axios";
import type { Person } from "./fetch-people";

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
