import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { getPosts, singlePost } from "./api"

export const usePosts = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 0 }) => getPosts(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const totalPagesFetched = allPages.length;

      // Stop fetching after 10 pages or if no more data is available
      if (totalPagesFetched >= 10 || lastPage.length === 0) {
        return undefined;
      }

      return totalPagesFetched;
    },
  });
};

export const useSinglePost = (id: number) => {
  return useQuery({
    queryKey: ['singlePost', { id }],
    queryFn: () => singlePost(id)
  })
}
