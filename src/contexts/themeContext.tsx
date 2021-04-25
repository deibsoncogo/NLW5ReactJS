import { createContext, ReactNode, useState, useContext } from "react";

type ThemeContextData = {
  isThemeDark: boolean,
  ToggleTheme: () => void,
}

export const ThemeContext = createContext({} as ThemeContextData);

type ThemeContextProviderProps = {
  children: ReactNode,
}

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [isThemeDark, setIsThemeDark] = useState(true);

  function ToggleTheme() {
    setIsThemeDark(!isThemeDark);
  }

  return (
    <ThemeContext.Provider value={{ isThemeDark, ToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const UseTheme = () => useContext(ThemeContext);
