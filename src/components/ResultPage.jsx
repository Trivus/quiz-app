import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../context/QuizContext";
import { db } from "../firebase";
import { ref, push } from "firebase/database";

const ResultPage = () => {
  const { score, totalQuestions, userId } = useContext(QuizContext);
  const navigate = useNavigate();

  useEffect(() => {
    // حفظ النتيجة في Firebase
    if (userId) {
      const resultsRef = ref(db, "results/");
      push(resultsRef, {
        userId: userId,
        score: score,
        total: totalQuestions,
        timestamp: Date.now()
      });
    }
  }, [userId, score, totalQuestions]);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">نتيجتك</h1>
      <p className="mb-4">النتيجة: {score} من {totalQuestions}</p>
      <button
        onClick={handleBack}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        العودة للرئيسية
      </button>
    </div>
  );
};

export default ResultPage;
