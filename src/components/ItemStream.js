import React from 'react';
import Tile from './Tile';
import { IconContext } from "react-icons";
import { HiPlusSm } from "react-icons/hi";
import { useSelector, useDispatch } from 'react-redux';
import { addItemToProject } from '../slices/projectSlice';
import GetColour from '../utils/GetColour';
import { v4 as uuidv4 } from 'uuid';

const ItemStream = (props) => {
    const dispatch = useDispatch();
    const items = useSelector((state) => {
        return state.project.data.items.filter(item => item.parentItemId === props.thisItem._id);
    });

    const handleOnClick = () => {
        const tempId = uuidv4();
        const newItem = {
            _id: tempId,
            name: "New Item",
            creator: "John",
            parentItemId: props.thisItem._id,
            colour: GetColour(),
        }
        dispatch(addItemToProject(newItem));
    };

    return (
        <div className={`justify-center h-fit overflow-hidden max-w-xs m-1`}>
            {items && items.map((newItem, index ) =>
                <Tile key={newItem._id} index={(1 + index)} isNew={newItem.isNew || false} thisItem={newItem} appCallBackFunctions={props.appCallBackFunctions}/>
            )}

            <div onClick={handleOnClick} className={`flex justify-center h-fit text-white cursor-pointer`}>
                <IconContext.Provider value={{ color: "black", size:"2em"}}>
                    <HiPlusSm/>
                </IconContext.Provider>
            </div>
        </div>
    );
}

export default ItemStream;