import { faker, fakerES, fakerRU, fakerZH_CN } from "@faker-js/faker";
import {
  enReviewSentences,
  esReviewSentences,
  ruReviewSentences,
  cnReviewSentences,
} from "@/app/data/reviewData";

// Helper function to convert hex seed to numeric seed
const getNumericSeed = (hexSeed, startIndex) =>
  parseInt(hexSeed, 16) + startIndex;

// Helper function to generate a random float within a range
const generateRandomFloat = (fakerInstance, min, max, precision) =>
  Math.max(0, fakerInstance.number.float({ min, max, precision }));

// Helper function to format a date
const formatDate = (fakerInstance, dateFunc, options = {}) =>
  fakerInstance.date[dateFunc](options).toISOString().split("T")[0];

export const generateBooks = (
  startIndex,
  count,
  seedValue,
  language,
  avgLikes,
  avgReviews
) => {
  if (!seedValue) return [];

  const localeMap = { en: faker, es: fakerES, ru: fakerRU, cn: fakerZH_CN };
  const localizedFaker = localeMap[language] || faker;

  // Seed Faker with the numeric seed
  localizedFaker.seed(getNumericSeed(seedValue, startIndex));

  // Get review sentences for the selected language
  const reviewSentences =
    {
      en: enReviewSentences,
      es: esReviewSentences,
      ru: ruReviewSentences,
      cn: cnReviewSentences,
    }[language] || enReviewSentences;

  // Generate an array of book data
  return Array.from({ length: count }, (_, index) => {
    const id = startIndex + index;
    const likesCount = generateRandomFloat(
      localizedFaker,
      avgLikes - 2,
      avgLikes + 2,
      0.1
    );
    const reviewsCount = generateRandomFloat(
      localizedFaker,
      avgReviews - 1,
      avgReviews + 1,
      0.1
    );

    const authors = Array.from(
      { length: localizedFaker.number.int({ min: 1, max: 3 }) },
      () => localizedFaker.person.fullName()
    );

    const reviewTexts = Array.from(
      { length: Math.round(reviewsCount) },
      () => ({
        reviewer: localizedFaker.person.fullName(),
        text: localizedFaker.helpers.arrayElement(reviewSentences),
        date: formatDate(localizedFaker, "recent", { days: 365 }),
      })
    );

    return {
      id,
      isbn: localizedFaker.commerce.isbn(),
      title: localizedFaker.commerce.productName(),
      authors,
      publisher: localizedFaker.company.name(),
      publishDate: formatDate(localizedFaker, "past", { years: 20 }),
      pageCount: localizedFaker.number.int({ min: 50, max: 1000 }),
      genre: localizedFaker.commerce.department(),
      description: localizedFaker.commerce.productDescription(),
      coverImage: `https://picsum.photos/seed/${id + seedValue}/200/300`,
      likes: likesCount,
      reviews: reviewsCount,
      reviewTexts,
    };
  });
};
