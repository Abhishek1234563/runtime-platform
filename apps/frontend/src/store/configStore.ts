import { create } from "zustand";

interface ConfigStore {

  configText: string;

  setConfigText: (
    value: string
  ) => void;
}

const initialConfig = `
[
  {
    "id": "main-layout",

    "type": "layout",

    "direction": "column",

    "children": [

      {
        "id": "table1",

        "type": "table",

        "dataSource": "users",

        "columns": [
          {
            "key": "name",
            "label": "Name"
          },

          {
            "key": "email",
            "label": "Email"
          }
        ]
      },

      {
        "id": "form1",

        "type": "form",

        "title": "Create User",

        "submitTo": "users",

        "fields": [
          {
            "name": "name",
            "label": "Name",
            "type": "text"
          },

          {
            "name": "email",
            "label": "Email",
            "type": "text"
          }
        ]
      }
    ]
  }
]
`;

export const useConfigStore =
  create<ConfigStore>((set) => ({

    configText: initialConfig,

    setConfigText: (
      value
    ) =>
      set({
        configText: value,
      }),
  }));