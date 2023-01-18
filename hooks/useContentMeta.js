import apiClient from "../lib/axios";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function useContentMeta(slug) {
  const queryClient = useQueryClient();

  const { data, status } = useQuery({
    queryKey: ["content_meta", slug],
    queryFn: async () => {
      const response = await apiClient.get(`content/${slug}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const { data: mutatedData, mutate: addLike } = useMutation({
    mutationFn: () => apiClient.post(`/like/${slug}`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["content_meta", slug] });
      const previousMeta = queryClient.getQueryData(["content_meta", slug]);
      if (previousMeta) {
        queryClient.setQueryData(["content_meta", slug], {
          ...previousMeta,
          likes: previousMeta.likes + 1,
        });
      }
      return { previousMeta };
    },
  });

  return {
    likes: data?.likes,
    views: data?.views,
    addLike,
  };
}
