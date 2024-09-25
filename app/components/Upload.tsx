'use client';
import { useState } from 'react';

export default function Upload() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    setResults(data.results);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Azure AI Search Demo</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 mr-2"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2">
        Search
      </button>
      <div className="mt-4">
        {results.map((result, index) => (
          <div key={index} className="mb-2">
            {/* Display your search results here */}
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
