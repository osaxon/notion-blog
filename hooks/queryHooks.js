import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import debounce from 'lodash/debounce'
import { getSinglePost } from "@/utils/notion";

export const useFetchPage = (id) => {
    return useQuery({
        queryKey: ['page', id],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3000/api/notion/get-post?id=${id}`)
            if(!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json();
        }
    })
}

export function usePageMetaData(pageId){
    const mutation = useMutation({
        mutationFn: (pageId) => {
            return axios.post('http://localhost:3000/api/notion/like-post', {
                postId,
            })
        }
    })
}