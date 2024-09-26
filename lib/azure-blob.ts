import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { env } from './env.mjs';

export const uploadFileToBlob = async (fileContent: string) => {
  const blobServiceUrl = `https://${env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`;
  const blobService = new BlobServiceClient(
    `${blobServiceUrl}?${env.AZURE_STORAGE_SAS_TOKEN}`,
  );

  const containerClient: ContainerClient = blobService.getContainerClient(
    env.AZURE_STORAGE_CONTAINER_NAME,
  );

  const newFileName = `search-${Date.now()}.txt`;
  const blobClient = containerClient.getBlockBlobClient(newFileName);
  const options = { blobHTTPHeaders: { blobContentType: 'text/plain' } };
  const buffer = Buffer.from(fileContent, 'utf-8');

  try {
    await blobClient.uploadData(buffer, options);
    console.log(`File "${newFileName}" uploaded successfully`);
    return newFileName;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};
