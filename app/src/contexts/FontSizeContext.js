import React, { createContext, useState, useContext, useEffect } from 'react';

const FontSizeContext = createContext();

export const useFontSize = () => useContext(FontSizeContext);

export const FontSizeProvider = ({ children }) => {
  const defaultTitleFontSize = 24;
  const defaultTextFontSize = 18; 
  const defaultButtonFontSize = 12;
  
  const MIN_TITLE_FONT_SIZE = 18;
  const MAX_TITLE_FONT_SIZE = 36;
  const MIN_TEXT_FONT_SIZE = 12;
  const MAX_TEXT_FONT_SIZE = 30;
  const MIN_BUTTON_FONT_SIZE = 6;
  const MAX_BUTTON_FONT_SIZE = 24;

  const [titleFontSize, setTitleFontSize] = useState(() => {
    const storedSize = localStorage.getItem('titleFontSize');
    return storedSize ? parseInt(storedSize) : defaultTitleFontSize;
  });

  const [textFontSize, setTextFontSize] = useState(() => {
    const storedSize = localStorage.getItem('textFontSize');
    return storedSize ? parseInt(storedSize) : defaultTextFontSize;
  });

  const [buttonFontSize, setButtonFontSize] = useState(() => {
    const storedSize = localStorage.getItem('buttonFontSize');
    return storedSize ? parseInt(storedSize) : defaultButtonFontSize;
  });
  
  // Define state for dark mode preference
  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem('darkMode');
    return storedMode ? JSON.parse(storedMode) : false;
  });
  
  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
	localStorage.setItem('darkMode', JSON.stringify(!darkMode));
  };
  
  useEffect(() => {
    // Apply dark mode styles dynamically
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
    // Update dark mode preference in local storage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);
  
  const updateFontSize = (size, setter, key) => {
    setter(size);
    localStorage.setItem(key, size.toString());
  };

  const increaseFontSize = () => {
	if (titleFontSize < MAX_TITLE_FONT_SIZE)
	{
		updateFontSize(titleFontSize + 2, setTitleFontSize, 'titleFontSize');
	}
	
	if (textFontSize < MAX_TEXT_FONT_SIZE)
	{
		updateFontSize(textFontSize + 2, setTextFontSize, 'textFontSize');
	}
	
	if (buttonFontSize < MAX_BUTTON_FONT_SIZE)
	{
		updateFontSize(buttonFontSize + 2, setButtonFontSize, 'buttonFontSize');
	}
  };

  const decreaseFontSize = () => {
    if (titleFontSize > MIN_TITLE_FONT_SIZE)
	{
		updateFontSize(titleFontSize - 2, setTitleFontSize, 'titleFontSize');
	}
	
	if (textFontSize > MIN_TEXT_FONT_SIZE)
	{
		updateFontSize(textFontSize - 2, setTextFontSize, 'textFontSize');
	}
	
	if (buttonFontSize > MIN_BUTTON_FONT_SIZE)
	{
		updateFontSize(buttonFontSize - 2, setButtonFontSize, 'buttonFontSize');
	} 
  };

  const resetFontSize = () => {
    setTitleFontSize(defaultTitleFontSize);
    setTextFontSize(defaultTextFontSize);
    setButtonFontSize(defaultButtonFontSize);
    localStorage.removeItem('titleFontSize');
    localStorage.removeItem('textFontSize');
    localStorage.removeItem('buttonFontSize');
  };

  useEffect(() => {
    localStorage.setItem('titleFontSize', titleFontSize.toString());
  }, [titleFontSize]);

  useEffect(() => {
    localStorage.setItem('textFontSize', textFontSize.toString());
  }, [textFontSize]);

  useEffect(() => {
    localStorage.setItem('buttonFontSize', buttonFontSize.toString());
  }, [buttonFontSize]);

  useEffect(() => {
    document.documentElement.style.setProperty('--title-font-size', `${titleFontSize}px`);
    document.documentElement.style.setProperty('--text-font-size', `${textFontSize}px`);
    document.documentElement.style.setProperty('--button-font-size', `${buttonFontSize}px`);
  }, [titleFontSize, textFontSize, buttonFontSize]);

  return (
    <FontSizeContext.Provider
      value={{
        titleFontSize,
        textFontSize,
        buttonFontSize,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
		darkMode, // Provide dark mode preference to consumers
        toggleDarkMode, // Provide function to toggle dark mode
      }}
    >
      {children}
    </FontSizeContext.Provider>
  );
};
