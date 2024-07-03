import { Link } from "react-router-dom"
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleList, CiMail, CiShoppingCart } from "react-icons/ci";

const Sidebar = () => {
    return (
        <div className="w-1/5 flex p-5 flex-col gap-5 border-r  sidebar">
            <Link className="flex items-center gap-2">
                <IoIosAddCircleOutline size={25} />
                <span>Add Food</span>
            </Link>
            <Link className="flex items-center gap-2">
                <CiCircleList size={25} />
                <span>Food List</span>
            </Link>
            <Link className="flex items-center gap-2">
                <CiShoppingCart size={25} />
                <span>Orders</span>
            </Link>

            <Link className="flex items-center gap-2">
                <CiMail size={25} />
                <span>Messages</span>
            </Link>

        </div>
    )
}

export default Sidebar
