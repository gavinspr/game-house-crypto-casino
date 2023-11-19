import { supabase } from "@/services";
import { camelize } from "@/utils";

export default function supabaseFetcher() {
  /**
   *
   * @param table Supabase table name
   * @returns Supabase table data as array of type specified
   */
  const getTable = async <T>(table: string): Promise<Array<T>> => {
    const { data, error } = await supabase.from(table).select("*");

    if (error) throw error;

    const camelizedTable: Array<T> | undefined = data?.map(
      (row: Record<string, any>) => camelize<T>(row)
    );

    return camelizedTable;
  };

  /**
   *
   * @param table Supabase table name
   * @param slug Slug value for a table that contains the slug column
   * @returns Row from supabase table
   */
  const getRowBySlug = async <T>(table: string, slug: string): Promise<T> => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("slug", slug);

    if (error) throw error;

    if (!data || data.length === 0) {
      throw new Error(`No data found in table ${table}`);
    }

    const camelizedData: Array<T> = data?.map((row: Record<string, any>) =>
      camelize<T>(row)
    );

    return camelizedData[0];
  };

  return {
    getTable,
    getRowBySlug,
  };
}
