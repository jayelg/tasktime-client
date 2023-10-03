import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateItemProperty } from '../slices/projectSlice';
import ContentEditable from 'react-contenteditable';

const ItemInput = ({ itemName, isNew, isFocus, itemId, property, index, disabled, setIsDraggable, selectionColour, textSize, placeholder }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState(itemName);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if ((isNew || isFocus) && inputRef.current) {
      inputRef.current.focus();
      selectText();
    }
  }, [isNew]);

  const handleInput = () => {
    dispatch(
      updateItemProperty({ itemId: itemId, property: property, value: inputValue })
    );
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleInput(event);
      handleKeyUp(event, index);
    } else if (event.key === 'Tab') {
      handleKeyUp(event, index);
    }
  };

  const handleBlur = (event) => {
    if (!disabled) {
      handleInput(event);
      setIsDraggable(false);
      setIsEditable(false);
    }
  };

  const handleInputValueChange = (event) => event !== 'Enter' ? setInputValue(event.target.value) : null;

  const selectText = () => {
    if (inputRef.current) {
      const selection = window.getSelection();
      const range = document.createRange();
      // range.selectNodeContents(inputRef.current);
      // selection.removeAllRanges();
      // selection.addRange(range);

      const textNode = inputRef.current.firstChild; // Assuming the inputRef.current is the container element for the text
  
      range.selectNodeContents(textNode);
      range.collapse(false); // Place the cursor at the end of the text
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  // To block the enter key in names
  const handleKeyDown = (event) => {
    const blockedCharacters = ['Enter'];
    if (blockedCharacters.includes(event.key)) {
      event.preventDefault();
    }
    if (event.key === 'Tab') {
      event.preventDefault();
    }
  };

  // triggers on doubleclick on ContentEditable Component
  const makeEditable = () => {
    if (!disabled) {
      setIsDraggable(true);
      setIsEditable(true);
      setTimeout(() => {
        inputRef.current.focus();
        selectText();
      }, 1);
    }
  };

  return (
    <ContentEditable
      innerRef={inputRef}
      html={inputValue}
      onChange={handleInputValueChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onFocus={selectText}
      draggable={false}
      className={`
        transition:all flex justify-start flex-grow h-11
        text-zinc-800 focus:text-${selectionColour}-400 dark:text-zinc-400 dark:focus:text-${selectionColour}-400
        placeholder:text-zinc-800 dark:placeholder:text-zinc-400
        selection:bg-${selectionColour}-500 focus:bg-zinc-400 dark:selection:bg-zinc-800 dark:focus:bg-zinc-700 focus:cursor-text
        ${textSize}
        p-2 rounded-md outline-none resize-none whitespace-pre-wrap break-word cursor-default ${isEditable ? "select-auto" : "select-none"}`}
      tagName="div"
      placeholder={placeholder}
      disabled={!isEditable}
      onDoubleClick={makeEditable}
    />
  );
};

export default ItemInput;