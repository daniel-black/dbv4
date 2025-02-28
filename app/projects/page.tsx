import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daniel Black ⋅ Projects",
  description: "A list of projects I've worked on.",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-5 w-full mx-auto max-w-xl px-4 sm:px-0 pb-10 sm:py-10">
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold">Projects</h2>
        <p className="text-muted-foreground">
          I am working on starting less and finishing more.
        </p>
      </div>
    </div>
  );
}
