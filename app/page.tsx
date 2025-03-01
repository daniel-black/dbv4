import { FunImage } from "@/components/fun-image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-xl px-4 sm:px-0 pb-10 sm:py-10">
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-5">
        <div className="space-y-5">
          <h2 className="text-3xl font-semibold">Daniel Black</h2>
          <p>
            Hey I&apos;m Dan. I&apos;m a full stack software engineer based in
            Denver Colorado. I work for C.H. Robinson on a web app called{" "}
            <a
              href="https://freightquote.com/book"
              target="_blank"
              rel="noreferrer"
            >
              Freightquote
            </a>
            .
          </p>
          <p>
            Outside of work, I enjoy getting outside and spending with my
            beautiful fiance, Stephanie, and our anxious puppy dog, Nala.
          </p>
          <p>
            I also enjoy reading and watching long, slow movies that there is
            never enough time to watch in one sitting
          </p>
          <p>
            I love working on side projects and learning by doing. TypeScript
            and JavaScript are my bread and butter. React is a lot of fun. I
            just really like the web. I have a good bit of experience with C#
            and dabble with Go from time to time. I like tinkering around with
            frameworks like Next.js and Tanstack libraries.
          </p>
          <p>
            I&apos;ve been learning more about AWS recently and am intrigued by
            the IaC offerings like CDK. The whole AWS value prop is so
            interesting to me. Let them handle the undifferentiated heavy
            lifting and focus on what makes your product unique.
          </p>
          <p>
            Anyways, I love talking about this stuff and am always down to chat
            about tech or books or whatever. Shoot me an email at
            drblack651@gmail.com if you want to chat!
          </p>
          <div>
            <p>My links:</p>
            <ul>
              <li>
                <a
                  href="https://github.com/daniel-black"
                  target="_blank"
                  className="text-blue-600 underline underline-offset-4"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/danielblack2022/"
                  target="_blank"
                  className="text-blue-600 underline underline-offset-4"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <FunImage />
      </div>
    </main>
  );
}
