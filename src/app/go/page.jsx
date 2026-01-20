"use client";

import React, { useEffect, useState } from "react";

const questions = [
  // ---------------- Go Fundamentals (8)
  {
    id: 1,
    question: "What is Go primarily designed for?",
    options: [
      "Mobile app development",
      "Systems and backend programming",
      "Game development",
      "Frontend web development",
    ],
    answer: 1,
  },
  {
    id: 2,
    question: "Which keyword is used to declare a variable in Go?",
    options: ["let", "var", "define", "const"],
    answer: 1,
  },
  {
    id: 3,
    question: "What is the zero value of an int in Go?",
    options: ["nil", "undefined", "0", "-1"],
    answer: 2,
  },
  {
    id: 4,
    question: "Which of the following is true about Go?",
    options: [
      "It supports classical inheritance",
      "It uses interfaces instead of inheritance",
      "It requires a virtual machine",
      "It is dynamically typed",
    ],
    answer: 1,
  },
  {
    id: 5,
    question: "What does the blank identifier (_) do in Go?",
    options: [
      "Ignores returned values",
      "Creates a global variable",
      "Declares constants",
      "Optimizes memory",
    ],
    answer: 0,
  },
  {
    id: 6,
    question: "What happens when you read from a nil map?",
    options: [
      "Panic occurs",
      "Returns zero value",
      "Compilation error",
      "Deadlock",
    ],
    answer: 1,
  },
  {
    id: 7,
    question: "Which file naming convention is required for Go tests?",
    options: ["*_test.go", "test_*.go", "*.spec.go", "*.go.test"],
    answer: 0,
  },
  {
    id: 8,
    question: "What is the entry point of a Go program?",
    options: ["main()", "init()", "start()", "run()"],
    answer: 0,
  },

  // ---------------- Concurrency (7)
  {
    id: 9,
    question: "What is a goroutine?",
    options: [
      "An OS thread",
      "A lightweight managed thread",
      "A process",
      "A callback function",
    ],
    answer: 1,
  },
  {
    id: 10,
    question: "Which keyword starts a goroutine?",
    options: ["async", "thread", "go", "spawn"],
    answer: 2,
  },
  {
    id: 11,
    question: "What happens when sending on an unbuffered channel?",
    options: [
      "Send is non-blocking",
      "Send blocks until receiver is ready",
      "Message is dropped",
      "Panic occurs",
    ],
    answer: 1,
  },
  {
    id: 12,
    question: "What does closing a channel do?",
    options: [
      "Deletes the channel",
      "Stops goroutines automatically",
      "Signals no more values will be sent",
      "Clears buffered values",
    ],
    answer: 2,
  },
  {
    id: 13,
    question: "Which package helps manage goroutine lifecycles?",
    options: ["sync", "context", "runtime", "time"],
    answer: 1,
  },
  {
    id: 14,
    question: "What issue does a data race cause?",
    options: [
      "Compile-time errors",
      "Undefined or unpredictable behavior",
      "Deadlocks only",
      "Memory leaks only",
    ],
    answer: 1,
  },
  {
    id: 15,
    question: "Which tool detects race conditions?",
    options: ["go fmt", "go test -race", "pprof", "go vet"],
    answer: 1,
  },

  // ---------------- Interfaces, Errors, Memory (5)
  {
    id: 16,
    question: "What makes Go interfaces unique?",
    options: [
      "They must be explicitly implemented",
      "They are implemented implicitly",
      "They require inheritance",
      "They support generics only",
    ],
    answer: 1,
  },
  {
    id: 17,
    question: "What is the idiomatic way to handle errors in Go?",
    options: ["Exceptions", "Try/Catch", "Returning error values", "Panics"],
    answer: 2,
  },
  {
    id: 18,
    question: "When should panic be used?",
    options: [
      "For all errors",
      "For expected runtime errors",
      "For unrecoverable programmer errors",
      "For validation failures",
    ],
    answer: 2,
  },
  {
    id: 19,
    question: "What does defer do?",
    options: [
      "Executes code immediately",
      "Schedules a function to run after return",
      "Creates a goroutine",
      "Pauses execution",
    ],
    answer: 1,
  },
  {
    id: 20,
    question: "What happens if you defer inside a loop?",
    options: [
      "Executes immediately",
      "Executes at each iteration",
      "Executes when the function returns",
      "Causes panic",
    ],
    answer: 2,
  },

  // ---------------- HTTP, Testing, Performance (5)
  {
    id: 21,
    question: "Which package is used to build HTTP servers?",
    options: ["http", "net/http", "server", "web"],
    answer: 1,
  },
  {
    id: 22,
    question: "What does http.Handler represent?",
    options: [
      "A goroutine",
      "A middleware",
      "An interface for handling HTTP requests",
      "A router",
    ],
    answer: 2,
  },
  {
    id: 23,
    question: "Which package is used for benchmarking?",
    options: ["testing", "bench", "profile", "runtime"],
    answer: 0,
  },
  {
    id: 24,
    question: "What does pprof help with?",
    options: [
      "Formatting code",
      "Dependency management",
      "Profiling CPU and memory usage",
      "Testing APIs",
    ],
    answer: 2,
  },
  {
    id: 25,
    question: "Which practice improves Go service performance?",
    options: [
      "Spawning goroutines everywhere",
      "Avoiding allocations and reusing objects",
      "Using reflection heavily",
      "Ignoring context cancellation",
    ],
    answer: 1,
  },
];

export default function Quiz() {
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(12 * 60); // 12 minutes
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("quiz-answers");
    if (saved) setAnswers(JSON.parse(saved));

    const savedTime = localStorage.getItem("quiz-time-left");
    if (savedTime) setTimeLeft(parseInt(savedTime, 10));
  }, []);

  useEffect(() => {
    localStorage.setItem("quiz-answers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem("quiz-time-left", timeLeft.toString());
  }, [timeLeft]);

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

  const score = Object.entries(answers).reduce((acc, [id, ans]) => {
    const q = questions.find((x) => x.id === Number(id));
    return q && q.answer === ans ? acc + 1 : acc;
  }, 0);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">
        Go Backend Engineer Assessment
      </h1>

      {!submitted ? (
        <>
          <div className="text-right font-semibold mb-4">
            Time Left: {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </div>

          {questions.map((q) => (
            <div key={q.id} className="mb-6">
              <p className="font-semibold mb-2">
                {q.id}. {q.question}
              </p>
              {q.options.map((opt, idx) => (
                <label key={idx} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    checked={answers[q.id] === idx}
                    onChange={() => setAnswers((p) => ({ ...p, [q.id]: idx }))}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          ))}

          <button
            onClick={() => setSubmitted(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Submit
          </button>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Assessment Completed</h2>
          <p>
            Score: <strong>{score}</strong> / {questions.length}
            <hr></hr>
            Percentage:{" "}
            <strong>
              {Number((score / questions.length) * 100).toFixed(2)}
            </strong>
            %<hr></hr>
            Interview Verdict:{" "}
            <strong>
              {Number((score / questions.length) * 100) >= 70
                ? "PASSED"
                : "FAILED"}
            </strong>
          </p>
        </div>
      )}
    </div>
  );
}
