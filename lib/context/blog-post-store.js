import { create } from "zustand";

const useBlogPostStore = create((set, get) => ({
    isFullScreenImage: false,
    actions: {
        toggle: () =>
            set((state) => ({ isFullScreenImage: !state.isFullScreenImage })),
        open: () => set(() => ({ isFullScreenImage: true })),
        close: () => set(() => ({ isFullScreenImage: false })),
    },
}));

export const useBlogPost = () => useBlogPostStore((state) => state.isOpen);
export const useBlogPostActions = () =>
    useBlogPostStore((state) => state.actions);
