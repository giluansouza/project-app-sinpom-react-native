import { getToken } from "@/services/token-service";
import axios from "@/utils/axios";
import type { OccurrenceBody } from "./fetch-occurrences";

export interface SingleOccurrenceResponse {
  data: OccurrenceBody;
}

export const getOccurenceById = async ({
  id,
}: {
  id: number;
}): Promise<SingleOccurrenceResponse> => {
  const token = await getToken();

  const response = await axios.get(`/occurrences/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as SingleOccurrenceResponse;
};
