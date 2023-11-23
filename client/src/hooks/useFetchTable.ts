import { supabase } from "@/services";
import { camelize } from "@/utils";
import useSWR, { SWRConfiguration } from "swr";

export const useFetchTable = <T>(
  key: string,
  table: string,
  config?: SWRConfiguration
) => {
  const fetcher = async (): Promise<Array<T> | null | undefined> => {
    const { data, error } = await supabase.from(table).select("*");

    if (error) throw error;

    const camelizedTable = data?.map((row: Record<string, any>) =>
      camelize<T>(row)
    ) as Array<T>;

    return camelizedTable;
  };

  const { data, error } = useSWR<Array<T> | null | undefined, Error>(
    key,
    fetcher,
    {
      ...config,
    }
  );

  return {
    data,
    error,
  };
};
