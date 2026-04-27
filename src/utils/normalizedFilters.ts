export function normalizeFilters<T extends Record<string, unknown>>(
  filters: T,
): T | undefined {
  const cleaned = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => {
      if (value === undefined) return false;
      if (value === null) return false;
      if (value === '') return false;
      if (Array.isArray(value) && value.length === 0) return false;

      return true;
    }),
  ) as T;

  return Object.keys(cleaned).length > 0 ? cleaned : undefined;
}
