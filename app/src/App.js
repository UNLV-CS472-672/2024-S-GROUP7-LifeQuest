import { useEffect } from "react";
import { useState } from 'react';
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Skeleton from "./pages/Skeleton";
import Login from "./pages/Login";
import Home from "./pages/home/Home";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
export default App;
