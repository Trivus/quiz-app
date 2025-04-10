import { createContext, useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [subjects, setSubjects] = useState({});
  const [score, setScore] = useState(0);
  const [currentSubject, setCurrentSubject] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("quizAuthenticated") === "true"
  );

  const PASSWORD = "admin123"; // كلمة المرور الافتراضية

  // جلب البيانات من Firestore عند تحميل التطبيق
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "subjects"));
        const subjectsData = {};
        querySnapshot.forEach((doc) => {
          subjectsData[doc.id] = doc.data().questions || [];
        });
        setSubjects(subjectsData);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, []);

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

  const addQuestion = async (subject, newQuestion) => {
    try {
      const updatedSubjects = { ...subjects };
      if (!updatedSubjects[subject]) updatedSubjects[subject] = [];
      updatedSubjects[subject].push(newQuestion);
      setSubjects(updatedSubjects);

      // حفظ في Firestore
      const subjectDocRef = doc(db, "subjects", subject);
      await setDoc(subjectDocRef, { questions: updatedSubjects[subject] });
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const updateQuestion = async (subject, questionIndex, updatedQuestion) => {
    try {
      const updatedSubjects = { ...subjects };
      updatedSubjects[subject][questionIndex] = updatedQuestion;
      setSubjects(updatedSubjects);

      // تحديث في Firestore
      const subjectDocRef = doc(db, "subjects", subject);
      await updateDoc(subjectDocRef, { questions: updatedSubjects[subject] });
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const deleteQuestion = async (subject, questionIndex) => {
    try {
      const updatedSubjects = { ...subjects };
      updatedSubjects[subject] = updatedSubjects[subject].filter(
        (_, index) => index !== questionIndex
      );
      setSubjects(updatedSubjects);

      // تحديث أو حذف من Firestore
      const subjectDocRef = doc(db, "subjects", subject);
      if (updatedSubjects[subject].length === 0) {
        await deleteDoc(subjectDocRef);
      } else {
        await updateDoc(subjectDocRef, { questions: updatedSubjects[subject] });
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
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