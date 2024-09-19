import { Outlet } from "react-router-dom"
import Navbar from "../components/shared/Navbar"

function PostLayout() {
  return (
    <section>
      <Navbar />
      <div className="container mx-auto md:px-12 px-3">
        <Outlet />
      </div>
    </section>
  )
}

export default PostLayout
