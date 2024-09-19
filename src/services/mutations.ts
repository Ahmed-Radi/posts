import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPost, deletePost, updatePost } from "./api"
import { IPost } from "../types";

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (post: IPost) => createPost(post),
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePost(id!),
    onSettled: async (_, error) => {
      if (error) {
        console.error('error', error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ['posts'] });
      }
    }
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: IPost) => updatePost(post),
    onSuccess: () => {
      // ! need to change
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    }
  })
}