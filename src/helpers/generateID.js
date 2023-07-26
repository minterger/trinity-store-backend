import crypto from "crypto";

export default function generateSecureRandomId(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);

  let randomId = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = randomValues[i] % charactersLength;
    randomId += characters[randomIndex];
  }
  return randomId;
}
