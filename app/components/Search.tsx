'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
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

interface SearchResult {
  content: string;
  score: number;
}

interface ToastState {
  message: string;
  type: 'success' | 'error';
}

export default function Search() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [toast, setToast] = useState<ToastState | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();

      if (response.ok) {
        setResults(data.searchResults);
        setToast({ message: 'Search completed successfully', type: 'success' });
      } else {
        throw new Error(data.error || 'An error occurred during search');
      }
    } catch (error) {
      console.error('Search error:', error);
      setToast({ message: 'An error occurred during search', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async () => {
    if (!file) {
      setToast({ message: 'Please select a file first', type: 'error' });
      return;
    }

    setUploading(true);
    try {
      const response = await fetch('/api/upload', {
        method: 'PUT',
        body: JSON.stringify({ content: await file.text() }),
      });

      if (response.ok) {
        setToast({ message: 'File uploaded successfully', type: 'success' });
      } else {
        throw new Error('File upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setToast({ message: 'File upload failed', type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Azure AI Search Demo</CardTitle>
            <CardDescription>
              Upload a .txt file (max 20,000 characters) or enter your search
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
                  Select File
                </Button>
                <Button
                  onClick={handleFileUpload}
                  disabled={!file || uploading}
                >
                  {uploading ? 'Uploading...' : 'Upload File'}
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
                />
                <Button onClick={handleSearch} disabled={loading}>
                  {loading ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardContent>
            <div className="mt-4 space-y-4">
              <pre>{JSON.stringify(results, null, 2)}</pre>
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
