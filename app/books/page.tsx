import Link from "next/link";
import { books } from "./data";
import { ArrowUpRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daniel Black ⋅ Books",
  description: "A list of books I have read and enjoyed.",
};

export default function BooksPage() {
  return (
    <div className="space-y-5 w-full mx-auto max-w-xl px-4 sm:px-0 pb-10 sm:py-10">
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
          <StickyYear year="2025" previousYear="2024" />
          <BookList year="2025" />
        </div>

        <div className="space-y-5">
          <StickyYear year="2024" previousYear="2023" nextYear="2025" />
          <BookList year="2024" />
        </div>

        <div className="space-y-5">
          <StickyYear year="2023" extraText="and prior" nextYear="2024" />
          <BookList year="2023" />
        </div>
      </div>
    </div>
  );
}

function StickyYear(props: {
  year: string;
  extraText?: string;
  previousYear?: string;
  nextYear?: string;
}) {
  return (
    <div
      className="sticky top-0 sm:top-14 bg-secondary-foreground text-secondary w-full h-10 font-mono flex items-center justify-center"
      id={props.year}
    >
      {props.nextYear && (
        <Link
          href={`/books#${props.nextYear}`}
          className="absolute left-3 text-secondary text-sm border border-dashed border-black hover:border-white w-6 h-6 flex justify-center items-center rounded-full transition-all duration-75"
        >
          ↑
        </Link>
      )}
      {props.year}
      {props.extraText && ` ${props.extraText}`}
      {props.previousYear && (
        <Link
          href={`/books#${props.previousYear}`}
          className="absolute right-3 text-secondary text-sm border border-dashed border-black hover:border-white w-6 h-6 flex justify-center items-center rounded-full transition-all duration-75"
        >
          ↓
        </Link>
      )}
    </div>
  );
}

function BookList({ year }: { year: "2023" | "2024" | "2025" }) {
  return (
    <ul className="space-y-10">
      {books[year].map((book) => (
        <li key={book.title}>
          <Book {...book} />
        </li>
      ))}
    </ul>
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
          <span className="text-sm text-muted-foreground">by {author}</span>
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
