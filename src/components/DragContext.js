import React from 'react';

const DragContext = React.createContext({
  dragLocation: {
    left: 0,
    top: 0,
    height: 0,
  },
  updateDragLocation: () => {},
});

export default DragContext;