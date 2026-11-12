export function filterBooks(books, filters) {
  const query = filters.q.trim().toLowerCase();
  const min = filters.minPrice === '' ? null : Number(filters.minPrice);
  const max = filters.maxPrice === '' ? null : Number(filters.maxPrice);

  return books.filter((book) => {
    if (query) {
      const text = `${book.title} ${book.author}`.toLowerCase();
      if (!text.includes(query)) return false;
    }
    if (filters.genre && book.genre !== filters.genre) return false;
    if (filters.fundraiser && book.fundraiser !== filters.fundraiser) {
      return false;
    }
    if (min !== null && book.price < min) return false;
    if (max !== null && book.price > max) return false;
    return true;
  });
}
