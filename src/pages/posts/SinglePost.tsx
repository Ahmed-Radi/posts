import { useParams } from "react-router-dom";
import SinglePostElement from "../../components/post/SinglePostElement";
import { useSinglePost } from "../../services/queries";

const SinglePost = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useSinglePost(Number(id));

  if(isLoading) return <div>Loading...</div>

  return (
    <section className='space-y-5 mt-20'>
      <div className='flex justify-between items-center flex-wrap gap-4'>
        <div className="flex flex-col gap-4 bg-slate-200 p-3 rounded-md hover:shadow-md transition-all duration-500">
          <SinglePostElement
            title="Title"
            content={data?.title}
          />
          <SinglePostElement
            title="Body"
            content={data?.body}
          />
        </div>
      </div>
    </section>
  )
}

export default SinglePost;