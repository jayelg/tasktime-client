import React from 'react';
import Bucket from './Bucket';
import AddBucket from './AddBucket';

const BucketList = (props) => {
    return (
        <div className='
            grid auto-cols-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5
            m-auto p-6 max-w-screen-2xl h-auto overflow-hidden'>
            {props.buckets.map((bucket) => (
                <Bucket key={bucket.id} id={bucket.id} name={bucket.name} bgColour={bucket.colour} tasks={props.tasks} handleNewTask={props.handleNewTask} />
            )
            )}
            <AddBucket handleNewBucket={props.handleNewBucket} />
        </div>
    )
}

export default BucketList;