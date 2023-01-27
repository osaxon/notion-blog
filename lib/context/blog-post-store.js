import { create } from "zustand";

const useBlogPostStore = create((set, get) => ({
    images: [],
    isZoomed: false,
    zoomedImage: undefined,
    actions: {
        zoom: ({ imgUrl, zoomed }) =>
            set((state) => ({
                images: state.images.map((img) =>
                    img.url === imgUrl ? { ...img, zoomed } : img
                ),
                zoomedImage: imgUrl,
                isZoomed: zoomed,
            })),
        toggleZoom: () => set((state) => ({ isZoomed: !state.isZoomed })),
        addImage: (image) => {
            set((state) => ({ images: [...state.images, image] }));
        },
        setZoomedImg: (imgUrl) => set({ zoomedImage: imgUrl }),
    },
}));

export const useBlogPostImages = () =>
    useBlogPostStore((state) => state.images);
export const useZoomedImageURL = () =>
    useBlogPostStore((state) => state.zoomedImage);
export const useIsZoomed = () => useBlogPostStore((state) => state.isZoomed);
export const useBlogPostActions = () =>
    useBlogPostStore((state) => state.actions);
