import React, { useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeProvider';

export const ToolbarUseContext = () => {
    const { theme, toggleTheme } = React.useContext(ThemeContext);

    return (
        <button onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'dark' : 'light'} mode
        </button>
    );
};
