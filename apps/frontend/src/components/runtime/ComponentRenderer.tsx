import type{ RuntimeComponent } from "../../types/runtime";

import { registry } from "./registry";

import UnknownComponent from "./UnknownComponent";

import { validateComponent }from "../../utils/validateComponent";

interface Props {
  component: RuntimeComponent;
}

export default function ComponentRenderer({
  component,
}: Props) {

  const DynamicComponent =
    registry[component.type];

  if (!DynamicComponent) {
    return (
      <UnknownComponent type={component.type} />
    );
  }

  const validated =
    validateComponent(component);

  if (!validated || !validated.success) {

    return (
      <div className="p-4 rounded-lg bg-yellow-100 border border-yellow-400">

        <h2 className="font-bold text-yellow-700">
          Invalid Component Config
        </h2>

        <pre className="text-sm mt-2 overflow-auto">
          {JSON.stringify(
            validated?.error?.format(),
            null,
            2
          )}
        </pre>

      </div>
    );
  }

  return (
    <DynamicComponent {...validated.data} />
  );
}