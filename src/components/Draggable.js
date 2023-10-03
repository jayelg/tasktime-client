import React, { useState, useRef, useContext, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import DragContext from './DragContext';

const Draggable = ({ index, setIsDraggingForParent, onDragEnd, parentContainer, children }) => {
  const { updateDragLocation } = useContext(DragContext);
  const [isChildDragging, setIsChildDragging] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [rect, setRect] = useState({ left: 0, top: 0, height: 0, width: 0 });
  const [absolutePos, setAbsolutePos] = useState({ left: 0, top: 0 });

  // we need to update dragLocation context with the cursor drag location in the StreamView component
  // for this we need to provide left, top, width, height

  // we need calculate container position relative to parent so it can sealessly transition from being in a flexbox to being positioned absolutely
  // We need to pass 

  const rectRef = useRef(null);
  useEffect(() => {
    if (rectRef.current && parentContainer) {
      const rectPosition = rectRef.current.getBoundingClientRect();
      setRect({ left: rectPosition.left, top: rectPosition.top, height: rectPosition.height, width: rectPosition.width});
      setAbsolutePos({ left: rectPosition.left - parentContainer.left, top: rectPosition.top - parentContainer.top })
    }
}, [ rectRef, parentContainer ])

  const [{ x, y, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
  }));

  const bind = useGesture(
    {
      onDragStart: ({ down }) => {
        if (down && !isChildDragging) {
          setIsDragging(true);
          if (setIsDraggingForParent) {
            setIsDraggingForParent(true);
          }
          updateDragLocation( 0, 0, rect.height, rect.width );
        }
      },
      onDrag: ({ down, movement: [mx, my], event }) => {
        if ( down && !isChildDragging ) {
          api.start({
            x: down ? mx : 0,
            y: down ? my: 0,
            scale: down ? 1.1 : 1,
          });
          const { left, top } = rectRef.current.getBoundingClientRect();
          updateDragLocation(left, top, rect.height, rect.width);
        }
      },
      onDragEnd: ({ down, event }) => {
        if ( !down && !isChildDragging ) {
          api.start({
            x: 0,
            y: 0,
            scale: 1,
          });
          setTimeout(() => {
            setIsDragging(false);
            if (setIsDraggingForParent) {
              setIsDraggingForParent(false);
            }
            if (onDragEnd) {
              onDragEnd(event);
            }
            api.set(
              {
                x: 0,
                y: 0,
              }
            )
          },500);
        }
      }
    },
    {
      enabled: !isChildDragging,
      preventDefault: true,
      rubberband: true,
      filterTaps: true

    }
  );

  // Add props to child components
  // setIsChildDragging - when child Draggable component is dragging this will be set to disable parent component
  // bind - if the draggable child component uses a drag handle then bind() is passed down to the child as props
  // this can be applied to a child component eg. div using <div {...bind}>
  // const processedChildren = React.Children.map(children, (child) => React.cloneElement(child, { bind: bind(), isParentDragging: isDragging, setIsDraggingForParent: setDisabledDragFromChild }));
    const [ processedChildren, setProcessedChildren ] = useState(children);
  useEffect(() => {
    setProcessedChildren(React.Children.map(children, (child) =>
      React.cloneElement(child, {
        bind: bind(),
        isParentDragging: isDragging,
        setIsDraggingForParent: setIsChildDragging,
      })
    ));
  }, [bind, isDragging, children]);
  

  const DragStyles = {
    x,
    y,
    scale,
    ...(isDragging ? {
      left: absolutePos.left,
      top: absolutePos.top,
      position: "absolute",
      zIndex: 40,
    } : {}),
  };

  return (
    <>

    <animated.div style={DragStyles} ref={rectRef}>
      {processedChildren}
    </animated.div>
    </>
  );
};

export default Draggable;