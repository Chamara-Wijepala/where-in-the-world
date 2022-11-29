import { useState, useEffect } from "react";

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark-theme");
  }, [isDark]);

  return (
    <header className="primary-header | bg-primary-100">
      <div className="primary-header__content | container clr-secondary">
        <h1 className="fs-700 fw-bold">Where in the world?</h1>
        <button type="button" onClick={() => setIsDark(!isDark)}>
          Dark Mode
        </button>
      </div>
    </header>
  );
}
