import {
  useWorkflowStore
}
from "../store/workflowStore";

import {
  useNotificationStore
}
from "../store/notificationStore";

interface TriggerPayload {

  trigger: string;

  entity?: string;
}

export function executeWorkflow(
  payload: TriggerPayload
) {

  const workflows =
    useWorkflowStore
      .getState()
      .workflows;

  const addNotification =
    useNotificationStore
      .getState()
      .addNotification;

  workflows.forEach((workflow) => {

    const triggerMatches =

      workflow.trigger ===
      payload.trigger;

    const entityMatches =

      !workflow.entity ||

      workflow.entity ===
      payload.entity;

    if (
      triggerMatches &&
      entityMatches
    ) {

      switch (
        workflow.action
      ) {

        case "notification":

          addNotification(
            workflow.message ||
            "Workflow Triggered"
          );

          break;
      }
    }
  });
}