import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import QuizPage from "./components/QuizPage";
import ResultPage from "./components/ResultPage";
import { Dashboard, LoginPage } from "./components/Dashboard";
import { QuizProvider } from "./context/QuizContext";

function App() {
  return (
    <QuizProvider>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/login" element={<LoginPage />} />
        </Routes>
      </div>
    </QuizProvider>
  );
}

export default App;