import React, { useState, useEffect, useRef } from 'react';
import { IconContext } from "react-icons";
import { HiOutlineTrash } from "react-icons/hi";
import { useDispatch } from 'react-redux';
import { deleteItem, updateItemProperty } from '../slices/projectSlice';
import { Draggable } from 'react-beautiful-dnd';

const Tile = (props) => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const [isVisible, setIsVisible] = useState(props.thisItem.isRendered);
    const [inputValue, setInputValue] = useState(props.thisItem.name);

    const selectionColour = "selection:" + props.parentColour;

    // Transition Animation
    useEffect(() => {
        setTimeout(() => {
          setIsVisible(true);
          dispatch(updateItemProperty({ itemId: props.thisItem._id, property: "isRendered", value: true}));
        }, props.isNew ? 0 : props.index * 150); // this creates a cascading animation for the order of each item, new items skip the delay
      }, [props.index]);

    useEffect(() => {
        if (props.isNew && inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
    }, [props.isNew]);

    // Delete Item Button
    const handleOnClick = () => {
        setIsVisible(false);
        setTimeout(() => {
            dispatch(deleteItem(props.thisItem._id));
          }, 500); // to match the transition duration
        
    }

    // Input Text
    const handleInput = (event) => {
        dispatch(updateItemProperty({itemId: props.thisItem._id, property: "name", value: inputValue}));
    }

    const handleEnter = (event) => {
        console.log(props.index + " and " + props.listLength);
        if (event.key === 'Enter' && props.index === props.listLength - 1) {
            console.log("enter pressed");
            props.handleAddItem();
        }
    }

    const handleBlur = (event) => {
        handleInput(event);
        handleEnter(event);
      };

    const handleFocus = () => {
        if (inputRef.current) {
          inputRef.current.select();
        }
      };

    return (
        <Draggable draggableId={props.thisItem._id} key={props.thisItem._id} index={props.index}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`${isVisible ? 'h-16 opacity-100' : 'h-0 opacity-0'} transition-tile duration-{500 overflow-hidden mt-1 mx-1 bg-zinc-300 dark:bg-zinc-900 z-10 flex justify-center items-center hover:shadow-tileHover rounded-lg w-auto shadow-tile`}>
                    <input
                        ref={inputRef}
                        placeholder="Task Name"
                        value={inputValue}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onKeyUp={handleEnter}
                        onChange={(event) => setInputValue(event.target.value)}
                        className={`${selectionColour} pl-14 flex-auto w-1 text-xl placeholder:text-zinc-600 outline-0 bg-transparent border-none text-center mx-auto justify-center h-5 `}
                    />
                    <div onClick={handleOnClick} className={`flex-none px-4 h-fit text-white cursor-pointer`}>
                        <IconContext.Provider value={{ color: "black", size:"1em"}}>
                            <HiOutlineTrash/>
                        </IconContext.Provider>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default Tile;