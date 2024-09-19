import { Fragment } from "react/jsx-runtime";
import { Button } from "../ui/button";
import { IPost } from "../../types";
import { Link } from "react-router-dom";

type PostProps = {
	post: IPost;
  handleSelect: (id: number) => void
  handleDeleteSelectedPost: (id: number) => void
  deleteIsLoading: boolean
};

const Post = ({ post, handleSelect, handleDeleteSelectedPost, deleteIsLoading }: PostProps) => {
	return (
		<Fragment>
      <section
        key={post.id}
        className='p-5 lg:w-3/12 md:w-1/3 w-full flex flex-1 flex-col hover:shadow-md rounded-md bg-slate-200 hover:bg-green-300 transition-all duration-500'>
        <div className='text-lg font-bold' title={post.title}>{post.title}</div>
        <p className='my-3 truncate overflow-hidden whitespace-nowrap' title={post.body}>
          {post.body}
        </p>
        <div className='flex justify-between'>
          <Button asChild>
            <Link to={`/posts/${post.id}`}>View</Link>
          </Button>
          <Button onClick={() => handleSelect(post.id!)}>Update</Button>
          <Button onClick={() => handleDeleteSelectedPost(post.id!)} disabled={deleteIsLoading}>Delete</Button>
        </div>
      </section>
		</Fragment>
	);
};

export default Post;
