import { create } from "zustand";

const useGalleryStore = create((set, get) => ({
    photoToScrollTo: null,
    actions: {
        setPhoto: (photoId) => set(() => ({ photoToScrollTo: photoId })),
    },
}));

export const useLastViewedPhoto = () =>
    useGalleryStore((state) => state.photoToScrollTo);

export const useGalleryActions = () =>
    useGalleryStore((state) => state.actions);
