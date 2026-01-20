"use client";

import React, { useEffect, useState } from "react";

const questions = [
  // ---------------- Spring Core & Boot (10)
  {
    id: 1,
    question: "What is the main purpose of Spring Boot?",
    options: [
      "To replace the Spring Framework",
      "To simplify Spring application setup and configuration",
      "To act as a Java application server",
      "To compile Java applications faster",
    ],
    answer: 1,
  },
  {
    id: 2,
    question: "Which annotation is used to mark a Spring Boot application entry point?",
    options: [
      "@SpringBoot",
      "@EnableSpring",
      "@SpringBootApplication",
      "@BootApplication",
    ],
    answer: 2,
  },
  {
    id: 3,
    question: "What does @SpringBootApplication internally include?",
    options: [
      "@ComponentScan, @EnableAutoConfiguration, @Configuration",
      "@Service, @Repository, @Controller",
      "@Bean and @Autowired",
      "@EnableMVC only",
    ],
    answer: 0,
  },
  {
    id: 4,
    question: "What is Spring IoC responsible for?",
    options: [
      "Managing HTTP requests",
      "Creating and managing application objects (beans)",
      "Handling database transactions",
      "Running background jobs",
    ],
    answer: 1,
  },
  {
    id: 5,
    question: "Which annotation is used to inject a dependency?",
    options: ["@Inject", "@Autowired", "@Resource", "All of the above"],
    answer: 3,
  },
  {
    id: 6,
    question: "What is the default scope of a Spring bean?",
    options: ["Prototype", "Request", "Session", "Singleton"],
    answer: 3,
  },
  {
    id: 7,
    question: "What does Spring Boot Auto-Configuration do?",
    options: [
      "Automatically writes business logic",
      "Automatically configures beans based on classpath and properties",
      "Automatically creates controllers",
      "Automatically scales applications",
    ],
    answer: 1,
  },
  {
    id: 8,
    question: "Which file is commonly used for Spring Boot configuration?",
    options: [
      "config.xml",
      "application.properties / application.yml",
      "spring.json",
      "boot.config",
    ],
    answer: 1,
  },
  {
    id: 9,
    question: "How does Spring Boot decide which auto-configurations to apply?",
    options: [
      "Random selection",
      "Environment variables only",
      "Classpath dependencies and conditions",
      "Manual developer input",
    ],
    answer: 2,
  },
  {
    id: 10,
    question: "What happens if two beans of the same type exist and @Autowired is used?",
    options: [
      "Spring chooses one randomly",
      "Application fails unless @Qualifier is used",
      "Spring merges both beans",
      "Spring ignores both",
    ],
    answer: 1,
  },

  // ---------------- Spring MVC & REST (5)
  {
    id: 11,
    question: "Which annotation is used to create a REST controller?",
    options: ["@Controller", "@RestController", "@Service", "@Component"],
    answer: 1,
  },
  {
    id: 12,
    question: "What is the difference between @Controller and @RestController?",
    options: [
      "@RestController returns JSON/XML by default",
      "@Controller cannot handle HTTP requests",
      "@RestController is deprecated",
      "There is no difference",
    ],
    answer: 0,
  },
  {
    id: 13,
    question: "Which annotation maps HTTP GET requests?",
    options: ["@PostMapping", "@RequestMapping", "@GetMapping", "@FetchMapping"],
    answer: 2,
  },
  {
    id: 14,
    question: "How do you bind a URL path variable in Spring MVC?",
    options: ["@RequestParam", "@PathVariable", "@RequestBody", "@UrlParam"],
    answer: 1,
  },
  {
    id: 15,
    question: "What does @RequestBody do?",
    options: [
      "Reads HTTP headers",
      "Maps request body to a Java object",
      "Validates query parameters",
      "Handles file uploads only",
    ],
    answer: 1,
  },

  // ---------------- Spring Data JPA & DB (5)
  {
    id: 16,
    question: "Which annotation marks a JPA entity?",
    options: ["@Table", "@Document", "@Entity", "@Model"],
    answer: 2,
  },
  {
    id: 17,
    question: "What does JpaRepository provide?",
    options: [
      "Only custom queries",
      "CRUD operations out of the box",
      "Database migrations",
      "Connection pooling",
    ],
    answer: 1,
  },
  {
    id: 18,
    question: "What is the purpose of @Transactional?",
    options: [
      "Improves performance",
      "Ensures database operations execute atomically",
      "Creates database indexes",
      "Locks the JVM",
    ],
    answer: 1,
  },
  {
    id: 19,
    question: "Which fetch type loads related entities immediately?",
    options: ["LAZY", "EAGER", "ON_DEMAND", "MANUAL"],
    answer: 1,
  },
  {
    id: 20,
    question: "What problem does the N+1 query issue cause?",
    options: [
      "Slow startup time",
      "Multiple unnecessary database queries",
      "Memory leaks",
      "Thread starvation",
    ],
    answer: 1,
  },

  // ---------------- Security, Testing & Performance (5)
  {
    id: 21,
    question: "Which module is commonly used for authentication in Spring Boot?",
    options: [
      "Spring JDBC",
      "Spring Web",
      "Spring Security",
      "Spring Cloud",
    ],
    answer: 2,
  },
  {
    id: 22,
    question: "What does @PreAuthorize do?",
    options: [
      "Validates request body",
      "Checks authorization before method execution",
      "Encrypts passwords",
      "Logs security events",
    ],
    answer: 1,
  },
  {
    id: 23,
    question: "Which annotation is commonly used for unit testing Spring components?",
    options: ["@SpringBootTest", "@RunTest", "@MockBean", "@TestOnly"],
    answer: 0,
  },
  {
    id: 24,
    question: "What is the purpose of @MockBean in tests?",
    options: [
      "Mock external services",
      "Replace beans in Spring context with mocks",
      "Disable security",
      "Improve performance",
    ],
    answer: 1,
  },
  {
    id: 25,
    question: "Which approach improves Spring Boot application performance?",
    options: [
      "Using synchronous calls everywhere",
      "Reducing bean creation and lazy loading where appropriate",
      "Increasing heap size only",
      "Disabling garbage collection",
    ],
    answer: 1,
  },
];

export default function Quiz() {
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(12 * 60); // 12 minutes
  // const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
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

  const score = Object.entries(answers).reduce((acc, [qId, ans]) => {
    const q = questions.find((x) => x.id === Number(qId));
    return q && q.answer === ans ? acc + 1 : acc;
  }, 0);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">
        Spring Boot (Intermediate → Senior) Assessment
      </h1>

      {!submitted ? (
        <>
          <div className="mb-4 text-right font-semibold">
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
                    onChange={() =>
                      setAnswers((p) => ({ ...p, [q.id]: idx }))
                    }
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
            Percentage: <strong>{Number((score / questions.length) * 100).toFixed(2) }</strong>%
            <hr></hr>
            Interview Verdict: <strong>{Number((score / questions.length) * 100) >= 70 ? "PASSED" : "FAILED"  }</strong>
          </p>
        </div>
      )}
    </div>
  );
}
