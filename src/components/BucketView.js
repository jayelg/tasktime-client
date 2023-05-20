import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProject, updateItemProperty } from '../slices/projectSlice';
import ItemStream from './ItemStream';

const BucketView = (props) => {

    // sets which sub item streams are rendered in view 
    // Todo: implement in user settings either last viewed or set default view
    let viewLevel = "topLevel"; 

    const [editingStreamName, seteditingStreamName] = useState(false);

    const [newName, setNewName] = useState('');

    const handleDoubleClick = () => {
        seteditingStreamName(true);
      };

      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          // Dispatch an action to update Redux with the new title
          dispatch(updateItemProperty("name", newName));
      
          // Exit editing mode
          seteditingStreamName(false);
        }
      };

      const handleBlur = () => {
        seteditingStreamName(false);
      };

    const dispatch = useDispatch();
    const project = useSelector((state) => state.project.data);
  
    useEffect(() => {
      dispatch(fetchProject("646580474e1ac795acdabc89"));
    }, [dispatch]);

    return (
        <div className='
            grid  p-6 
            xs:grid-cols-1 xs:max-w-screen-xs sm:justify-center
            sm:grid-cols-1 sm:max-w-screen-sm
            md:grid-cols-2 md:max-w-screen-md
            lg:grid-cols-3 lg:max-w-screen-lg
            xl:grid-cols-4 xl:max-w-screen-xl xl:justify-items-center	
            2xl:grid-cols-5 2xl:max-w-screen-2xl 2xl:justify-items-center
            h-auto overflow-hidden'>
            {
            project && project.items.map((item) => (
                item.parentItemId === viewLevel ? (
                <div className={`justify-center h-fit overflow-hidden max-w-xs`}>
                    {/* Header area */}
                    <div className={`flex justify-center h-8 px-4 py-1`}>
                        { editingStreamName ?
                            <input placeholder={item.name}
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className={`font-extrabold text-xl placeholder:text-zinc-800 outline-0 bg-transparent border-none inline text-center p-0 m-0 w-fit h-fit text-zinc-800`} />
                            :
                            <h1 onDoubleClick={handleDoubleClick}>{item.name}</h1>
                        }
                    </div>
                    <div  className={`justify-center rounded-xl h-fit shadow-cutout m-4 overflow-hidden max-w-xs ${item.colour} transition-bucket transition-colors duration-300`}>
                        <ItemStream key={item._id} thisItem={item} isVisible={item?.isVisible}/>
                    </div>
                </div>
                ) : null
             ))}
        </div>
    )
}

export default BucketView;