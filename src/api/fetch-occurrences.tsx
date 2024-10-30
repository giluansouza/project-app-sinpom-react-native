import { getToken } from "@/services/token-service";
import axios from "@/utils/axios";
import type { Person } from "./fetch-people";

export interface OccurrenceBody {
  id: number;
  occurred_at: string;
  description: string;
  latitude: number;
  longitude: number;
  orcrim_id: number;
  created_at: string;
  type: string;
  opm: string;
  city: { city_name: string };
  orcrim: { orcrim_name: string };
  people: Person[];
}

interface OccurrencesResponse {
  data: OccurrenceBody[];
  current_page: number;
  last_page: number;
  total: number;
}

export const fetchOccurrences = async ({
  startDate,
  endDate,
  page = 1,
}: {
  startDate?: string;
  endDate?: string;
  page: number;
}): Promise<OccurrencesResponse> => {
  const token = await getToken();

  let url = `/occurrences?page=${page}`;

  if (startDate) {
    url += `&startDate=${encodeURIComponent(startDate)}`;
  }

  if (endDate) {
    url += `&endDate=${encodeURIComponent(endDate)}`;
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as OccurrencesResponse;
  } catch (error) {
    console.error("Error fetching occurrences:", error);
    throw error;
  }
};
