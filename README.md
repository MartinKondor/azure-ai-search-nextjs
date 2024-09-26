# Azure AI Search with Next.js

This project demonstrates how to integrate Azure AI Search with a Next.js application, allowing users to upload text files and perform searches on their content.

## Prerequisites

- Node.js (v18 or later)
- npm or yarn
- An Azure account with active subscription
- Azure AI Search service
- Azure Blob Storage account

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/MartinKondor/azure-ai-search-nextjs.git
cd azure-ai-search-nextjs
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up Azure services

#### Azure Blob Storage

1. Create a new Azure Storage account or use an existing one.
2. Create a new container in the Blob storage.
3. Generate a SAS token for the container with read and write permissions.

#### Azure AI Search

1. Create a new Azure AI Search service or use an existing one.
2. Create a new index with a schema that includes a 'content' field.
3. Set up an indexer:
   - Create a data source that points to your Azure Blob Storage container.
   - Create an indexer that uses this data source and maps the content to fields in your search index.
   - Run the indexer to populate your search index with the content from your Blob Storage.

### 4. Configure environment variables

Create a `.env.local` file in the root directory and add the following variables:

```
AZURE_STORAGE_SAS_TOKEN=your_sas_token
AZURE_STORAGE_ACCOUNT_NAME=your_storage_account_name
AZURE_STORAGE_CONTAINER_NAME=your_container_name

AZURE_SEARCH_SERVICE_ENDPOINT=https://your-search-service.search.windows.net
AZURE_SEARCH_ADMIN_KEY=your_search_admin_key
AZURE_SEARCH_INDEX_NAME=your_index_name
```

Replace the placeholder values with your actual Azure service details.

## Running the application

To start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Use the "Select File" button to choose a .txt file (max 20,000 characters).
2. Click "Upload File" to upload the selected file to Azure Blob Storage.
3. Enter a search query in the input field.
4. Click "Search" to perform a search on the uploaded content.

## Project Structure

- `/app`: Contains the Next.js application pages and components.
- `/lib`: Contains utility functions for Azure services.
- `/api`: Contains API routes for file upload and search functionality.

## Troubleshooting

- If searches return no results, ensure that:
  1. Files are being successfully uploaded to Azure Blob Storage.
  2. The indexer is correctly configured and running.
  3. The index schema matches the fields you're searching.
- Check Azure AI Search logs for any indexing or search errors.
- Verify that all environment variables are correctly set.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

Copyright 2024 &copy; [Martin Kondor](https://martinkondor.github.io/).
