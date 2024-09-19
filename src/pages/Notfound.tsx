import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"

const Notfound = () => {
  return (
    <section className="container mx-auto">
      <div className="h-[100vh] space-y-5 flex items-center justify-center flex-col">
        <img src="/icons/broken-link-svgrepo-com.svg" className="h-40 w-40" />
        <h2 className="font-bold text-5xl">404 PAGE NOTFOUND</h2>
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </section>
  )
}

export default Notfound