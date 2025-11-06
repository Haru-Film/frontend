import { create } from "zustand";

interface tokenState {
  token: string | null;
}

export interface AuthStore extends tokenState {
  authorize: (token: string) => void;
  deauthorize: () => void;
}

const initialState: tokenState = {
  token: null,
};

export const useTokenStore = create<AuthStore>((set) => ({
  ...initialState,
  authorize: (token) =>
    set(() => ({
      token,
    })),
  deauthorize: () =>
    set(() => ({
      token: null,
    })),
}));
