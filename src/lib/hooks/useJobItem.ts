import { BASE_API_URL } from "../constants/constants";
import { useQuery } from "@tanstack/react-query";
import { jobItemExtended } from "../types/types";
import { handleError } from "../utils/error";

type JobItemApiResponse = {
  public: boolean;
  jobItem: jobItemExtended | null;
};

const fetchJobItem = async (
  serchItemId: number
): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/:id/${serchItemId}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};

export default function useJobItem(serchItemId: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", serchItemId],
    () => (serchItemId ? fetchJobItem(serchItemId) : null),
    {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!serchItemId,
      onError: handleError,
    }
  );
  console.log("useJobItem", data, isInitialLoading);
  const isLoading = isInitialLoading;
  const jobItem = data ? data.jobItem : null;
  return [jobItem, isLoading] as const;
}
