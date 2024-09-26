import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

const ThemedButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <header>Themed Button</header>
      <button
        style={{
          background: theme === 'light' ? '#fff' : '#000',
          color: theme === 'light' ? '#000' : '#fff',
        }}
        onClick={toggleTheme}
      >
        Toggle Theme
      </button>
    </div>
  );
}

export default ThemedButton;