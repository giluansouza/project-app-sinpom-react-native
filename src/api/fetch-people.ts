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

interface fetchPeopleParams {
  page: number;
  filters: {
    page?: number;
    name?: string;
    nickname?: string;
    enrollment?: number;
    mother?: string;
    orcrim?: string;
    workArea?: string;
    district?: string;
    city?: string;
    cpf?: string;
    rg?: string;
  };
}

export const fetchPeople = async ({
  page = 1,
  filters = {},
}: fetchPeopleParams): Promise<PeopleResponse> => {
  const token = await getToken();

  let url = `/people?page=${page}`;

  Object.entries(filters).forEach(([key, value]) => {
    if (value) url += `&${key}=${encodeURIComponent(value)}`;
  });

  console.log(url);

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as PeopleResponse;
  } catch (error) {
    console.error("Error fetching people:", error);
    throw error;
  }
};
