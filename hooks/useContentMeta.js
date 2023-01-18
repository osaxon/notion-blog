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
  });

  const addLike = useMutation({
    mutationFn: () => apiClient.post(`/like/${slug}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content_meta", slug] });
    },
  });

  console.log(data);

  return {
    likes: data?.likes,
    views: data?.views,
    addLike: addLike.mutate,
  };
}
