import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';

const ScrollContainer = ({ children }) => {
  const containerRef = useRef(null);
  const [container, setContainer] = useState({ left: 0, top: 0, height: 0, width: 0 });

  useEffect(() => {
    const { left, top, height, width } = containerRef.current.getBoundingClientRect();
    setContainer({ left, top, height, width });
  }, []);

  const [scrollThumbWidth, setScrollThumbWidth] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollHidden, setScrollHidden] = useState(false);
  const [dragging, setDragging] = useState(false);

  const [{ x }, api] = useSpring(() => ({
    x: 0,
  }));

  const bind = useGesture(
    {
      onDragStart: () => {
        setDragging(true);
      },
      onDrag: ({ down, movement: [mx] }) => {
        if (down && !scrollHidden) {
          api.start({ x: down ? mx : 0 });
          const container = containerRef.current;
          const scrollAmount = (mx / container.clientWidth) * (container.scrollWidth - container.clientWidth);
          container.scrollLeft = scrollAmount;
          const percentage = (container.scrollLeft / (container.scrollWidth - container.clientWidth)) * 100;
          setScrollPercentage(percentage);
          setScrollPosition(container.scrollLeft);
        }
      },
      onDragEnd: () => {
        setDragging(false);
      },
    },
    {
      enabled: !scrollHidden,
      preventDefault: true,
      rubberband: true,
      filterTaps: true,
    }
  );

  const updateScroll = useCallback(() => {
    const container = containerRef.current;
    const thumbWidth = (container.clientWidth / container.scrollWidth) * container.clientWidth;
    const percentage = (container.scrollLeft / (container.scrollWidth - container.clientWidth)) * 100;
    const thumbPercentage = (1 - thumbWidth / container.clientWidth) * percentage;
    setScrollThumbWidth(thumbWidth);
    setScrollPercentage(thumbPercentage);
    setScrollPosition(container.scrollLeft);
    setScrollHidden(container.scrollWidth <= container.clientWidth);
  }, [setScrollPosition]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScroll);
      window.addEventListener('resize', updateScroll);

      return () => {
        container.removeEventListener('scroll', updateScroll);
        window.removeEventListener('resize', updateScroll);
      };
    }
  }, [updateScroll]);

  useEffect(() => {
    updateScroll();
  }, [updateScroll]);

  useEffect(() => {
    setTimeout(() => {
      updateScroll();
    }, 300);
    updateScroll();
  }, []);

  const processedChildren = useMemo(() => {
    if (children) {
      return React.Children.map(children, (child) => {
        if (child) {
          return React.cloneElement(child, {
            parentContainer: container,
          });
        }
        return null;
      });
    }
    return null;
  }, [children, container]);

  return (
    <div className='flex flex-col h-screen'>
      <div
        className={`w-screen px-10 h-12 transition-opacity duration-200 ${
          scrollHidden ? 'opacity-0 hover:opacity-0 active:opacity-0' : 'opacity-30 hover:opacity-60 active:opacity-100'
        }`}
        style={{ width: `${scrollThumbWidth}px`, left: `${scrollPercentage}%` }}
      >
        <div {...bind()} className='w-full h-4 my-4 bg-zinc-500 rounded-full transition-all duration-300' />
      </div>
      <main className='relative flex flex-grow flex-shrink-0 overflow-x-scroll overflow-y-hidden scroll-smooth snap-mandatory snap-x scrollbar-hide' ref={containerRef}>
        {processedChildren}
      </main>
    </div>
  );
};

export default ScrollContainer;