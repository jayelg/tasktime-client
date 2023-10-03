import { HiOutlineTrash } from "react-icons/hi";
import { useDispatch } from 'react-redux';
import { deleteItem } from '../slices/projectSlice';


const DeleteItemButton = ({ itemId, setIsVisible }) => {
    const dispatch = useDispatch();
    // Delete Button
    const handleOnClickDelete = () => {
        setIsVisible(false);
        setTimeout(() => {
            dispatch(deleteItem(itemId));
          }, 500); // to match the transition duration
    }

    return (
        <div
            onClick={handleOnClickDelete}
            className={`flex items-center p-2 ml-2 cursor-pointer text-zinc-900 dark:text-zinc-400  hover:text-red-700 dark:hover:text-red-500 transition-colors duration-300`}
        >
                <HiOutlineTrash/>
        </div>
    )
}

export default DeleteItemButton;