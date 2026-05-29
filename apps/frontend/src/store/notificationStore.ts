import { create } from "zustand";

interface Notification {

  id: number;

  message: string;
}

interface NotificationStore {

  notifications: Notification[];

  addNotification: (
    message: string
  ) => void;

  removeNotification: (
    id: number
  ) => void;
}

export const useNotificationStore =
  create<NotificationStore>((set) => ({

    notifications: [],

    addNotification: (
      message
    ) => {

      const id = Date.now();

      set((state) => ({
        notifications: [
          ...state.notifications,

          {
            id,
            message,
          },
        ],
      }));

      setTimeout(() => {

        set((state) => ({
          notifications:
            state.notifications.filter(
              (n) => n.id !== id
            ),
        }));

      }, 3000);
    },

    removeNotification: (
      id
    ) => {

      set((state) => ({
        notifications:
          state.notifications.filter(
            (n) => n.id !== id
          ),
      }));
    },
  }));