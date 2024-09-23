import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Post from "../../components/post/Post";
import { usePosts } from "../../services/queries";
import UpdateDialog from "../../components/UpdateDialog";
import SearchInput from "../../components/post/SearchInput";
import EmptyData from "../../components/shared/EmptyData";
import { Button } from "../../components/ui/button";
import { useDeletePost } from "../../services/mutations";
import { IPost } from "../../types";
import Loader from "../../components/shared/Loader";
import { useDebounce } from "../../hooks/useDebounce";

const PostsPage = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePosts();

  const deletePost = useDeletePost();
  const [searchValue, setSearchValue] = useState("");
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [open, setOpen] = useState(false);

  const handleSearch = useCallback((text: string) => {
    setSearchValue(text);
  } ,[]);

  const handleSelect = useCallback((id?: number) => {
    const selectedPost = data?.pages.flatMap(page => page).find((post: IPost) => post.id === id);
    setSelectedPost(selectedPost!);
    setOpen(true);
  },[data?.pages]);

  const handleDeleteSelectedPost = useCallback((id: number) => {
    deletePost.mutate(id);
  },[deletePost]);

  const debounceValue = useDebounce(searchValue, 1000);
  const filteredData = useMemo(() => data?.pages.flatMap(page => page).filter(
    (post: IPost) =>
      post.title.toLowerCase().includes(debounceValue.toLowerCase()) ||
      post.body.toLowerCase().includes(debounceValue.toLowerCase())
  ),[data?.pages, debounceValue]);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading posts</div>;

  return (
    <section className='space-y-5'>
      <SearchInput
        searchValue={searchValue}
        handleSearch={handleSearch}
      />
      <Button
        onClick={() => setOpen(true)}
      >
        Add Post
      </Button>
      <div className='flex justify-between items-center flex-wrap gap-4'>
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((post: IPost) => (
            <Post
              key={post.id}
              post={post}
              handleSelect={handleSelect}
              handleDeleteSelectedPost={handleDeleteSelectedPost}
              deleteIsLoading={deletePost.isPending}
            />
          ))
        ) : (
          <EmptyData />
        )}
      </div>

      <div ref={loadMoreRef} style={{ height: 20, backgroundColor: 'transparent' }} />
      {isFetchingNextPage && <div className="w-full h-10 text-5xl font-bold text-center my-3">Loading more...</div>}

      <UpdateDialog
        selectedPost={selectedPost!}
        setSelectedPost={setSelectedPost}
        open={open}
        setOpen={setOpen}
      />
    </section>
  );
};

export default PostsPage;
