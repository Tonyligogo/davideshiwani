import { Loader } from "lucide-react"

const CustomButton = ({ onClick, isPending, label }: { onClick: () => void, isPending: boolean, label: string }) => {
  return (
    <button
        onClick={onClick}
        className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md text-sm"
      >
        {isPending ? <Loader className="animate-spin" /> : label}
      </button>
  )
}

export default CustomButton