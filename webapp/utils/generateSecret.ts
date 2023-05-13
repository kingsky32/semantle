import { adjectives, nouns } from '#commons/words';

export function generateSecret(): string {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
}
