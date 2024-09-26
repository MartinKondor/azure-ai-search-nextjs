import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { AzureKeyCredential, SearchClient } from '@azure/search-documents';
import { env } from '@/lib/env.mjs';

const SearchSchema = z.object({
  query: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const { query } = SearchSchema.parse(await request.json());

    const searchClient = new SearchClient(
      env.AZURE_SEARCH_SERVICE_ENDPOINT,
      env.AZURE_SEARCH_INDEX_NAME,
      new AzureKeyCredential(env.AZURE_SEARCH_ADMIN_KEY),
    );

    console.log('Searching for query');
    const searchResults = await searchClient.search(query, {
      includeTotalCount: true,
      searchFields: ['content'],
      select: ['content'],
      searchMode: 'all',
    });

    return NextResponse.json({ searchResults });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'An error occurred while searching' },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({});
}
