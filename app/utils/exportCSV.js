import Papa from "papaparse";

export const exportToCSV = (books, seed) => {
  const csvData = books.map((book) => ({
    ID: book.id,
    ISBN: book.isbn,
    Title: book.title,
    Authors: book.authors.join(", "),
    Publisher: book.publisher,
    PublishDate: book.publishDate,
    PageCount: book.pageCount,
    Genre: book.genre,
    Likes: book.likes,
    Reviews: book.reviews,
  }));

  const csv = Papa.unparse(csvData);
  const bom = "\ufeff";
  const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", `BookTable-${seed}.csv`);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
