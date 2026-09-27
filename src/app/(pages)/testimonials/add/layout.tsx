import { pageMetadata } from "@/lib/site";

// Form page shared directly with clients, no search value
export const metadata = pageMetadata({
  title: "Leave a Testimonial",
  description:
    "Worked with Renato Dulog? Share your experience and leave a testimonial.",
  path: "/testimonials/add",
  noindex: true,
});

export default function AddTestimonialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
