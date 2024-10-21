import { getToken } from "@/services/token-service";
import axios from "@/utils/axios";

export interface Person {
  id: number;
  name: string;
  cpf: string;
  image: string;
  organization_id: number;
  created_at: string;
  updated_at: string;
}

export interface PeopleResponse {
  data: Person[];
  current_page: number;
  last_page: number;
}

export const GetPeople = async ({
  page = 1,
  id,
  name,
}: {
  page?: number;
  id?: number | null;
  name?: string;
}) => {
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

  return response.data;
};
