import { create }
from "zustand";

export interface Workflow {

  trigger: string;

  entity?: string;

  action: string;

  message?: string;
}

interface WorkflowStore {

  workflows: Workflow[];

  setWorkflows: (
    workflows: Workflow[]
  ) => void;
}

const defaultWorkflows: Workflow[] = [

  {
    trigger: "record_created",

    entity: "users",

    action: "notification",

    message:
       "New User Added!"
  },
];

export const useWorkflowStore =
  create<WorkflowStore>((set) => ({

    workflows: defaultWorkflows,

    setWorkflows: (
      workflows
    ) =>
      set({
        workflows,
      }),
  }));