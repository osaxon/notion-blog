import { create } from "zustand";

const useMobileMenuStore = create((set, get) => ({
    isOpen: false,
    actions: {
        toggle: () => set((state) => ({ isOpen: !state.isOpen })),
        open: () => set(() => ({ isOpen: true })),
        close: () => set(() => ({ isOpen: false })),
    },
}));

export const useMobileMenu = () => useMobileMenuStore((state) => state.isOpen);
export const useMobileMenuActions = () =>
    useMobileMenuStore((state) => state.actions);
