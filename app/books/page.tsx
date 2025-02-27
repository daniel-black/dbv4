// import Link from "next/link";
import { books } from "./data";

export default function BooksPage() {
  return (
    <div className="space-y-4">
      <h1>
        This is not a comprehensive list of everything I've read but it's a good
        list
      </h1>
      {/* <Link href="#2025">2025</Link>
      <Link href="#2024">2024</Link>
      <Link href="#2023">2023 and prior</Link> */}
      <div>
        <h2 className="font-semibold" id="2025">
          2025
        </h2>
        <ul>
          {books["2025"].map(({ title, author }) => (
            <li key={title} className="flex justify-between">
              <i>{title}</i>
              <span>{author}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="font-semibold" id="2024">
          2024
        </h2>
        <ul>
          {books["2024"].map(({ title, author }) => (
            <li key={title} className="flex justify-between">
              <i>{title}</i>
              <span>{author}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="font-semibold" id="2023">
          2023 and prior
        </h2>
        <ul>
          {books["2023"].map(({ title, author }) => (
            <li key={title} className="flex justify-between">
              <i>{title}</i>
              <span>{author}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
