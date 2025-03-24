import "./globals.css";

export const metadata = {
  title: "Book Tester",
  description:
    "Book store testing web application utilizing random seed generation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
