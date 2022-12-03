import { useState, useEffect } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark-theme");
  }, [isDark]);

  return (
    <header className="primary-header | bg-primary-100 box-shadow">
      <div className="primary-header__content | container clr-secondary">
        <h1 className="fs-700 fw-bold">Where in the world?</h1>
        <button type="button" onClick={() => setIsDark(!isDark)}>
          {isDark ? (
            <span className="primary-header__toggle-theme-btn-content">
              <BsMoonFill /> Dark Mode
            </span>
          ) : (
            <span className="primary-header__toggle-theme-btn-content">
              <BsSunFill /> Light Mode
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
