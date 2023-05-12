import { IconContext } from "react-icons";
import { HiPlusSm } from "react-icons/hi";

const AddTaskIcon = ({ icon }) => {

    return (
            <IconContext.Provider value={{ color: "white", size: "4em"}}>
                <HiPlusSm/>
            </IconContext.Provider>
    );
}

export default AddTaskIcon;