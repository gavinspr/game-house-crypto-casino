import { supabase } from "@/services";
import { camelize } from "@/utils";
import useSWR, { SWRConfiguration } from "swr";

export const useFetchRowBySlug = <T>(
  key: string,
  table: string,
  slug: string,
  config?: SWRConfiguration
) => {
  const fetcher = async (): Promise<T | null | undefined> => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("slug", slug);

    if (error) throw error;

    if (!data || data.length === 0) {
      throw new Error(`No data found in table ${table}`);
    }

    const camelizedData = data?.map((row: Record<string, any>) =>
      camelize<T>(row)
    ) as Array<T>;

    return camelizedData[0];
  };

  const { data, error, mutate } = useSWR<T | null | undefined, Error>(
    key,
    table && slug ? fetcher : null,
    config
  );

  return {
    data,
    error,
    mutate,
  };
};
