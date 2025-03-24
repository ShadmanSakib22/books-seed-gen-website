import { faker } from "@faker-js/faker";

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

  faker.seed(
    seedValue
      .split("")
      .map((char) => char.charCodeAt(0))
      .reduce((a, b) => a + b, 0) + startIndex
  );
  faker.locale = language;

  return Array.from({ length: count }, (_, i) => {
    const id = startIndex + i;
    const likesCount = Math.max(
      0,
      faker.number.float({
        min: avgLikes - 2,
        max: avgLikes + 2,
        precision: 0.1,
      })
    );
    const reviewsCount = Math.max(
      0,
      faker.number.float({
        min: avgReviews - 1,
        max: avgReviews + 1,
        precision: 0.1,
      })
    );

    const authors = Array.from(
      { length: faker.number.int({ min: 1, max: 3 }) },
      () => faker.person.fullName()
    );

    return {
      id,
      isbn: faker.commerce.isbn(),
      title: faker.commerce.productName(),
      authors,
      publisher: faker.company.name(),
      publishDate: faker.date.past({ years: 20 }).toISOString().split("T")[0],
      pageCount: faker.number.int({ min: 50, max: 1000 }),
      genre: faker.commerce.department(),
      description: faker.commerce.productDescription(),
      coverImage: `https://picsum.photos/seed/${id + seedValue}/200/300`,
      likes: likesCount,
      reviews: reviewsCount,
      reviewTexts: Array.from({ length: Math.round(reviewsCount) }, () => ({
        reviewer: faker.person.fullName(),
        text: faker.lorem.paragraph(),
        date: faker.date.recent({ days: 365 }).toISOString().split("T")[0],
      })),
    };
  });
};
