'use client';

import React, { useState, useRef } from 'react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Toast } from '@/app/components/ui/toast';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/app/components/ui/card';
import { SearchResult } from '@/lib/types';

export default function Search() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    if (!file) {
      setToast({ message: 'Please upload a file first', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        body: JSON.stringify({
          query,
          content: await file.text(),
          filename: file.name,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setResults(data.results || []);
        setToast({ message: 'Search completed successfully', type: 'success' });
      } else {
        throw new Error(data.error || 'An error occurred during search');
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'text/plain') {
        setToast({ message: 'Only .txt files are allowed', type: 'error' });
        return;
      }

      if (selectedFile.size > 20000) {
        setToast({
          message: 'File content must be under 20,000 characters',
          type: 'error',
        });
        return;
      }

      setFile(selectedFile);
      setFileName(selectedFile.name);
      setToast({ message: 'File uploaded successfully', type: 'success' });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Azure AI Search Demo</CardTitle>
            <CardDescription>
              Upload a .txt file (max 20,000 characters), then enter your search
              query
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".txt"
                  className="hidden"
                />
                <Button onClick={handleUploadClick} variant="outline">
                  Upload File
                </Button>
                {fileName && (
                  <span className="text-sm text-muted-foreground">
                    {fileName}
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Enter search query..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={!file}
                />
                <Button onClick={handleSearch} disabled={loading || !file}>
                  {loading ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardContent>
            <div className="mt-4 space-y-4">
              <p>{JSON.stringify(results)}</p>
              <br />

              {/*results &&
                results.map((result, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <pre className="whitespace-pre-wrap overflow-x-auto">
                        {JSON.stringify(result, null, 2)}
                      </pre>
                    </CardContent>
                  </Card>
                ))*/}
            </div>
          </CardContent>
        </Card>
      </main>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
