import {
  faker,
  fakerDE,
  fakerES,
  fakerFR,
  fakerJA,
  fakerRU,
} from "@faker-js/faker";

export const generateRandomSeed = () => {
  return Math.random().toString(36).substring(2, 10);
};

export const generateBooks = (
  startIndex,
  count,
  seedValue,
  language,
  avgLikes,
  avgReviews
) => {
  if (!seedValue) return [];

  const localeMap = {
    en: faker,
    de: fakerDE,
    es: fakerES,
    fr: fakerFR,
    ja: fakerJA,
    ru: fakerRU,
  };

  const localizedFaker = localeMap[language] || faker;

  localizedFaker.seed(
    seedValue
      .split("")
      .map((char) => char.charCodeAt(0))
      .reduce((a, b) => a + b, 0) + startIndex
  );

  return Array.from({ length: count }, (_, i) => {
    const id = startIndex + i;
    const likesCount = Math.max(
      0,
      localizedFaker.number.float({
        min: avgLikes - 2,
        max: avgLikes + 2,
        precision: 0.1,
      })
    );
    const reviewsCount = Math.max(
      0,
      localizedFaker.number.float({
        min: avgReviews - 1,
        max: avgReviews + 1,
        precision: 0.1,
      })
    );

    const authors = Array.from(
      { length: localizedFaker.number.int({ min: 1, max: 3 }) },
      () => localizedFaker.person.fullName()
    );

    return {
      id,
      isbn: localizedFaker.commerce.isbn(),
      title: localizedFaker.commerce.productName(),
      authors,
      publisher: localizedFaker.company.name(),
      publishDate: localizedFaker.date
        .past({ years: 20 })
        .toISOString()
        .split("T")[0],
      pageCount: localizedFaker.number.int({ min: 50, max: 1000 }),
      genre: localizedFaker.commerce.department(),
      description: localizedFaker.commerce.productDescription(),
      coverImage: `https://picsum.photos/seed/${id + seedValue}/200/300`,
      likes: likesCount,
      reviews: reviewsCount,
      reviewTexts: Array.from({ length: Math.round(reviewsCount) }, () => ({
        reviewer: localizedFaker.person.fullName(),
        text: localizedFaker.lorem.paragraph(),
        date: localizedFaker.date
          .recent({ days: 365 })
          .toISOString()
          .split("T")[0],
      })),
    };
  });
};
