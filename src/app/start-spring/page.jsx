"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ClearPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear quiz-related localStorage
    localStorage.removeItem("quiz-answers");
    localStorage.removeItem("quiz-time-left");

    // Redirect back to quiz after clearing
    const timer = setTimeout(() => {
      router.push("/spring-boot"); // assuming Quiz is on home page
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg text-center">
        <h1 className="text-xl font-bold mb-2">Starting SpringBoot Quiz…</h1>
        <p className="text-gray-600">You’ll be redirected shortly.</p>
      </div>
    </div>
  );
}
