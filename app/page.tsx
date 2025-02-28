export default function Home() {
  return (
    <main className="mx-auto max-w-xl">
      <div className="flex gap-10 flex-col-reverse sm:flex-row items-center">
        <div className="space-y-8">
          <h1 className="text-3xl tracking-tight text-center">DANIEL BLACK</h1>
          <p>I am a software engineer living in Denver Colorado.</p>
          <p>I work from home for C.H. Robinson.</p>
          <p>
            I enjoy spending my time with my beautiful fiance, Stephanie, and
            our sweet puppy dog, Nala.
          </p>
          <p>I like to read, write, learn new things, and make stuff.</p>
          {/* <p>
            If you would like to get into contact, email me at
            drblack651@gmail.com
          </p> */}
        </div>
        <img
          src="/image.png"
          alt="Dan Black"
          className="rounded-b-full sm:rounded-b-none sm:rounded-r-full border block max-h-fit"
          width={300}
          height={437}
        />
      </div>
    </main>
  );
}
