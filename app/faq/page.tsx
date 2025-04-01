import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { Section } from "@/components/section"
import { FAQ, type FAQItem } from "@/components/faq"
import { HeroSection } from "@/components/hero-section"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Modern Vending Solutions",
  description: "Find answers to common questions about our vending machine solutions.",
}

const generalFaqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "What types of vending machines do you offer?",
    answer:
      "We offer a wide range of vending machines including snack machines, beverage machines, combo machines, coffee machines, healthy vending machines, and custom branded machines. Our machines come with various payment options and smart technology features.",
  },
  {
    id: "faq-2",
    question: "How much does it cost to get a vending machine?",
    answer:
      "The cost varies depending on the type of machine, features, and whether you're purchasing, leasing, or using our profit-sharing model. Contact our sales team for a personalized quote based on your specific needs.",
  },
  {
    id: "faq-3",
    question: "Do you provide maintenance and restocking services?",
    answer:
      "Yes, we offer comprehensive maintenance and restocking services. Our team regularly services the machines to ensure they're functioning properly and restocks them based on consumption patterns to maximize sales and minimize waste.",
  },
  {
    id: "faq-4",
    question: "What payment methods do your machines accept?",
    answer:
      "Our modern vending machines accept various payment methods including cash, credit/debit cards, mobile payments (Apple Pay, Google Pay), and our own mobile app. We can customize the payment options based on your preferences.",
  },
  {
    id: "faq-5",
    question: "Can I customize the products in the vending machine?",
    answer:
      "We work with you to select products that meet your specific requirements, whether that's healthy options, specific brands, or a mix of popular items. We can also adjust the product mix based on sales data and customer feedback.",
  },
]

const businessFaqs: FAQItem[] = [
  {
    id: "biz-faq-1",
    question: "How does the profit-sharing model work?",
    answer:
      "With our profit-sharing model, we install and maintain the vending machines at no cost to you, and we share the profits from sales. The exact split depends on factors like location, foot traffic, and machine type. This model allows you to offer vending services without any upfront investment.",
  },
  {
    id: "biz-faq-2",
    question: "What locations are suitable for your vending machines?",
    answer:
      "Our vending machines are suitable for various locations including offices, schools, hospitals, retail stores, gyms, hotels, and manufacturing facilities. The ideal location has consistent foot traffic and a need for convenient food and beverage options.",
  },
  {
    id: "biz-faq-3",
    question: "Do you offer any reporting or analytics?",
    answer:
      "Yes, our smart vending machines provide detailed analytics including sales data, inventory levels, and consumer preferences. You can access this information through our online portal, helping you make data-driven decisions about product offerings.",
  },
  {
    id: "biz-faq-4",
    question: "What is the process for getting a vending machine installed?",
    answer:
      "The process starts with a consultation to understand your needs, followed by a site survey to determine the best location and machine type. Once we agree on terms, we schedule the installation, which typically takes 1-2 hours. After installation, we provide training on how to use the machine's features.",
  },
  {
    id: "biz-faq-5",
    question: "Can the vending machines be branded with our company logo?",
    answer:
      "Yes, we offer custom branding options for our vending machines. You can add your company logo, colors, and messaging to create a cohesive brand experience. This is particularly popular for corporate offices and retail locations.",
  },
]

const technicalFaqs: FAQItem[] = [
  {
    id: "tech-faq-1",
    question: "What happens if a machine malfunctions?",
    answer:
      "If a machine malfunctions, our monitoring system alerts our technical team immediately. We aim to resolve most issues within 24 hours. You can also report issues through our customer service hotline or online portal.",
  },
  {
    id: "tech-faq-2",
    question: "How often are the machines restocked?",
    answer:
      "Restocking frequency depends on sales volume and can range from daily to weekly. Our smart inventory system tracks product levels in real-time, allowing us to optimize restocking schedules and ensure products are always available.",
  },
  {
    id: "tech-faq-3",
    question: "Are your vending machines energy-efficient?",
    answer:
      "Yes, our modern vending machines are designed with energy efficiency in mind. They feature LED lighting, energy-saving modes during low-traffic periods, and efficient cooling systems that reduce electricity consumption compared to older models.",
  },
  {
    id: "tech-faq-4",
    question: "Can users provide feedback on products or request specific items?",
    answer:
      "Yes, our mobile app allows users to provide feedback, rate products, and request specific items. This feedback helps us continuously improve our offerings and ensure customer satisfaction.",
  },
  {
    id: "tech-faq-5",
    question: "What technology features do your smart vending machines include?",
    answer:
      "Our smart vending machines include features like touchscreen interfaces, remote monitoring, inventory tracking, sales analytics, cashless payment options, temperature control monitoring, and interactive product information displays.",
  },
]

export default function FAQPage() {
  return (
    <PageLayout>
      <HeroSection
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our vending machine solutions"
        imageUrl="/images/faq-hero.jpg"
        imageAlt="Customer using a modern vending machine"
      />

      <Section title="General Questions" className="bg-background">
        <FAQ items={generalFaqs} defaultOpen={["faq-1"]} />
      </Section>

      <Section title="Business & Partnership Questions" className="bg-muted/50">
        <FAQ items={businessFaqs} />
      </Section>

      <Section title="Technical & Maintenance Questions" className="bg-background">
        <FAQ items={technicalFaqs} />
      </Section>

      <Section title="Still Have Questions?" className="bg-muted/50">
        <div className="text-center max-w-2xl mx-auto">
          <p className="mb-6">
            Can't find the answer you're looking for? Our team is here to help with any questions you may have about our
            vending machine solutions.
          </p>
          <div className="flex justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Contact Our Support Team
            </a>
          </div>
        </div>
      </Section>
    </PageLayout>
  )
}

