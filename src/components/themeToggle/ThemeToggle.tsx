import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');  
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);


  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <button
    type="button"
    className="border px-2 hover:bg-amber-100"
    onClick={toggleTheme}
    aria-label={isDark ? 'Skift til light mode' : 'Skift til Dark Mode'}
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  )
}
