import React, { useState } from 'react';


const BurgerButton = () => {
  const [toggle, setToggle] = useState(false); // false == burger, true == cross

// useEffect(() => {
//   setTimeout(() => {
//     setIsVisible(true);
//   }, props.isNew ? 0 : props.index * 150); // creates a cascading animation for the order of each item, new items skip the delay
// }, [props.index]);

  const handleOnClick = () => {
    setToggle(prevToggle => !prevToggle);    
  }


    return (
      <div onClick={handleOnClick} className="stroke-black stroke-1 cursor-pointer">
        <svg className="transition-all duration-1000" viewBox="0 0 24 24">
          <line className="cross-icon-line" x1="4" y1="4" x2="20" y2={toggle ? "4" : "20"} strokeLinecap="round" />
          <line className="cross-icon-line" x1="4" y1="20" x2="20" y2={toggle ? "20" : "4"} strokeLinecap="round" />
        </svg>
      </div>
    );
  };
  
  export default BurgerButton;