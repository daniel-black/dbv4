import { GamesDemo } from "@/components/games-demo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daniel Black ⋅ Projects",
  description: "A list of projects I've worked on.",
};

export default function ProjectsPage() {
  return (
    <main className="space-y-5 w-full mx-auto max-w-xl px-4 sm:px-0 pb-10 sm:py-10">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold">Projects</h1>
        <p className="text-muted-foreground">
          I am working on starting less and finishing more.
        </p>
      </div>

      <section>
        <h2 className="sr-only">Project List</h2>
        <ul className="space-y-4">
          <li className="border border-dashed p-4">
            <h3 className="text-xl font-semibold">Chiptunes Tracker</h3>
            <a
              href="https://chiptunes.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline underline-offset-4 hover:text-blue-600"
            >
              Chiptunes
            </a>
            <p className="text-muted-foreground mt-4">
              A new and improved version of the Gameboy tracker app I previously
              built. In this latest iteration, you can create multiple songs and
              your progress is persisted to local storage so you don&apos;t have
              to compose your masterpiece from scratch, in one go, each time.
            </p>
          </li>

          <li className="border border-dashed p-4">
            <h3 className="text-xl font-semibold">react-mini-games</h3>
            <a
              href="https://github.com/daniel-black/react-mini-games"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline underline-offset-4 hover:text-blue-600"
            >
              github.com/daniel-black/react-mini-games
            </a>
            <p className="text-muted-foreground mt-4">
              I had my employee (gpt-5) build an npm library that lets you
              import mini games as React components. They&apos;re simple canvas
              games and good for a fun not-found page or as an easter egg in
              your site.
            </p>
            <GamesDemo />
          </li>

          <li className="border border-dashed p-4">
            <h3 className="text-xl font-semibold">Our Wedding Website</h3>
            <a
              href="https://danplussteph.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline underline-offset-4 hover:text-blue-600"
            >
              danplussteph.com
            </a>
            <p className="text-muted-foreground mt-4">
              Tried to flex my design muscles for this one. It&apos;s a picture
              heavy site with one real feature around RSVPs. I like the way it
              turned out.
            </p>
          </li>

          <li className="border border-dashed p-4">
            <h3 className="text-xl font-semibold">Gameboy Tracker</h3>
            <a
              href="https://gameboy-tracker.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline underline-offset-4 hover:text-blue-600"
            >
              gameboy-tracker.vercel.app
            </a>
            <p className="text-muted-foreground mt-4">
              A tracker for creating music in the style of the Gameboy. The
              audio sythesis is all done in the browser with the Web Audio API.
            </p>
          </li>

          <li className="border border-dashed p-4">
            <h3 className="text-xl font-semibold">PDF Dark</h3>
            <a
              href="https://pdfdark.com"
              target="_blank"
              rel="noopener noreferrer"
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
      </section>
    </main>
  );
}
