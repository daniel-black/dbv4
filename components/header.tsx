import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";

export function Header() {
  return (
    <nav className="fixed bottom-0 z-50 sm:top-0 w-full bg-background/70 backdrop-blur-sm border-t border-b-0 sm:border-b sm:border-t-0 sm:h-14 flex items-center justify-between sm:justify-center divide-x text-sm sm:text-base sm:tracking-wide md:tracking-wider lg:tracking-widest">
      <Link
        href="/"
        className="h-full flex-1 flex items-center justify-center px-2 sm:px-8 cursor-pointer"
      >
        HOME
      </Link>
      <Link
        href="/projects"
        className="h-full flex-1 flex items-center justify-center px-2 sm:px-8 cursor-pointer"
      >
        PROJECTS
      </Link>
      <Link
        href="/blog"
        className="h-full flex-1 flex items-center justify-center px-2 sm:px-8 cursor-pointer"
      >
        BLOG
      </Link>
      <Link
        href="/books"
        className="h-full flex-1 flex items-center justify-center px-2 sm:px-8 cursor-pointer"
      >
        BOOKS
      </Link>
    </nav>
  );
}
