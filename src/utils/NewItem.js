import { v4 as uuidv4 } from 'uuid';
import GetColour from './GetColour';

const NewItem = (parentItemId) => {
    const tempId = uuidv4();
    return {
            _id: tempId,
            name: "New Item",
            creator: "John",
            parentItemId: parentItemId,
            colour: GetColour(),
            isNew: true,
            successorItemIds: [], // required to avoid errors when initial placeholder item is created in store
            predecessorItemIds: [],
        }

}

export default NewItem;