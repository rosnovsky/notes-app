import { Storage } from 'aws-amplify';

export default async function s3Upload(file) {
  const filename = `${Date.now()}-${file.name}`;
  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type
  });

  return stored.key;
}
