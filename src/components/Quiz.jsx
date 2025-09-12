"use client";

import React, { useEffect, useState } from "react";

const questions = [
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
];

export default function Quiz() {
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 15 minutes
  // const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes
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
      <h1 className="text-2xl font-bold mb-4">Node.js Intermediate Quiz</h1>
      {!submitted ? (
        <>
          <div className="mb-4 text-right text-lg font-semibold">
            Time Left: <span className="text-red-500">{formatTime(timeLeft)}</span>
          </div>
          {questions.map((q) => (
            <div key={q.id} className="mb-6">
              <p className="font-semibold mb-2">
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
