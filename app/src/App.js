import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import { FontSizeProvider } from "./contexts/FontSizeContext";
import Skeleton from "./pages/skeleton/Skeleton";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import SettingsPage from './pages/settings/SettingsPage';
import QuizPage from "./pages/quiz/QuizPage";
import QuestsPage from './pages/quests/QuestsPage';
import RegistrationPage from './pages/registration/RegistrationPage';

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
    <FontSizeProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<SettingsPage />} /> 
        <Route path="/quiz" element={<QuizPage />} /> 
        <Route path="/quests" element={<QuestsPage />} />
		<Route path="/register" element={<RegistrationPage />} />
      </Routes>
	</FontSizeProvider>
  );
}
export default App;