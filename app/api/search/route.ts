import { NextResponse } from 'next/server';
import { getSearchClient } from '@/lib/azure-search';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 },
    );
  }

  const searchClient = getSearchClient('your-index-name');

  try {
    const searchResults = await searchClient.search(query);
    return NextResponse.json({ results: searchResults.results });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'An error occurred while searching' },
      { status: 500 },
    );
  }
}
