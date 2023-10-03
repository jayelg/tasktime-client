import React, { useState, useEffect, useContext, useRef } from 'react';
import ItemInput from '../ItemInput';
import { useDispatch } from 'react-redux';
import { updateItemProperty } from '../../slices/projectSlice';
import DeleteItemButton from '../DeleteItemButton';
import DragContext from '../DragContext';
import { useSpring, animated } from '@react-spring/web';

// props passed from 

const Tile = ({ index, thisItem, selectionColour, isFocus, handleKeyUp, bind, isParentDragging, setDisableParentDrag, rect }) => {
    const dispatch = useDispatch();

    const { dragLocation } = useContext(DragContext);

    const ref = useRef(null);

    const [isVisible, setIsVisible] = useState(thisItem.isRendered || false);

    // Transition Animation
    useEffect(() => {
        setTimeout(() => {
          setIsVisible(true);
          dispatch(updateItemProperty({ itemId: thisItem._id, property: "isRendered", value: true}));
        }, thisItem.isNew ? 150 : index * 150); // this creates a cascading animation for the order of each item, new items skip the delay
      }, [dispatch, thisItem.isNew, thisItem._id, index]);

      // startup effect
    //   useEffect(() => {
    //     const calculateTopPadding = () => {
    //       if (dragLocation && ref.current && !isParentDragging) {
    //         const { left, top } = ref.current.getBoundingClientRect();
    //         const dragLeft = dragLocation.left;
    //         const dragTop = dragLocation.top;
    //         const dragHeight = dragLocation.height;
    //         if (!isParentDragging && dragTop > top - (dragHeight/2) && dragTop < top + (dragHeight/2)) {
    //             api.start({ topFillerHeight: `${dragHeight}px`, bottomFillerHeight: '0' });
    //         } else if (!isParentDragging && dragTop > top + (dragHeight/2) && dragTop < top + dragHeight) {
    //             api.start({ topFillerHeight: '0', bottomFillerHeight: `${dragHeight}px` });
    //         } else if (isParentDragging) {
    //             api.start({ topFillerHeight: `${dragHeight}px`, bottomFillerHeight: `0` });
    //         } else {
    //             api.start({ topFillerHeight: '0', bottomFillerHeight: '0' });
    //         }
    //       }
    //     }
    //     calculateTopPadding();
    //     }, []);

    return (
        <div
        {...bind}
        className={`transition-all duration-300 w-96 ${isVisible ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        ref={ref}
        >
            <div
                className={`
                ${isParentDragging ? "active:shadow-2xl" : ""}
                flex flex-row items-center 
                py-4 px-2 mt-1 mx-1
                transition-tile duration-500
                bg-zinc-300 dark:bg-zinc-800
                hover:shadow-md rounded-lg shadow-tile dark:shadow-tileDark
                clip-path-none
                `}>
                <ItemInput
                    className={`${selectionColour}
                        ${isVisible ? 'h-fit opacity-100' : 'h-0 opacity-0'}
                        transition-tile duration-500
                        pl-14 flex-auto`}
                    index={index}
                    property={"name"}
                    placeholder={"New Item"}
                    itemName={thisItem.name}
                    itemId={thisItem._id}
                    selectionColour={selectionColour}
                    isNew={thisItem.isNew}
                    isFocus={isFocus}
                    handleKeyUp={handleKeyUp}
                    textSize={"text-lg"}
                    setIsDraggable={setDisableParentDrag}
                    disabled={isParentDragging}
                />
                <DeleteItemButton itemId={thisItem._id} setIsVisible={setIsVisible}/>
            </div>
        </div>
    )
}

export default Tile;