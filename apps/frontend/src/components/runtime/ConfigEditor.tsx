import CodeEditor
from "@uiw/react-textarea-code-editor";

import {
  useConfigStore
}
from "../../store/configStore";

import { api }
from "../../lib/api";

export default function ConfigEditor() {

  const {
    configText,
    setConfigText,
  } = useConfigStore();

  async function handleSave() {

    try {

      const parsed =
        JSON.parse(configText);

      await api.post(
        "/config/save",
        {
          name:
            "Runtime App",

          config: parsed,
        }
      );

      alert(
        "Config saved successfully"
      );

    } catch {

      alert(
        "Invalid JSON"
      );
    }
  }

  return (
    <div className="
      h-full
      bg-gray-900
      rounded-xl
      overflow-hidden
    ">

      <div className="
        flex
        justify-between
        items-center
        bg-gray-800
        text-white
        px-4
        py-3
      ">

        <div className="font-bold">
          Runtime Config
        </div>

        <button
          onClick={handleSave}

          className="
            bg-blue-600
            hover:bg-blue-700
            px-4
            py-2
            rounded-lg
            text-sm
          "
        >
          Save App
        </button>

      </div>

      <CodeEditor
        value={configText}

        language="json"

        placeholder="Enter JSON config"

        onChange={(e) =>
          setConfigText(
            e.target.value
          )
        }

        padding={20}

        style={{
          backgroundColor: "#111827",
          color: "#fff",
          minHeight: "100vh",
          fontSize: 14,
          fontFamily:
            "monospace",
        }}
      />

    </div>
  );
}