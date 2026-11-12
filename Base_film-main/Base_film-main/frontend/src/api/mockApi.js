import { mockFilms } from '../data/mockData';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchRecipes = async () => {
  await delay(250);
  return mockFilms;
};

export const fetchRecipeById = async (id) => {
  await delay(150);
  return mockFilms.find((film) => film.id === id);
};

export const askQuestion = async (query) => {
  await delay(500);
  const q = query.toLocaleLowerCase('ru');
  const minRatingMatch = q.match(/(?:от|выше|больше|минимум)\s*(\d[.,]?\d?)/);
  const minRating = minRatingMatch ? Number(minRatingMatch[1].replace(',', '.')) : 0;
  const actor = mockFilms.flatMap((f) => f.actors).find((name) => q.includes(name.toLocaleLowerCase('ru')));
  const genre = [...new Set(mockFilms.flatMap((f) => f.genres))].find((name) => q.includes(name));
  const yearMatch = q.match(/(?:после|с)\s*(19\d{2}|20\d{2})/);
  const year = yearMatch ? Number(yearMatch[1]) : 0;
  let results = mockFilms.filter((f) =>
    f.rating >= minRating &&
    (!actor || f.actors.includes(actor)) &&
    (!genre || f.genres.includes(genre)) &&
    (!year || f.year >= year)
  );

  if (/похож|напомин|как\s+в/.test(q)) {
    const title = mockFilms.find((f) => q.includes(f.name.toLocaleLowerCase('ru')));
    if (title) {
      const similar = title.similar.map((id) => mockFilms.find((f) => f.id === id)).filter(Boolean);
      results = similar.length ? similar : results;
    }
  }

  if (/комед/.test(q) && !genre) results = mockFilms.filter((f) => f.genres.includes('комедия') && f.rating >= minRating);
  if (/ужас|хоррор/.test(q)) results = mockFilms.filter((f) => f.genres.includes('ужасы'));
  if (/боевик/.test(q) && !genre) results = mockFilms.filter((f) => f.genres.includes('боевик') && f.rating >= minRating);

  if (!results.length) {
    return 'По заданным критериям точных совпадений не найдено. Попробуйте изменить жанр, снизить минимальный рейтинг или указать другого актёра.';
  }

  const intro = actor ? `Фильмы с актёром ${actor}` : genre ? `Подборка в жанре «${genre}»` : 'Вот фильмы, которые могут вам подойти';
  return `${intro}:\n\n${results.slice(0, 5).map((f, i) => `${i + 1}. ${f.name} (${f.year}) — рейтинг ${f.rating}/10, ${f.duration} мин.\n   Жанры: ${f.genres.join(', ')}. В ролях: ${f.actors.join(', ')}.\n   ${f.description}`).join('\n\n')}`;
};
