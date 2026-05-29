import { create } from "zustand";

interface RuntimeStore {

  refreshKey: number;

  triggerRefresh: () => void;
}

export const useRuntimeStore =
  create<RuntimeStore>((set) => ({

    refreshKey: 0,

    triggerRefresh: () =>
      set((state) => ({
        refreshKey:
          state.refreshKey + 1,
      })),
  }));