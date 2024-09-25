import { SearchClient, AzureKeyCredential } from '@azure/search-documents';
import { env } from '@/lib/env.mjs';

export function getSearchClient(indexName: string) {
  return new SearchClient(
    env.AZURE_SEARCH_SERVICE_ENDPOINT,
    indexName,
    new AzureKeyCredential(env.AZURE_SEARCH_ADMIN_KEY),
  );
}
