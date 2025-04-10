import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

const QuizPage = () => {
  const { subjects, currentSubject, setScore } = useQuiz();
  const questions = subjects[currentSubject] || [];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const navigate = useNavigate();

  if (!currentSubject || questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen p-4">
        <p className="text-lg text-center">لا توجد أسئلة لهذه المادة! أضف أسئلة من الداشبورد.</p>
      </div>
    );
  }

  const handleAnswer = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      navigate("/result");
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-sm bg-white p-4 rounded-lg shadow-lg" dir="rtl">
        <div className="mb-2 text-sm text-gray-500 text-right">
          سؤال {currentQuestion + 1} من {questions.length}
        </div>
        <h2 className="text-xl font-bold mb-3 text-right">{currentQ.question}</h2>
        
        {currentQ.type === "choice" ? (
          <div className="space-y-2">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(option)}
                className={`w-full p-2 text-right rounded-lg border ${
                  selectedAnswer === option
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                dir="auto"
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            <button
              onClick={() => setSelectedAnswer("صح")}
              className={`w-full p-2 text-right rounded-lg border ${
                selectedAnswer === "صح"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              صح
            </button>
            <button
              onClick={() => setSelectedAnswer("خطأ")}
              className={`w-full p-2 text-right rounded-lg border ${
                selectedAnswer === "خطأ"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              خطأ
            </button>
          </div>
        )}
        
        <button
          onClick={handleAnswer}
          disabled={!selectedAnswer}
          className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
        >
          {currentQuestion + 1 < questions.length ? "التالي" : "إنهاء الاختبار"}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;