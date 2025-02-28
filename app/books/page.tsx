import Link from "next/link";
import { books } from "./data";
import { ArrowUpRight } from "lucide-react";

export default function BooksPage() {
  return (
    <div className="space-y-5 w-full mx-auto max-w-xl px-4 sm:px-0 pb-10">
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold">My reading list</h2>
        <p className="text-muted-foreground">
          Not a comprehensive list but these are some of the titles I have been
          digging into over the years. Girard and McLuhan are two of my
          favorites and have been a big influence on my thinking.
        </p>
      </div>

      <div className="space-y-10">
        <div className="space-y-5">
          <div
            className="sticky top-0 sm:top-14 bg-black text-white w-full h-10 font-mono flex items-center justify-center"
            id="2025"
          >
            2025
            <Link
              href="/books#2024"
              className="absolute right-3 text-secondary text-sm border border-dashed border-black hover:border-white w-6 h-6 flex justify-center items-center rounded-full transition-all duration-75"
            >
              ↓
            </Link>
          </div>
          <ul className="space-y-10 -z-10">
            {books["2025"].map((book) => (
              <li key={book.title}>
                <Book {...book} />
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5">
          <div
            className="sticky top-0 sm:top-14 bg-black text-white w-full h-10 font-mono flex items-center justify-center"
            id="2024"
          >
            <Link
              href="/books#2025"
              className="absolute left-3 text-secondary text-sm border border-dashed border-black hover:border-white w-6 h-6 flex justify-center items-center rounded-full transition-all duration-75"
            >
              ↑
            </Link>
            2024
            <Link
              href="/books#2023"
              className="absolute right-3 text-secondary text-sm border border-dashed border-black hover:border-white w-6 h-6 flex justify-center items-center rounded-full transition-all duration-75"
            >
              ↓
            </Link>
          </div>
          <ul className="space-y-10">
            {books["2024"].map((book) => (
              <li key={book.title}>
                <Book {...book} />
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5">
          <div
            className="sticky top-0 sm:top-14 bg-black text-white w-full h-10 font-mono flex items-center justify-center"
            id="2023"
          >
            <Link
              href="/books#2024"
              className="absolute left-3 text-secondary text-sm border border-dashed border-black hover:border-white w-6 h-6 flex justify-center items-center rounded-full transition-all duration-75"
            >
              ↑
            </Link>
            2023 and prior
          </div>

          <ul className="space-y-10">
            {books["2023"].map((book) => (
              <li key={book.title}>
                <Book {...book} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Book({
  title,
  author,
  description,
  link,
}: {
  title: string;
  author: string;
  description?: string;
  link?: string;
}) {
  return (
    <div className="border rounded-none">
      <div className="p-4 flex justify-between">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <span className="text-sm">by {author}</span>
        </div>
        {link && (
          <a href={link} target="_blank">
            <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
          </a>
        )}
      </div>

      {description && (
        <>
          <hr className="w-full border-dashed" />
          <div className="bg-secondary text-xs p-4">
            <p>{description}</p>
          </div>
        </>
      )}
    </div>
  );
}
