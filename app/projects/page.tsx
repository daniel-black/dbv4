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

      <div>
        <ul>
          <li className="border border-dashed p-4">
            <h3 className="text-xl font-semibold">Gameboy Tracker</h3>
            <a
              href="https://gameboy-tracker.vercel.app"
              target="_blank"
              className="text-blue-500 underline underline-offset-4 hover:text-blue-600"
            >
              gameboy-tracker.vercel.app
            </a>
            <p className="text-muted-foreground mt-4">
              A tracker for creating music in the style of the Gameboy. The
              audio sythesis is all done in the browser with the Web Audio API.
              Still under active development.
            </p>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li className="border border-dashed p-4">
            <h3 className="text-xl font-semibold">PDF Dark</h3>
            <a
              href="https://pdfdark.com"
              target="_blank"
              className="text-blue-500 underline underline-offset-4 hover:text-blue-600"
            >
              pdfdark.com
            </a>
            <p className="text-muted-foreground mt-4">
              A super simple website that lets users view a PDF in &quot;dark
              mode&quot;. It does this by inverting the colors of the PDF with
              CSS. This is rough for images and graphics, but works well for
              text.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
