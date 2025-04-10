import { useState, useEffect } from "react";
import { useQuiz } from "../context/QuizContext";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const {
    subjects,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    isAuthenticated,
    login,
    logout,
  } = useQuiz();
  const [password, setPassword] = useState("");
  const [subject, setSubject] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [questionType, setQuestionType] = useState("choice");
  const [editingQuestion, setEditingQuestion] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/dashboard/login");
    }
  }, [isAuthenticated, navigate]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const resetForm = () => {
    setSubject("");
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
    setQuestionType("choice");
    setEditingQuestion(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!subject || !question) {
      alert("يرجى ملء جميع الحقول المطلوبة!");
      return;
    }

    if (questionType === "choice" && (options.some((opt) => !opt) || !correctAnswer)) {
      alert("يرجى ملء جميع خيارات السؤال الاختياري!");
      return;
    }

    if (questionType === "truefalse" && !correctAnswer) {
      alert("يرجى اختيار الإجابة الصحيحة لسؤال الصح والخطأ!");
      return;
    }

    const newQuestion = {
      question,
      type: questionType,
      correctAnswer,
      ...(questionType === "choice" && { options }),
    };

    if (editingQuestion) {
      updateQuestion(editingQuestion.subject, editingQuestion.index, newQuestion);
    } else {
      addQuestion(subject, newQuestion);
    }
    
    resetForm();
  };

  const handleEdit = (subjectName, questionIndex) => {
    const questionToEdit = subjects[subjectName][questionIndex];
    setSubject(subjectName);
    setQuestion(questionToEdit.question);
    setQuestionType(questionToEdit.type);
    setCorrectAnswer(questionToEdit.correctAnswer);
    if (questionToEdit.type === "choice") {
      setOptions(questionToEdit.options);
    } else {
      setOptions(["", "", "", ""]);
    }
    setEditingQuestion({ subject: subjectName, index: questionIndex });
  };

  const handleDelete = (subjectName, questionIndex) => {
    if (window.confirm("هل أنت متأكد من حذف هذا السؤال؟")) {
      deleteQuestion(subjectName, questionIndex);
    }
  };

  if (!isAuthenticated) {
    return null; // سيتم توجيه المستخدم إلى صفحة تسجيل الدخول
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-center">إنشاء وتعديل Quiz</h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            تسجيل الخروج
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3" dir="rtl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="اسم المادة"
                className="w-full p-2 border rounded-lg text-right"
                required
              />
            </div>
            <div>
              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                className="w-full p-2 border rounded-lg text-right"
              >
                <option value="choice">سؤال اختياري</option>
                <option value="truefalse">سؤال صح/خطأ</option>
              </select>
            </div>
          </div>

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="أدخل السؤال"
            className="w-full p-2 border rounded-lg text-right min-h-[100px]"
            dir="auto"
            required
          />
          
          {questionType === "choice" ? (
            <>
              {options.map((opt, index) => (
                <input
                  key={index}
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`خيار ${index + 1}`}
                  className="w-full p-2 border rounded-lg text-right"
                  dir="auto"
                  required
                />
              ))}
              <select
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                className="w-full p-2 border rounded-lg text-right"
                required
              >
                <option value="">اختر الإجابة الصحيحة</option>
                {options.map((opt, index) => (
                  <option key={index} value={opt}>
                    {opt || `خيار ${index + 1}`}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <div className="space-y-2 text-right">
              <label className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="radio"
                  name="truefalse"
                  value="صح"
                  checked={correctAnswer === "صح"}
                  onChange={() => setCorrectAnswer("صح")}
                  className="h-4 w-4"
                  required
                />
                <span>صح</span>
              </label>
              <label className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="radio"
                  name="truefalse"
                  value="خطأ"
                  checked={correctAnswer === "خطأ"}
                  onChange={() => setCorrectAnswer("خطأ")}
                  className="h-4 w-4"
                />
                <span>خطأ</span>
              </label>
            </div>
          )}

          <div className="flex space-x-2 space-x-reverse">
            <button
              type="submit"
              className="flex-1 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              {editingQuestion ? "تحديث السؤال" : "حفظ السؤال"}
            </button>
            {editingQuestion && (
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                إلغاء التعديل
              </button>
            )}
          </div>
        </form>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2 text-right">المواد والأسئلة المضافة</h2>
          {Object.keys(subjects).length === 0 ? (
            <p className="text-center">لا توجد مواد بعد</p>
          ) : (
            Object.entries(subjects).map(([subj, questions]) => (
              <div key={subj} className="mb-6 p-4 border rounded-lg bg-gray-50">
                <h3 className="font-bold text-lg text-right mb-2">{subj}</h3>
                <ul className="space-y-2">
                  {questions.map((q, index) => (
                    <li key={index} className="p-3 bg-white rounded-lg shadow-sm">
                      <div className="flex justify-between items-start">
                        <div className="text-right flex-1">
                          <p className="font-medium">{q.question}</p>
                          <p className="text-sm text-gray-600">
                            الإجابة الصحيحة: <strong>{q.correctAnswer}</strong> ({q.type})
                          </p>
                          {q.type === "choice" && (
                            <div className="mt-1">
                              <p className="text-xs font-semibold">الخيارات:</p>
                              <ul className="text-xs text-gray-500">
                                {q.options.map((opt, i) => (
                                  <li key={i} className="mr-2 inline-block">
                                    {opt}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-2 space-x-reverse">
                          <button
                            onClick={() => handleEdit(subj, index)}
                            className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                          >
                            تعديل
                          </button>
                          <button
                            onClick={() => handleDelete(subj, index)}
                            className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                          >
                            حذف
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>

        <Link
          to="/"
          className="mt-4 block text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          العودة
        </Link>
      </div>
    </div>
  );
};

const LoginPage = () => {
  const { login } = useQuiz();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(password)) {
      navigate("/dashboard");
    } else {
      setError("كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">تسجيل الدخول إلى لوحة التحكم</h1>
        <form onSubmit={handleLogin} className="space-y-4" dir="rtl">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div>
            <label className="block mb-1">كلمة المرور:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            دخول
          </button>
        </form>
      </div>
    </div>
  );
};

export { Dashboard, LoginPage };