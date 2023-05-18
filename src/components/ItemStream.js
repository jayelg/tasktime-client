import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import { IconContext } from "react-icons";
import { HiPlusSm } from "react-icons/hi";
import { useSelector } from 'react-redux';

const ItemStream = (props) => {
    const [showItems, setShowItems] = useState(false);
    const items = useSelector((state) => state.project.data.items);
    
    useEffect(() => {
        setShowItems(true);
      }, []);

    const handleClickNewTask = () => {
        props.appCallBackFunctions.handleNewTask(props.thisItem.id);
    }

    const handleClickNewTaskStream = () => {
        props.appCallBackFunctions.initializeTaskStream(props.item.parentItem);
    }


    const handleOnClick = () => {
        props.isVisible ? handleClickNewTask() : handleClickNewTaskStream();
    }

    return (
        <div className={`justify-center h-fit overflow-hidden max-w-xs m-1`}>
                {items && items.map((newItem) => {
                        return newItem.parentItemId === props.thisItem._id ? <Tile key={newItem._id} isVisible={showItems} thisItem={newItem} appCallBackFunctions={props.appCallBackFunctions}/> : null;
                    }
                )
                }

                <div onClick={handleOnClick} className={`flex justify-center h-fit text-white cursor-pointer`}>
                    <IconContext.Provider value={{ color: "black", size:"2em"}}>
                        <HiPlusSm/>
                    </IconContext.Provider>
                </div>
        </div>
    )
}

export default ItemStream;