import { createContext, useState, useContext } from "react";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [subjects, setSubjects] = useState(
    JSON.parse(localStorage.getItem("quizSubjects")) || {}
  );
  const [score, setScore] = useState(0);
  const [currentSubject, setCurrentSubject] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("quizAuthenticated") === "true"
  );

  const PASSWORD = "admin123"; // كلمة المرور الافتراضية

  const login = (password) => {
    if (password === PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("quizAuthenticated", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("quizAuthenticated");
  };

  const addQuestion = (subject, newQuestion) => {
    const updatedSubjects = {
      ...subjects,
      [subject]: subjects[subject] ? [...subjects[subject], newQuestion] : [newQuestion],
    };
    setSubjects(updatedSubjects);
    localStorage.setItem("quizSubjects", JSON.stringify(updatedSubjects));
  };

  const updateQuestion = (subject, questionIndex, updatedQuestion) => {
    const updatedSubjects = { ...subjects };
    updatedSubjects[subject][questionIndex] = updatedQuestion;
    setSubjects(updatedSubjects);
    localStorage.setItem("quizSubjects", JSON.stringify(updatedSubjects));
  };

  const deleteQuestion = (subject, questionIndex) => {
    const updatedSubjects = { ...subjects };
    updatedSubjects[subject] = updatedSubjects[subject].filter(
      (_, index) => index !== questionIndex
    );
    setSubjects(updatedSubjects);
    localStorage.setItem("quizSubjects", JSON.stringify(updatedSubjects));
  };

  return (
    <QuizContext.Provider
      value={{
        subjects,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        score,
        setScore,
        currentSubject,
        setCurrentSubject,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);