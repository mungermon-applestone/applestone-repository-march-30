import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { Section } from "@/components/section"
import { Testimonial } from "@/components/testimonial"
import { HeroSection } from "@/components/hero-section"

export const metadata: Metadata = {
  title: "Customer Testimonials | Modern Vending Solutions",
  description: "See what our customers are saying about our vending machine solutions.",
}

const testimonials = [
  {
    id: 1,
    quote:
      "Installing Modern Vending machines in our office has been a game-changer for employee satisfaction. The machines are reliable, the products are always fresh, and the customer service is exceptional.",
    author: "Sarah Johnson",
    role: "HR Director",
    company: "Tech Innovations Inc.",
    imageSrc: "/images/testimonial-1.jpg",
  },
  {
    id: 2,
    quote:
      "We've had Modern Vending machines in our university campus for over two years now. The smart technology and cashless payment options have been incredibly popular with students, and the maintenance team is always prompt and professional.",
    author: "Dr. Michael Chen",
    role: "Campus Services Manager",
    company: "State University",
    imageSrc: "/images/testimonial-2.jpg",
  },
  {
    id: 3,
    quote:
      "As a hospital administrator, I appreciate the healthy options that Modern Vending provides. Their machines are clean, well-stocked, and offer a variety of nutritious choices for our staff and visitors.",
    author: "Lisa Rodriguez",
    role: "Operations Manager",
    company: "Community Hospital",
    imageSrc: "/images/testimonial-3.jpg",
  },
  {
    id: 4,
    quote:
      "Modern Vending has been an excellent partner for our retail locations. The machines are sleek, modern, and fit perfectly with our store aesthetic. Plus, the revenue sharing model has been a nice addition to our bottom line.",
    author: "James Wilson",
    role: "Regional Manager",
    company: "Urban Retail Group",
    imageSrc: "/images/testimonial-4.jpg",
  },
  {
    id: 5,
    quote:
      "The customization options for Modern Vending machines are impressive. We were able to brand the machines with our company logo and select products that align with our corporate wellness program.",
    author: "Patricia Thompson",
    role: "Facilities Director",
    company: "Global Finance Partners",
    imageSrc: "/images/testimonial-5.jpg",
  },
  {
    id: 6,
    quote:
      "The data analytics provided by Modern Vending has helped us optimize our product offerings based on actual consumption patterns. This level of insight is invaluable for our business.",
    author: "Robert Garcia",
    role: "Business Intelligence Analyst",
    company: "Data Solutions Co.",
    imageSrc: "/images/testimonial-6.jpg",
  },
]

export default function TestimonialsPage() {
  return (
    <PageLayout>
      <HeroSection
        title="Customer Testimonials"
        subtitle="Hear what our clients have to say about our vending machine solutions"
        imageUrl="/images/testimonials-hero.jpg"
        imageAlt="Happy customers using our vending machines"
      />

      <Section title="What Our Clients Say" className="bg-background">
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <Testimonial
              key={testimonial.id}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              company={testimonial.company}
              imageSrc={testimonial.imageSrc}
            />
          ))}
        </div>
      </Section>

      <Section title="Join Our Satisfied Customers" className="bg-muted/50">
        <div className="text-center max-w-2xl mx-auto">
          <p className="mb-6">
            Experience the Modern Vending difference for yourself. Contact us today to discuss how our vending solutions
            can benefit your business.
          </p>
          <div className="flex justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Contact Us Today
            </a>
          </div>
        </div>
      </Section>
    </PageLayout>
  )
}

