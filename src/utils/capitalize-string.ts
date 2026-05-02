export function capitalizeString(text: string): string | null {
  if (!text || typeof text !== 'string') {
    return null;
  }

  const lowerCaseText = text.toLowerCase();

  return lowerCaseText.charAt(0).toUpperCase() + lowerCaseText.slice(1);
}
