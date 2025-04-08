"use client";

import { useState } from "react";
import NavigationBar from "@/components/NavigationBar";

export default function JournalPage() {
  const [entries, setEntries] = useState<string[]>([]);
  const [newEntry, setNewEntry] = useState("");

  const handleAddEntry = () => {
    if (newEntry.trim()) {
      setEntries((prev) => [newEntry, ...prev]);
      setNewEntry("");
    }
  };

  return (
    <>
      <NavigationBar />
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Journal</h1>

        <div className="mb-6">
          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="Write your thoughts here..."
            className="w-full min-h-[100px] p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none shadow-sm"
          />
          <button
            onClick={handleAddEntry}
            className="mt-3 px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
          >
            Add Entry
          </button>
        </div>

        <ul className="space-y-4">
          {entries.map((entry, index) => (
            <li
              key={index}
              className="border border-gray-300 dark:border-gray-700 p-4 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100"
            >
              {entry}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
