import { useState } from "react";

import { api } from "../../lib/api";

import {
  useRuntimeStore
} from "../../store/runtimeStore";

import {
  executeWorkflow
} from "../../lib/workflowEngine";

interface Field {
  name: string;
  label: string;
  type: string;
}

interface Props {
  title?: string;

  fields?: Field[];

  submitTo?: string;
}

export default function DynamicForm({
  title,
  fields = [],
  submitTo,
}: Props) {

  const [formData, setFormData] =
    useState<Record<string, any>>({});

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  const triggerRefresh =
    useRuntimeStore(
      (state) => state.triggerRefresh
    );

  function handleChange(
    name: string,
    value: string
  ) {

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    if (!submitTo) return;

    try {

      setLoading(true);

      setError("");

      setSuccess("");

      await api.post(
        `/runtime/${submitTo}`,
        formData
      );

      triggerRefresh();

      executeWorkflow({
        trigger: "record_created",

        entity: submitTo,
      });

      setSuccess(
        "Record created successfully"
      );

      setFormData({});

    } catch (err) {

      setError(
        "Failed to create record"
      );

    } finally {

      setLoading(false);
    }
  }

  if (!fields.length) {
    return (
      <div className="p-4 border rounded-lg bg-yellow-100">
        No form fields provided
      </div>
    );
  }

  return (
    <div className="p-6 border rounded-xl shadow bg-white">

      <h2 className="text-2xl font-bold mb-4">
        {title || "Dynamic Form"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {fields.map((field) => (

          <div key={field.name}>

            <label className="block mb-1 font-medium">
              {field.label}
            </label>

            <input
              type={field.type}

              value={
                formData[field.name] || ""
              }

              onChange={(e) =>
                handleChange(
                  field.name,
                  e.target.value
                )
              }

              placeholder={field.label}

              className="
                w-full
                border
                p-2
                rounded-lg
              "
            />

          </div>

        ))}

        <button
          type="submit"

          disabled={loading}

          className="
            bg-black
            text-white
            px-4
            py-2
            rounded-lg
          "
        >

          {loading
            ? "Submitting..."
            : "Submit"}

        </button>

        {success && (
          <div className="text-green-600">
            {success}
          </div>
        )}

        {error && (
          <div className="text-red-600">
            {error}
          </div>
        )}

      </form>
    </div>
  );
}