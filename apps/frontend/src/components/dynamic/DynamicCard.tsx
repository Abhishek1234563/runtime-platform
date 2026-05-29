import { useEffect, useState }
from "react";

import { api }
from "../../lib/api";

import {
  useRuntimeStore
}
from "../../store/runtimeStore";

interface Props {

  title?: string;

  entity?: string;
}

export default function DynamicCard({
  title,
  entity,
}: Props) {

  const [count, setCount] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const refreshKey =
    useRuntimeStore(
      (state) => state.refreshKey
    );

  useEffect(() => {

    async function fetchCount() {

      if (!entity) return;

      try {

        setLoading(true);

        const response =
          await api.get(
            `/runtime/${entity}`
          );

        setCount(
          response.data.length
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    }

    fetchCount();

  }, [entity, refreshKey]);

  return (
    <div className="
      bg-white
      rounded-2xl
      shadow
      p-6
      border
    ">

      <h2 className="
        text-lg
        text-gray-500
        mb-3
      ">
        {title}
      </h2>

      <div className="
        text-5xl
        font-bold
      ">

        {loading
          ? "..."
          : count}

      </div>

    </div>
  );
}