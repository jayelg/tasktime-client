import React, { useRef, useEffect, useState } from 'react';
import Tile from './Tile';
import { IconContext } from "react-icons";
import { HiPlusSm, HiX } from "react-icons/hi";
import { useSelector, useDispatch } from 'react-redux';
import { addItemToProject, deleteItem, updateItemProperty } from '../slices/projectSlice';
import { Droppable } from 'react-beautiful-dnd';
import NewItem from '../utils/NewItem';

const ItemStream = (props) => {
    const dispatch = useDispatch();
    const items = useSelector((state) => {
        return state.project.data.items.filter(item => item.parentItemId === props.thisItem._id);
    });

    const handleAddItem = () => {
        dispatch(addItemToProject(NewItem(props.thisItem._id)));
    };

    const [isVisible, setIsVisible] = useState(props.thisItem.isRendered);

    useEffect(() => {
        setTimeout(() => {
          setIsVisible(true);
          dispatch(updateItemProperty({itemId: props.thisItem._id, property: "isRendered", value: true}));
        }, 0); // creates a cascading animation for the order of each item, new items skip the delay
      }, [props.index]);



    const handleRemoveStream = () => {
        setIsVisible(false);
        setTimeout(() => {
            dispatch(deleteItem(props.thisItem._id));
          }, 500); // to match the transition duration
        
    }

    // Hide Tiles that push itemStream off screen
    const itemStreamRef = useRef(null);

    const bgColour = "bg-" + props.thisItem.colour + "-500";
    const highlightColour = "bg-" + props.thisItem.colour + "-300";

    return (
        <div className={`transition-all ${isVisible === true ? 'w-96 opacity-100 p-4' : 'w-0 opacity-0'}`}>
            <div className="flex relative">
                <div className={`text-xl m-auto h-10 px-4 py-1`}>{props.thisItem.name}</div>
                <div onClick={handleRemoveStream} className={`absolute right-0 p-2 pr-4 h-fit cursor-pointer justify-end`}>
                    <IconContext.Provider value={{ color: "black", size:"1.2em"}}>
                        <HiX/>
                    </IconContext.Provider>
                    </div>
            </div>
            <Droppable droppableId={props.thisItem._id}>
                {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className={`min-h-16 grid content-center rounded-xl shadow-cutout overflow-hidden ${bgColour}`}>
                    {items && items.map((newItem, index ) =>
                        <Tile
                            key={newItem._id}
                            index={index}
                            isNew={newItem.isNew || false}
                            thisItem={newItem}
                            listLength={items.length}
                            handleAddItem={handleAddItem}
                            parentColour={highlightColour}
                        />
                    )}
                    {provided.placeholder}
                    <div onClick={handleAddItem} className={`${items.length === 0 ? `h-16` : `h-fit`} grid place-content-center cursor-pointer`}>
                        <IconContext.Provider value={{ color: "black", size:"2em"}}>
                            <HiPlusSm/>
                        </IconContext.Provider>
                    </div>
                </div>
                )}
            </Droppable>
        </div>
    );
}

export default ItemStream;