export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="space-y-5 w-full mx-auto max-w-xl px-4 sm:px-0 pb-10 sm:py-10">
      {children}
    </div>
  );
}
