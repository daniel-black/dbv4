"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", text: "HOME" },
  { href: "/projects", text: "PROJECTS" },
  { href: "/blog", text: "BLOG" },
  { href: "/books", text: "BOOKS" },
] as const;

export function Header() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav className="fixed bottom-0 z-50 sm:top-0 w-full bg-background/70 backdrop-blur-sm border-t border-b-0 sm:border-b sm:border-t-0 h-14 flex items-center justify-between sm:justify-center divide-x text-sm sm:text-base sm:tracking-wide md:tracking-wider lg:tracking-widest">
      {links.map((link) => (
        <NavLink
          key={link.href}
          href={link.href}
          text={link.text}
          isActive={pathname === link.href}
        />
      ))}
    </nav>
  );
}

function NavLink(props: { href: string; text: string; isActive: boolean }) {
  return (
    <Link
      href={props.href}
      className={`h-full flex-1 flex items-center justify-center px-2 sm:px-8 cursor-pointer ${
        props.isActive
          ? "bg-secondary text-foreground"
          : "text-muted-foreground hover:text-foreground transition duration-75"
      }`}
    >
      {props.text}
    </Link>
  );
}
