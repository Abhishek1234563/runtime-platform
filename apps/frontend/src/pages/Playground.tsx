import { useMemo } from "react";

import ComponentRenderer
from "../components/runtime/ComponentRenderer";

import ConfigEditor
from "../components/runtime/ConfigEditor";

import SavedConfigs
from "../components/runtime/SavedConfigs";

import AppShell
from "../components/layout/AppShell";

import {
  useConfigStore
}
from "../store/configStore";

export default function Playground() {

  const { configText } =
    useConfigStore();

  const parsedConfig =
    useMemo(() => {

      try {

        return JSON.parse(
          configText
        );

      } catch {

        return null;
      }

    }, [configText]);

  return (

    <AppShell

      sidebar={
        <SavedConfigs />
      }

      editor={
        <ConfigEditor />
      }

      preview={

        !parsedConfig ? (

          <div className="
            bg-red-100
            border
            border-red-400
            text-red-700
            p-4
            rounded-lg
          ">
            Invalid JSON
          </div>

        ) : (

          <div className="
            space-y-6
          ">

            {parsedConfig.map(
              (component: any) => (

                <ComponentRenderer
                  key={component.id}
                  component={component}
                />
              )
            )}

          </div>

        )
      }

    />

  );
}