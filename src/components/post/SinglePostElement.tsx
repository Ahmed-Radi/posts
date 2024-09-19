type SinglePostElementProps = {
  title: string | undefined
  content: string | undefined
}

const SinglePostElement = ({ title, content }: SinglePostElementProps) => {
  return (
    <div className="flex gap-3">
      <span className="font-semibold text-xl">{title}: </span>
      <span className="text-gray-600">{content}</span>
    </div>
  )
}

export default SinglePostElement