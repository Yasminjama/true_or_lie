"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function GamePage() {
  const { topic } = useParams();
  const router = useRouter();

// här defininerar jag states som hanterar spelets logik, statement och isTrue kommer från API:et. 
//feedback ges när spelaren svarar. 
  const [statement, setStatement] = useState("");
  const [isTrue, setIsTrue] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  
  async function fetchQuestion() {
    setLoading(true);
    setFeedback(null);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });

    const data = await res.json();
    setStatement(data.statement);
    setIsTrue(data.isTrue);
    setLoading(false);
  }
  
// useEffect används här för att hämta en ny fråga när komponenten laddas, och även när spelaren klickar på "Nästa fråga".
  useEffect(() => {
    fetchQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleAnswer(playerSaysTrue: boolean) {
    if (playerSaysTrue === isTrue) {
      setFeedback("✅ Rätt!");
    } else {
      setFeedback("❌ Fel!");
    }
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <p className="text-sm text-gray-400 uppercase tracking-widest mb-8">
        {topic}
      </p>
      <button
  onClick={() => router.push("/")}
  className="absolute top-6 left-6 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
>
  ← Tillbaka
</button>

      {loading ? (
        <p className="text-gray-400 text-lg animate-pulse">Laddar fråga...</p>
      ) : (
        <div className="flex flex-col items-center gap-6 max-w-md w-full">
          {/* Påståendet */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
            <p className="text-gray-800 text-xl font-medium">{statement}</p>
          </div>

          {/* Knappar */}
          {!feedback && (
            <div className="flex gap-4 w-full">
              <button
                onClick={() => handleAnswer(true)}
                className="flex-1 py-4 bg-white border border-gray-200 rounded-2xl text-gray-800 font-medium hover:bg-green-50 hover:border-green-300 transition-colors cursor-pointer"
              >
                ✅ Fakta
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className="flex-1 py-4 bg-white border border-gray-200 rounded-2xl text-gray-800 font-medium hover:bg-red-50 hover:border-red-300 transition-colors cursor-pointer"
              >
                ❌ Påhitt
              </button>
            </div>
          )}

          {/* Feedback */}
          {feedback && (
            <div className="flex flex-col items-center gap-4 w-full">
              <p className="text-2xl font-bold text-gray-800">{feedback}</p>
              <button
                onClick={fetchQuestion}
                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-medium hover:bg-gray-700 transition-colors cursor-pointer"
              >
                Nästa fråga →
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

