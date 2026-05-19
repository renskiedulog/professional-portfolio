import Link from "next/link";

const projects = [
  {
    title: "Portfolio Website",
    description: "A modern portfolio website showcasing my work and skills.",
    images: ["/projects/portfolio.webp"],
    link: "/works/portfolio",
  },
  {
    title: "MangaSensei",
    description:
      "A manga site built for manga readers, featuring a clean UI and fast performance.",
    images: ["/projects/mangasensei.webp"],
    link: "/works/mangasensei",
  },
];

export default function ProjectsGallery() {
  return (
    <section className="relative w-full mt-5">
      <div className="flex flex-col divide-y divide-neutral-200">
        {projects.map((project, index) => (
          <Link
            key={index}
            className="relative py-5 px-6 md:px-20 cursor-pointer overflow-hidden font-mono"
            href={project?.link || "#"}
          >
            {/* Content */}
            <div className="relative z-10 max-w-3xl  sm:text-left text-center">
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tigh">
                {project.title}
              </h2>

              <p className="mt-3 text-primary">{project.description}</p>
            </div>

            {/* Right Subtle Image with Mask */}
            <div className="absolute right-0 top-0 h-full w-full md:w-[40%] pointer-events-none">
              <div
                className="h-full w-full"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to left, black 70%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to left, black 70%, transparent 100%)",
                }}
              >
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="h-full w-full object-cover opacity-30 sm:opacity-50"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
