import React, { useEffect } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchProject, addItemToProject, updateItemPosition } from '../slices/projectSlice';
// components
import ItemStream from './ItemStream';
// utils
import NewItem from '../utils/NewItem';
// icons
import { IconContext } from "react-icons";
import { HiPlusSm } from "react-icons/hi";
import { HiArrowLongDown } from "react-icons/hi2";


const BucketView = (props) => {

    // sets which sub item streams are rendered in view 
    // Todo: implement in user settings either last viewed or set default view
    let viewLevel = "topLevel"; 

    const dispatch = useDispatch();
    const project = useSelector((state) => state.project.data);
  
    useEffect(() => {
      dispatch(fetchProject("646580474e1ac795acdabc89"));
    }, [dispatch]);

    // should refactor this into its own util so minimum is passed in ie. user and parentItemId
    const handleOnClick = () => {
        dispatch(addItemToProject(NewItem(viewLevel)));
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
                    <ItemStream
                        thisItem={successorItem}
                        isVisible={successorItem?.isVisible}
                    />
                {renderSuccessorItems(successorItem._id)}
                </div>
                );
            });
        } catch (error) {
            console.log("ERROR: " + error);
        }
    };
          
    const onDragEnd = (result) => {
        const { destination, source } = result;
        if ( !destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }
        dispatch(updateItemPosition(destination.droppableId, source.draggableId, destination.index));
    };

    return (
        <div
            className='flex mx-10 h-auto'>
            {
            project && project.items.filter((item) => item.parentItemId === viewLevel && item.predecessorItemIds.length === 0).map((item) => (
                <div key={item._id}>
                    <ItemStream thisItem={item} isVisible={item?.isVisible} />
                    {renderSuccessorItems(item._id)}
                </div>
            ))}
            <div className={`p-4 w-96`}>
                <div className={`text-xl m-auto max-w-sm justify-center flex h-10 px-4 py-1`}>
                    Add Item
                </div>
                <div onClick={handleOnClick} className={`w-96 rounded-xl outline-4 text-center outline-dashed p-4 outline-zinc-400 hover:bg-white/40 transition-colors duration-300 flex justify-center h-16 text-white cursor-pointer`}>
                    <IconContext.Provider value={{ color: "black", size:"2em"}}>
                        <HiPlusSm/>
                    </IconContext.Provider>
                </div>

            </div>
        </div>
    )
}

export default BucketView;