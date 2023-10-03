import React, { useEffect, useState, useRef } from 'react';
import Tile from './Tile';
import ItemInput from '../ItemInput';
import { IconContext } from "react-icons";
import { HiPlusSm } from "react-icons/hi";
import { MdDragIndicator } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { addItemToProject, deleteItem, updateItemProperty } from '../../slices/projectSlice';
import NewItem from '../../utils/NewItem';
import DeleteItemButton from '../DeleteItemButton';
import Draggable from '../Draggable';
import { animated, useSpring } from '@react-spring/web';

const ItemStream = (props) => {

    const [isVisible, setIsVisible] = useState(props.thisItem.isRendered);
    const [isFocus, setIsFocus] = useState(false)
    const [zIndex, setZIndex] = useState(0)
    const [isChildDragging, setIsChildDragging] = useState(null)
    const [container, setContainer] = useState({ left: 0, top: 0, height: 0, width: 0 })
    const containerRef = useRef(null);

    useEffect(() => {
        const setIsDraggingForParent = props.setIsDraggingForParent;
        setIsDraggingForParent(isChildDragging);
        if (isChildDragging) {
            setZIndex(88888);
        } else {
            setZIndex(0);
        }
    }, [isChildDragging])

    // this should instead run once on load?
    useEffect(() => {
        if (containerRef.current) {
            setTimeout(() => {
                const { left, top, height, width } = containerRef.current.getBoundingClientRect();
                setContainer({ left: left, top: top, height: height, width: width });
            }, 1000)
        }
    }, [containerRef])



    const dispatch = useDispatch();
    const items = useSelector((state) => {
        return state.project.data.items.filter(item => item.parentItemId === props.thisItem._id);
    });

    const handleAddItem = () => {
        dispatch(addItemToProject(NewItem(props.thisItem._id)));
    };

    useEffect(() => {
        setTimeout(() => {
          setIsVisible(true);
          dispatch(updateItemProperty({itemId: props.thisItem._id, property: "isRendered", value: true}));
        }, 0); // creates a cascading animation for the order of each item, new items skip the delay
      }, [dispatch, props.thisItem._id]);

    const handleRemoveStream = () => {
        setIsVisible(false);
        setTimeout(() => {
            dispatch(deleteItem(props.thisItem._id));
            props.triggerScrollUpdate();
          }, 500); // to match the transition duration
        
    }

    const bgColour = "bg-" + props.thisItem.colour + "-500";
    const selectionColour = props.thisItem.colour;
    
    const handleInputKeyUp = (event, index = 0) => {
        // Pressing Enter or Tab on a new empty item stream or the last item in the stream creates a new item
        if ((event.key === 'Enter' || event.key === 'Tab') && (items.length === 0 || index === items.length - 1)) {
            handleAddItem();
        }
        // Pressing Tab 
        if (event.key === 'Tab') { 
            items.length > index ? console.log("tab for index " + index) : handleAddItem();
        }
    }

    const focusItem = (index) => {
        items[index].isFocus = true;
    }

    const springStyles = useSpring({
        height: isVisible ? 'auto' : '0%',
      });

      const fillerStyles = {
        height: props.isDragging ? `${container.height}px` : `0`,
        width: props.isDragging ? `${container.width}px` : `0`,
      };

    return (
        <>
            <animated.div style={fillerStyles} className={`${ props.isDragging ? "pl-10 flex-col flex-shrink-0 justify-center items-center": "" } `} />
        <div
            className={`${props.isParentDragging ? "active:shadow-lg bg-zinc-300 dark:bg-zinc-800" : ""} transition-stream ${isVisible === true ? 'w-fit opacity-100' : 'w-0 opacity-0'} flex-col justify-center items-center flex-shrink-0 rounded-3xl transition-colors duration-500`}
        >
            <div className={`p-4`}>            
                <div className={` flex items-center text-xl py-1`}>
                    <div {...props.bind} className={`flex items-center p-2 mr-2 cursor-pointer text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors duration-300`}>
                        <MdDragIndicator/>
                    </div>
                    <ItemInput
                        itemName={props.thisItem.name}
                        index={props.index}
                        property={"name"}
                        itemId={props.thisItem._id}
                        selectionColour={selectionColour}
                        isNew={props.thisItem.isNew}
                        isFocus={isFocus}
                        handleKeyUp={handleInputKeyUp}
                        textSize={"text-xl"}
                        setIsDraggable={() => {}}
                        className={`mx-auto`}
                    />
                    <DeleteItemButton onClick={handleRemoveStream} itemId={props.thisItem._id} setIsVisible={setIsVisible}/>
                </div>
                <div
                    style={{
                        zIndex: zIndex
                    }}
                    className='container relative'
                    ref={containerRef}
                >
                    <animated.div style={springStyles} className={`flex flex-col justify-center min-h-16 rounded-xl shadow-cutout dark:shadow-cutoutDark ${bgColour} clip-path-none overflow-hidden`}>
                        {items && items.map((newItem, index ) => {
                            return (
                                    <Draggable index={index} key={newItem._id} onDragEnd={props.onDragEnd} setIsDraggingForParent={setIsChildDragging} setParentZIndex={setZIndex} parentContainer={container}> 
                                        <Tile
                                            index={index}
                                            isNew={newItem.isNew || false}
                                            thisItem={newItem}
                                            selectionColour={selectionColour}
                                            handleKeyUp={handleInputKeyUp}
                                        />
                                    </Draggable>
                            )
                        }
                            )}
                        <div onClick={handleAddItem} className={`${items.length === 0 ? `h-16` : `h-fit`} flex items-center justify-center m-auto w-96 cursor-pointer`}>
                            <IconContext.Provider value={{ color: "black", size:"2em"}}>
                                <HiPlusSm/>
                            </IconContext.Provider>
                        </div>
                    </animated.div>
                </div>
            </div>
        </div>
        </>
    );
}

export default ItemStream;