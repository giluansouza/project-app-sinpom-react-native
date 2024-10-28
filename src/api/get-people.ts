import { getToken } from "@/services/token-service";
import axios from "@/utils/axios";

export interface Person {
  id: number;
  image: string;
  name: string;
  cpf: string;
  rg: string;
  birthDate: string;
  gender: string;
  father: string;
  mother: string;
  profession: string;
  color: string;
  nicknames: string;
  crimeGroup: number;
  function: string;
  priority: string;
  hasCriminalRecords: false;
  recordDescription: string;
  workArea: string;
  created_at: string;
  updated_at: string;
}

export interface PeopleResponse {
  data: Person[];
  current_page: number;
  last_page: number;
}

export interface SinglePersonResponse {
  data: Person;
}

export const GetPeople = async ({
  page = 1,
  id,
  name,
}: {
  page?: number;
  id?: number | null;
  name?: string;
}): Promise<PeopleResponse | SinglePersonResponse> => {
  const token = await getToken();
  let url = `/people?page=${page}`;

  if (id) {
    url += `&id=${id}`;
  }
  if (name) {
    url += `&name=${name}`;
  }

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as PeopleResponse | SinglePersonResponse;
};
