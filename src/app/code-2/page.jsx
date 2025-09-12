"use client";

import React, { useEffect, useState } from "react";

const questions = [
  // ---------------- Node.js (10)
  {
    id: 1,
    question: "Which of the following best describes Node.js?",
    options: [
      "A frontend framework for building UIs",
      "A JavaScript runtime built on Chrome’s V8 engine",
      "A relational database",
      "A CSS preprocessor",
    ],
    answer: 1,
  },
  {
    id: 2,
    question: "Which of these is the default scope of a Node.js module?",
    options: ["Global", "Local to the module", "Block scope", "Function scope"],
    answer: 1,
  },
  {
    id: 3,
    question: "What does `process.nextTick()` do in Node.js?",
    options: [
      "Executes a callback immediately after the current operation completes, before I/O events",
      "Schedules a callback after all pending I/O events",
      "Blocks the event loop",
      "Pauses the process for one tick",
    ],
    answer: 0,
  },
  {
    id: 4,
    question: "Which built-in module is used to create a web server in Node.js?",
    options: ["http", "fs", "os", "url"],
    answer: 0,
  },
  {
    id: 5,
    question: "In Express.js, what does `app.use(express.json())` do?",
    options: [
      "Parses incoming requests with JSON payloads",
      "Parses cookies",
      "Parses multipart form data",
      "Adds CORS headers",
    ],
    answer: 0,
  },
  {
    id: 6,
    question: "What is the correct way to handle errors in asynchronous Node.js code?",
    options: [
      "Using try/catch around async/await",
      "Ignoring them",
      "Wrapping sync code in a setTimeout",
      "Calling process.exit()",
    ],
    answer: 0,
  },
  {
    id: 7,
    question: "Which of these database drivers is commonly used in Node.js for MongoDB?",
    options: ["pg", "mongoose", "mysql2", "sequelize"],
    answer: 1,
  },
  {
    id: 8,
    question: "Which statement about the Node.js event loop is true?",
    options: [
      "It handles only synchronous code",
      "It allows non-blocking I/O by queuing callbacks",
      "It runs each request in a new thread",
      "It requires manual invocation per event",
    ],
    answer: 1,
  },
  {
    id: 9,
    question: "What does `cluster` module in Node.js provide?",
    options: [
      "Ability to create multiple threads",
      "Ability to fork multiple processes to utilize multiple CPU cores",
      "Ability to run WebWorkers",
      "Ability to monitor memory usage",
    ],
    answer: 1,
  },
  {
    id: 10,
    question: "Which of these tools is typically used for testing in Node.js?",
    options: ["Jest", "Mocha", "Chai", "All of the above"],
    answer: 3,
  },

  // ---------------- Code Challenge (3)
  {
    id: 11,
    question: "What will this Node.js snippet print?\n\nconsole.log([1, 2, 3].map(async x => x * 2));",
    options: [
      "Promise {2}, Promise {4}, Promise {6}",
      "[2, 4, 6]",
      "[undefined, undefined, undefined]",
      "Throws an error",
    ],
    answer: 0,
  },
  {
    id: 12,
    question: "Which code properly reads a file asynchronously in Node.js?",
    options: [
      "const data = fs.readFileSync('file.txt');",
      "fs.readFile('file.txt', 'utf8', (err, data) => { console.log(data); });",
      "const data = await fs.read('file.txt');",
      "fs.openFile('file.txt', cb);",
    ],
    answer: 1,
  },
  {
    id: 13,
    question: "Which of these snippets correctly handles a rejected Promise?",
    options: [
      "myPromise.then(data => console.log(data)).catch(err => console.error(err));",
      "try { myPromise.then(...); } catch(err) { console.error(err); }",
      "myPromise.reject(err => console.error(err));",
      "await myPromise.reject()",
    ],
    answer: 0,
  },

  // ---------------- DSA (3)
  {
    id: 14,
    question: "What is the time complexity of inserting at the end of a JavaScript array (amortized)?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    answer: 0,
  },
  {
    id: 15,
    question: "Which data structure is most suitable for implementing a queue in Node.js?",
    options: ["Array (push/shift)", "Linked List", "Stack", "Set"],
    answer: 1,
  },
  {
    id: 16,
    question: "What will be the output of this snippet?\n\nfunction fib(n){ if(n<=1) return n; return fib(n-1)+fib(n-2); }\nconsole.log(fib(5));",
    options: ["3", "5", "8", "10"],
    answer: 1,
  },
];

export default function Quiz() {
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes
  const [submitted, setSubmitted] = useState(false);

  // Load saved answers from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("quiz-answers");
    if (saved) setAnswers(JSON.parse(saved));

    const savedTime = localStorage.getItem("quiz-time-left");
    if (savedTime) setTimeLeft(parseInt(savedTime, 10));
  }, []);

  // Save answers & time
  useEffect(() => {
    localStorage.setItem("quiz-answers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem("quiz-time-left", timeLeft.toString());
  }, [timeLeft]);

  // Countdown
  useEffect(() => {
    if (submitted) return;

    if (timeLeft <= 0) {
      setSubmitted(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const handleSelect = (qId, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [qId]: optionIndex }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const score = Object.entries(answers).reduce((acc, [qId, ans]) => {
    const question = questions.find((q) => q.id === Number(qId));
    if (question && question.answer === ans) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Node.js + Coding Challenge + DSA Quiz</h1>
      {!submitted ? (
        <>
          <div className="mb-4 text-right text-lg font-semibold">
            Time Left: <span className="text-red-500">{formatTime(timeLeft)}</span>
          </div>
          {questions.map((q) => (
            <div key={q.id} className="mb-6">
              <p className="font-semibold mb-2 whitespace-pre-line">
                {q.id}. {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, idx) => (
                  <label
                    key={idx}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      checked={answers[q.id] === idx}
                      onChange={() => handleSelect(q.id, idx)}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Quiz Completed 🎉</h2>
          <p className="text-lg">
            You scored <span className="font-semibold">{score}</span> out of{" "}
            {questions.length}
          </p>
        </div>
      )}
    </div>
  );
}
