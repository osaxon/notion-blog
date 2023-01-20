import apiClient from "../lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function useContentMeta(slug) {
    const queryClient = useQueryClient();

    // get like count from db
    const { data, status } = useQuery({
        queryKey: ["content_meta", slug],
        queryFn: async () => {
            const response = await apiClient.get(`api/content/${slug}`);
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
    });

    const {
        data: mutatedData,
        mutate: addLike,
        status: mutateStatus,
    } = useMutation({
        // update the like count in the DB
        mutationFn: async () => await apiClient.post(`api/like/${slug}`),
        // optimistally update the state
        onMutate: async () => {
            // cancel any outgoing queries for fresh data
            await queryClient.cancelQueries({
                queryKey: ["content_meta", slug],
            });
            // snapshot current value
            const previousMeta = queryClient.getQueryData([
                "content_meta",
                slug,
            ]);
            // update optimistally
            if (previousMeta) {
                queryClient.setQueryData(["content_meta", slug], {
                    ...previousMeta,
                    likes: previousMeta.likes + 1,
                    userLikes: previousMeta.userLikes + 1,
                });
            }
            return { previousMeta };
        },
    });

    return {
        likes: data?.likes ?? 0,
        views: data?.views ?? 0,
        userLikes: data?.userLikes ?? 0,
        addLike,
        mutateStatus,
    };
}
