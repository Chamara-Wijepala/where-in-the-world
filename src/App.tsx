import { Routes, Route } from "react-router-dom";
import Header from "components/header";
import Home from "pages/home";
import Details from "pages/details";

function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
