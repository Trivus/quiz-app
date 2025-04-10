import { Link } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

const ResultPage = () => {
  const { score, currentSubject, subjects } = useQuiz();
  const questions = subjects[currentSubject] || [];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg text-center" dir="rtl">
        <h2 className="text-2xl font-bold mb-4">النتيجة النهائية</h2>
        <p className="text-xl mb-4">
          لقد حصلت على {score} من أصل {questions.length}
        </p>
        <div className="w-full h-4 bg-gray-200 rounded-full mb-4">
          <div 
            className="h-full bg-green-500 rounded-full" 
            style={{ width: `${(score / questions.length) * 100}%` }}
          ></div>
        </div>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
};

export default ResultPage;