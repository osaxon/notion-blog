import { create } from "zustand";

const useBlogPostStore = create((set, get) => ({
    images: [],
    actions: {
        zoom: ({ imgUrl, zoomed }) =>
            set((state) => ({
                images: state.images.map((img) =>
                    img.url === imgUrl ? { ...img, zoomed } : img
                ),
            })),
        addImage: (image) =>
            set((state) => ({ images: [...state.images, image] })),
    },
}));

export const useBlogPostImages = () =>
    useBlogPostStore((state) => state.images);
export const useBlogPostActions = () =>
    useBlogPostStore((state) => state.actions);
