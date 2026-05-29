import { useEffect, useState } from "react";

import { api } from "../../lib/api";
import { useRuntimeStore }
from "../../store/runtimeStore";

interface Column {
  key: string;
  label: string;
}

interface Props {
  columns?: Column[];

  data?: Record<string, any>[];

  dataSource?: string;
}

export default function DynamicTable({
  columns = [],
  data = [],
  dataSource,
}: Props) {
    console.log("TABLE PROPS:", {
  columns,
  data,
  dataSource,
});

  const [tableData, setTableData] =
    useState(data);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const refreshKey =
    useRuntimeStore(
    (state) => state.refreshKey
  );

  useEffect(() => {

    async function fetchData() { 
    
      if (!dataSource) return;

      try {

        setLoading(true);
        console.log(
      "Fetching:",
      dataSource
    );

        const response =
          await api.get(
            `/runtime/${dataSource}`
          );
          console.log(response.data);

        // const transformed =
        //   response.data.map((item: any) => ({
        //     id: item.id,
        //     ...item.data,
        //   }));

        const transformed =
  response.data.map((item: any) => {

    if (!item.data) return {};

    return {
      id: item.id,
      ...item.data,
    };
  });


    //     const transformed = response.data.map(
    //     (item: any) => item.data
    //    );

        setTableData(transformed);
        console.log(transformed);

      } catch (err) {

        setError(
          "Failed to fetch data"
        );

      } finally {

        setLoading(false);
      }
    }


    fetchData();

  }, [dataSource, refreshKey]);

  if (!columns.length) {
    return (
      <div className="p-4 bg-yellow-100 rounded-lg">
        No columns provided
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-4">
        Loading table...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">

      <h2 className="text-2xl font-bold mb-4">
        Dynamic Table
      </h2>

      <table className="w-full border-collapse">

        <thead>

          <tr className="bg-gray-100">

            {columns.map((column) => (
              <th
                key={column.key}
                className="border p-3 text-left"
              >
                {column.label}
              </th>
            ))}

          </tr>

        </thead>

        <tbody>

          {tableData.map((row, index) => (

            <tr key={index}>

              {columns.map((column) => (

                <td
                  key={column.key}
                  className="border p-3"
                >
                  {row[column.key] || "-"}
                </td>

              ))}

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}