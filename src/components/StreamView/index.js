import React, { useState, useEffect, useRef } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchProject, addItemToProject } from '../../slices/projectSlice';
// components
import ItemStream from './ItemStream';
// utils
import NewItem from '../../utils/NewItem';
// icons
import { IconContext } from "react-icons";
import { HiPlusSm } from "react-icons/hi";
import { HiArrowLongDown } from "react-icons/hi2";

import ScrollContainer from '../common/ScrollContainer';
import Draggable from '../Draggable';
import DragContext from '../DragContext';

const StreamView = (props) => {

    // Drag Context
    const [dragLocation, setDragLocation] = useState({ left: 0, top: 0, height: 0, width: 0 });
    const updateDragLocation = (left, top, height, width) => {
      setDragLocation({ left, top, height, width });
    };

    const [isChildDragging, setIsChildDragging] = useState(false);

    let lastColour = "teal";

    // sets which item streams are rendered in view 
    // Todo: this should be passed in as props in the future
    let viewLevel = "646580474e1ac795acdabc89"; // this is a default testing project
    const dispatch = useDispatch();
    const project = useSelector((state) => state.project.data);
    useEffect(() => {
      dispatch(fetchProject(viewLevel));
    }, [dispatch, viewLevel]);

    // Add item Code...
    const handleOnClick = () => {
        dispatch(addItemToProject(NewItem(viewLevel, lastColour)));
    };

    // to implement once api has been updated to handle predecessor/successor items
    // in the main mapping operation, it need to also check that items predecessors == "parent"
    // Recursively traverse the linked list of items and render them
    const renderSuccessorItems = (itemId) => {
        try {
            const item = project.items.find((item) => item._id === itemId);
            if (!item || item.successorItemIds.length === 0) {
                return null;
            }
            return item.successorItemIds.map((successorItemId, index) => {
                const successorItem = project.items.find((item) => item._id === successorItemId);
                return (
                <div key={successorItem._id}>
                    <div className="flex justify-center">
                    <IconContext.Provider value={{ color: "black", size:"3em"}}>
                        <HiArrowLongDown/>
                    </IconContext.Provider>
                    </div>
                    <Draggable index={index} key={item._id} dragHandle={false} setIsDraggingForParent={setIsChildDragging} onDragEnd={onDragEnd}>
                        <ItemStream
                            thisItem={successorItem}
                            index={index}
                            isVisible={successorItem?.isVisible}
                            isNew={item.isNew || false}
                            setIsStreamDraggable={isChildDragging}
                        />
                    </Draggable>
                {renderSuccessorItems(successorItem._id)}
                </div>
                );
            });
        } catch (error) {
            console.log("ERROR: " + error);
        }
    };

    const onDragEnd = ({x, y, width, height},event) => {
        // console.log(x+(width/2));
        // console.log(y+(height/2));
    }

    return (
        <DragContext.Provider value={{ dragLocation, updateDragLocation }}>
            <ScrollContainer>
            {project && project.items.filter((item) => item.parentItemId === viewLevel && item.predecessorItemIds.length === 0).map((item, index) => {
                lastColour=item.colour;
                return (
                    <Draggable index={index * 10} key={item._id} dragHandle={false} onDragEnd={onDragEnd} setIsDraggingForParent={setIsChildDragging}>
                        <ItemStream thisItem={item} index={index} isVisible={item?.isVisible} isNew={item.isNew || false} onDragEnd={onDragEnd}/>
                    </Draggable>
            )})}
            </ScrollContainer>
        </DragContext.Provider>
    )
}

export default StreamView;