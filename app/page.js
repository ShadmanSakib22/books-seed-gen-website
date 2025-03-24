"use client";

import React, { useState, useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";
import { Minus, Plus } from "lucide-react";
import { generateBooks, generateRandomSeed } from "./utils/bookGenerators";
import { exportToCSV } from "./utils/exportCSV";
import { Toolbar } from "./components/Toolbar";
import { BookTable } from "./components/BookTable";

const BookTester = () => {
  const [seed, setSeed] = useState("");
  const [language, setLanguage] = useState("en");
  const [avgLikes, setAvgLikes] = useState(5);
  const [avgReviews, setAvgReviews] = useState(3);
  const [books, setBooks] = useState([]);
  const [expanded, setExpanded] = useState({});

  const parentRef = useRef(null);
  const rowVirtualizer = useVirtualizer({
    count: books.length + 1,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  });

  const languages = [
    { code: "en", name: "English" },
    { code: "ru", name: "Russian" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "es", name: "Spanish" },
    { code: "ja", name: "Japanese" },
  ];

  const handleRandomSeed = () => {
    const newSeed = generateRandomSeed();
    setSeed(newSeed);
  };

  useEffect(() => {
    if (seed) {
      const initialBooks = generateBooks(
        0,
        20,
        seed,
        language,
        avgLikes,
        avgReviews
      );
      setBooks(initialBooks);
    }
  }, [seed, language, avgLikes, avgReviews]);

  const loadMoreBooks = () => {
    if (seed) {
      const newBooks = generateBooks(
        books.length,
        10,
        seed,
        language,
        avgLikes,
        avgReviews
      );
      setBooks([...books, ...newBooks]);
    }
  };

  const handleExportCSV = () => {
    exportToCSV(books, seed);
  };

  const lastItemIndex = rowVirtualizer.range?.endIndex ?? 0;
  if (lastItemIndex >= books.length - 1 && books.length > 0) {
    loadMoreBooks();
  }

  const columns = [
    {
      id: "expander",
      header: () => null,
      cell: ({ row }) => (
        <button
          className="rounded-md bg-base-300"
          onClick={() => row.toggleExpanded()}
        >
          {row.getIsExpanded() ? <Minus size={20} /> : <Plus size={20} />}
        </button>
      ),
    },
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "isbn",
      header: "ISBN",
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "authors",
      header: "Author(s)",
      cell: ({ row }) => row.original.authors.join(", "),
    },
    {
      accessorKey: "publisher",
      header: "Publisher",
    },
  ];

  const table = useReactTable({
    data: books,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div className="container min-h-screen mx-auto p-4">
      <Toolbar
        language={language}
        setLanguage={setLanguage}
        seed={seed}
        setSeed={setSeed}
        generateRandomSeed={handleRandomSeed}
        avgReviews={avgReviews}
        setAvgReviews={setAvgReviews}
        avgLikes={avgLikes}
        setAvgLikes={setAvgLikes}
        exportToCSV={handleExportCSV}
        booksLength={books.length}
        languages={languages}
      />

      {books.length > 0 ? (
        <div
          ref={parentRef}
          className="shadow-md shadow-base-300 border-2 border-base-200 rounded-lg overflow-auto relative"
          style={{ height: "70vh" }}
        >
          <BookTable table={table} columns={columns} />
        </div>
      ) : (
        <div className="text-center p-10 bg-background rounded-lg">
          <p className="cta-text">Get started by entering Seed Data</p>
        </div>
      )}
    </div>
  );
};

export default BookTester;
