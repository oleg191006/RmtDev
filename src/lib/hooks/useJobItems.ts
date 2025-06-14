import { BASE_API_URL } from "../constants/constants";
import { useQuery } from "@tanstack/react-query";
import { jobItem } from "../types/types";
import { handleError } from "../utils/error";

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: jobItem[];
};

const fetchJobItems = async (
  searchText: string
): Promise<JobItemsApiResponse> => {
  const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};

export default function useJobItems(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!searchText,
      onError: handleError,
    }
  );
  const jobItems = data ? data.jobItems : [];
  const isLoading = isInitialLoading;
  return [jobItems, isLoading] as const;
}
