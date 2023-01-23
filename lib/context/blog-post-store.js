import { create } from "zustand";

const useBlogPostStore = create((set, get) => ({
    isFullScreenImage: false,
    images: [],
    actions: {
        toggle: () =>
            set((state) => ({ isFullScreenImage: !state.isFullScreenImage })),
        open: () => set(() => ({ isFullScreenImage: true })),
        close: () => set(() => ({ isFullScreenImage: false })),
        addImage: (image) =>
            set((state) => ({ images: [...state.images, image] })),
    },
}));

export const useBlogPostImages = () =>
    useBlogPostStore((state) => state.images);
export const useBlogPostActions = () =>
    useBlogPostStore((state) => state.actions);
