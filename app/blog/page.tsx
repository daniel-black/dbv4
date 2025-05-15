import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Daniel Black ⋅ Blog",
  description: "Daniel Black's blog posts.",
};

export default function BlogPage() {
  return (
    <div className="w-full mx-auto max-w-xl px-4 sm:px-0 pb-10 space-y-5">
      <h2 className="text-3xl font-semibold">Blog</h2>
      <p className="text-muted-foreground">
        I write from time to time so keep an eye out here for new posts.
      </p>
      <div>
        <p>posts:</p>
        <ul className="list-disc list-inside space-y-2">
          <li className="flex flex-col gap-1">
            <Link
              href="/blog/the-problem-with-book-apps"
              className="text-blue-600 underline underline-offset-4"
            >
              The Problem with &quot;Book Apps&quot;
            </Link>
            <span className="text-xs text-muted-foreground">5/14/2025</span>
          </li>
          <li className="flex flex-col gap-1">
            <Link
              href="/blog/variable-duty-cycle-square-wave"
              className="text-blue-600 underline underline-offset-4"
            >
              Variable duty cycle square waves with the Web Audio API
            </Link>
            <span className="text-xs text-muted-foreground">4/2/2025</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
