export const generateSlug = (question: string): string => question
  .toLowerCase()
  .replaceAll(/[^a-z0-9\s-]/g, '')
  .replaceAll(/\s+/g, '-')
  .replaceAll(/-+/g, '-')
  .trim();
