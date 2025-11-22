import { create } from "zustand";

interface TokenState {
  token: string | null;
}

export interface AuthStore extends TokenState {
  authorize: (token: string) => void;
  deauthorize: () => void;
}

const initialState: TokenState = {
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
