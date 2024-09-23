import { createBrowserRouter } from "react-router-dom";
import PostLayout from "./layouts/PostLayout";
import PostsPage from "./pages/posts/PostsPage";
import Notfound from "./pages/Notfound";
import SinglePost from "./pages/posts/SinglePost";

const routes = createBrowserRouter([
  {
    element: <PostLayout />,
    path: "/",
    children: [
      {
        index: true,
        element: <h1 className="h-[97vh] flex justify-center items-center text-5xl font-bold">Home page</h1>,
        path: '/'
      },
      {
        element: <PostsPage />,
        path: '/posts'
      },
      {
        element: <SinglePost />,
        path: '/posts/:id'
      },
    ],
  },
  {
    path: "*",
    element: <Notfound />,
  }
])

export default routes;