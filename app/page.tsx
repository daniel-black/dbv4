export default function Home() {
  return (
    <main className="mx-auto w-full max-w-xl px-4 sm:px-0 pb-10 sm:py-10">
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-5">
        <div className="space-y-5">
          <h2 className="text-3xl font-semibold">Daniel Black</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda,
            praesentium quam tempora quis earum facilis neque recusandae culpa
            voluptatibus atque modi dolorum? Necessitatibus inventore molestiae
            incidunt voluptatum nesciunt explicabo quibusdam laborum! Commodi
            ipsam quo iusto unde velit consectetur, officia voluptatem porro
            laudantium quis aliquam nemo animi labore saepe temporibus esse.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda,
            praesentium quam tempora quis earum facilis neque recusandae culpa
            voluptatibus atque modi dolorum? Necessitatibus inventore molestiae
            incidunt voluptatum nesciunt explicabo quibusdam laborum! Commodi
            ipsam quo iusto unde velit consectetur, officia voluptatem porro
            laudantium quis aliquam nemo animi labore saepe temporibus esse.
          </p>
        </div>
        <img
          src="/image.png"
          alt="Dan Black"
          className="border block max-h-fit rounded-r-full"
          width={300}
          height={437}
        />
      </div>
    </main>
  );
}
