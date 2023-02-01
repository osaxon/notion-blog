import { create } from "zustand";

const useGalleryStore = create((set, get) => ({
    photoToScrollTo: null,
    zoomedImage: null,
    actions: {
        setPhoto: (photoId) => set(() => ({ photoToScrollTo: photoId })),
        setZoomedImage: (photoUrl) =>
            set(() => ({ zoomedImage: photoUrl }), true),
    },
}));

export const useLastViewedPhoto = () =>
    useGalleryStore((state) => state.photoToScrollTo);

export const useZoomedImage = () =>
    useGalleryStore((state) => state.zoomedImage);

export const useGalleryActions = () =>
    useGalleryStore((state) => state.actions);
