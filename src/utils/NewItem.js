import { v4 as uuidv4 } from 'uuid';
import GetColour from './GetColour';

const NewItem = (parentItemId, lastColour) => {
    const tempId = uuidv4();
    return {
            _id: tempId,
            name: "",
            creator: "John",
            parentItemId: parentItemId,
            colour: GetColour(lastColour),
            isNew: true,
            isRendered: false,
            isFocus: false,
            successorItemIds: [], // required to avoid errors when initial placeholder item is created in store
            predecessorItemIds: [],
        }

}

export default NewItem;