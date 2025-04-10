import { Link } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

const HomePage = () => {
  const { setCurrentSubject, subjects } = useQuiz();
  const subjectList = Object.keys(subjects);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">مرحبًا بك في Quiz الاحترافي!</h1>
      <div className="w-full max-w-sm space-y-4 text-center">
        <h2 className="text-xl">اختر مادة:</h2>
        {subjectList.length === 0 ? (
          <p className="bg-white/20 p-3 rounded-lg">لا توجد مواد بعد، أضف مواد من الداشبورد</p>
        ) : (
          <div className="space-y-2">
            {subjectList.map((subject) => (
              <Link
                key={subject}
                to="/quiz"
                onClick={() => setCurrentSubject(subject)}
                className="block px-4 py-2 bg-white text-blue-600 rounded-lg shadow hover:bg-gray-200 transition"
              >
                {subject}
              </Link>
            ))}
          </div>
        )}
        <Link
          to="/dashboard"
          className="inline-block px-6 py-2 bg-white text-purple-600 rounded-lg shadow hover:bg-gray-200 transition"
        >
          إنشاء Quiz
        </Link>
      </div>
    </div>
  );
};

export default HomePage;