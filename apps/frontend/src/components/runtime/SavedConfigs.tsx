import {
  useEffect,
  useState,
} from "react";

import { api }
from "../../lib/api";

import {
  useConfigStore
}
from "../../store/configStore";

interface SavedConfig {

  id: string;

  name: string;

  config: any;
}

export default function SavedConfigs() {

  const [configs, setConfigs] =
    useState<SavedConfig[]>([]);

  const { setConfigText } =
    useConfigStore();

  useEffect(() => {

    async function fetchConfigs() {

      try {

        const response =
          await api.get(
            "/config/all"
          );

        setConfigs(
          response.data
        );

      } catch (error) {

        console.error(error);
      }
    }

    fetchConfigs();

  }, []);

  function loadConfig(
    config: any
  ) {

    setConfigText(
      JSON.stringify(
        config,
        null,
        2
      )
    );
  }

  return (
    <div className="
      bg-white
      rounded-xl
      shadow
      border
      p-4
      h-full
    ">

      <h2 className="
        text-xl
        font-bold
        mb-4
      ">
        Saved Apps
      </h2>

      <div className="
        space-y-3
      ">

        {configs.map((config) => (

          <button
            key={config.id}

            onClick={() =>
              loadConfig(
                config.config
              )
            }

            className="
              w-full
              text-left
              border
              rounded-lg
              p-3
              hover:bg-gray-100
            "
          >

            <div className="
              font-semibold
            ">
              {config.name}
            </div>

          </button>

        ))}

      </div>

    </div>
  );
}