import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import Home from "pages/home";
import Details from "pages/details";

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Details />} />
      </Routes>
    </>
  );
}

function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark-theme");
  }, [isDark]);

  return (
    <header className="primary-header | bg-primary-100 box-shadow">
      <div className="primary-header__content | container clr-secondary">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 className="fs-700 fw-bold clr-secondary">Where in the world?</h1>
        </Link>
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
