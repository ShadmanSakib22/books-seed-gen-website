import React from "react";
import { ThumbsUp } from "lucide-react";
import { flexRender } from "@tanstack/react-table";

export const BookTable = ({ table, columns }) => {
  const renderSubComponent = ({ row }) => {
    const book = row.original;

    return (
      <div className="p-4 md:p-6 bg-base-300">
        <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-8">
          <div className="relative aspect-auto">
            <img
              src={book.coverImage}
              alt={book.title}
              className="object-contain w-auto h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold">{book.title}</h3>
            <p className="text-sm text-accent">
              Published by {book.publisher} on {book.publishDate}
            </p>
            <p className="mt-2">{book.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <p className="btn btn-sm btn-outline btn-accent">
                <span className="font-semibold">GENRE:</span> {book.genre}
              </p>
              <p className="btn btn-sm btn-outline btn-accent">
                <span className="font-semibold">PAGES:</span> {book.pageCount}
              </p>
              <div className="flex gap-2">
                <p className="btn btn-sm btn-outline btn-accent">
                  <span className="font-semibold">REVIEWS:</span>{" "}
                  {book.reviews.toFixed(0)}
                </p>
                <p className="btn btn-sm btn-outline btn-accent font-semibold">
                  <ThumbsUp size={18} />
                  LIKES: {book.likes.toFixed(0)}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-semibold border-t-2 pt-2">
                Reviews:
              </h4>
              {book.reviewTexts.map((review, index) => (
                <div key={index} className="mt-2">
                  <p className="font-semibold">
                    {review.reviewer}
                    <span className="text-sm text-accent bg-accent-content ml-2 px-2 rounded-md">
                      {review.date}
                    </span>
                  </p>
                  <p>{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <table className="w-full table-zebra">
      <thead className="bg-base-300 sticky top-0 left-0 z-10">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="px-6 py-3 text-left text-xs font-medium text-accent uppercase"
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="text-xs md:text-sm">
        {table.getRowModel().rows.map((row) => (
          <React.Fragment key={row.id}>
            <tr className="hover:!bg-accent-content">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
            {row.getIsExpanded() && (
              <tr>
                <td colSpan={columns.length}>{renderSubComponent({ row })}</td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};
