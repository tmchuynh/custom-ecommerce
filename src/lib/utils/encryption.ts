const IV_LENGTH = 16;

/**
 * Generates a random initialization vector (IV) for encryption.
 *
 * @returns A Uint8Array containing the random IV.
 */
export function generateIV() {
  return window.crypto.getRandomValues(new Uint8Array(IV_LENGTH));
}

/**
 * Generates a new encryption key using the AES-GCM algorithm.
 *
 * The generated key is 256 bits in length and can be used for both encryption
 * and decryption operations. The key is marked as extractable, allowing it to
 * be exported if needed.
 *
 * @returns {Promise<CryptoKey>} A promise that resolves to the generated CryptoKey.
 */
async function generateEncryptionKey(): Promise<CryptoKey> {
  return window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
}

/**
 * Encrypts a given passkey using the AES-GCM encryption algorithm and returns the result as a Base64-encoded string.
 *
 * The function generates a random initialization vector (IV) and a cryptographic key for encryption.
 * The IV and the encrypted data are combined into a single buffer, which is then Base64-encoded for storage or transmission.
 *
 * @param {string} passkey - The plaintext passkey to be encrypted.
 * @returns {Promise<string>} A promise that resolves to the Base64-encoded encrypted passkey.
 *
 * @throws {Error} Throws an error if encryption fails.
 */
export async function encryptKey(passkey: string): Promise<string> {
  const iv = generateIV();
  const encoder = new TextEncoder();
  const data = encoder.encode(passkey);
  const key = await generateEncryptionKey();

  /**
   * Encrypts the provided data using the AES-GCM algorithm.
   *
   * @param {AesGcmParams} { name: "AES-GCM", iv } - The encryption algorithm and initialization vector.
   * @param {CryptoKey} key - The cryptographic key used for encryption.
   * @param {BufferSource} data - The data to be encrypted.
   * @returns {Promise<ArrayBuffer>} A promise that resolves to the encrypted data as an ArrayBuffer.
   */
  const encryptedData = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );

  const encryptedBuffer = new Uint8Array(encryptedData);
  const ivBuffer = new Uint8Array(iv.buffer);

  const combined = new Uint8Array(ivBuffer.length + encryptedBuffer.length);
  combined.set(ivBuffer);
  combined.set(encryptedBuffer, ivBuffer.length);

  return btoa(String.fromCharCode(...combined));
}

/**
 * Decrypts an encrypted passkey using the AES-GCM algorithm.
 *
 * This function takes an encrypted passkey (as a base64-encoded string) and a cryptographic key,
 * then decrypts the passkey and returns the original string.
 * @param {string} encryptedPasskey - The base64-encoded encrypted passkey.
 * @returns {Promise<string>} A promise that resolves to the decrypted passkey as a string.
 * @throws {Error} Throws an error if decryption fails.
 */
export async function decryptKey(
  encryptedPasskey: string,
  secretKey: string
): Promise<string> {
  const key = await window.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secretKey),
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );

  const data = new Uint8Array(
    atob(encryptedPasskey)
      .split("")
      .map((char) => char.charCodeAt(0))
  );
  const iv = data.slice(0, IV_LENGTH);
  const encryptedData = data.slice(IV_LENGTH);

  const decoder = new TextDecoder();

  try {
    /**
     * Decrypts the provided encrypted data using the AES-GCM algorithm.
     *
     * @param {CryptoKey} key - The cryptographic key used for decryption.
     * @param {Uint8Array} iv - The initialization vector used for decryption.
     * @param {ArrayBuffer} encryptedData - The data to be decrypted.
     * @returns {Promise<ArrayBuffer>} A promise that resolves to the decrypted data.
     */
    const decryptedData = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      encryptedData
    );

    return decoder.decode(decryptedData);
  } catch (error) {
    throw new Error("Decryption failed");
  }
}
