import { NextRequest, NextResponse } from 'next/server';
import {
  SearchClient,
  AzureKeyCredential,
  SearchResult,
} from '@azure/search-documents';
import { env } from '@/lib/env.mjs';
import { z } from 'zod';

const BodySchema = z.object({
  query: z.string(),
  content: z.string(),
  filename: z.string(),
});

export async function POST(request: NextRequest) {
  const { query, filename, content } = BodySchema.parse(await request.json());

  if (!query || !filename || !content) {
    return NextResponse.json(
      { error: 'Query, filename and content are required' },
      { status: 400 },
    );
  }

  if (content.length > 20000) {
    return NextResponse.json(
      { error: 'File content must be under 20,000 characters' },
      { status: 400 },
    );
  }

  console.log('Creating Azure Search client');
  const searchClient = new SearchClient(
    env.AZURE_SEARCH_SERVICE_ENDPOINT,
    env.AZURE_SEARCH_INDEX_NAME,
    new AzureKeyCredential(env.AZURE_SEARCH_ADMIN_KEY),
  );

  try {
    const document = {
      id: `${new Date().getTime()}`,
      content,
      filename,
    };

    console.log('Uploading document to Azure Search');
    await searchClient.uploadDocuments([document]);

    // Perform the search
    //console.log('Searching Azure Search');
    //const searchResults = await searchClient.search(query);
    //return NextResponse.json({ results: searchResults.results });

    return NextResponse.json({ results: ['Success!'] });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing and searching' },
      { status: 500 },
    );
  }
}

export async function GET() {}
