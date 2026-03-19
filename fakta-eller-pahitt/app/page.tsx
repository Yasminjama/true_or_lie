"use client"; //Använder detta för att det behövs i next.js  när en komponent ska använda onClick och useRouter,
//  annars tror next att det är en serverkomponent och då funkar inte onClick och useRouter.
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const topics = [
    { id: "animals", label: "Djur", emoji: "🐘" },
    { id: "space", label: "Rymden", emoji: "🚀" },
    { id: "history", label: "Historia", emoji: "📜" },
    { id: "food", label: "Mat", emoji: "🍕" },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Fakta eller Påhitt?</h1>
      <p className="text-gray-500 mb-10">Välj ett ämne för att börja spela</p>

      <div className="grid grid-cols-2 gap-4">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => router.push(`/game/${topic.id}`)}
            className="flex flex-col items-center justify-center gap-2 w-40 h-40 bg-white border border-gray-200 rounded-2xl text-gray-800 text-lg font-medium hover:bg-gray-100 hover:border-gray-300 transition-colors cursor-pointer"
          >
            <span className="text-4xl">{topic.emoji}</span>
            <span>{topic.label}</span>
          </button>
        ))}
      </div>
    </main>
  );
}