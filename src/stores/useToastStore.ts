import { create } from "zustand";

interface ToastState {
  message: string | null;
  type: "success" | "error" | "info" | "default";
}

export interface ToastStore extends ToastState {
  show: (message: string, type?: ToastState["type"]) => void;
  clear: () => void;
}

const initialState: ToastState = {
  message: null,
  type: "default",
};

export const useToastStore = create<ToastStore>((set) => ({
  ...initialState,
  show: (message, type = "default") => set({ message, type }),
  clear: () => set(initialState),
}));
