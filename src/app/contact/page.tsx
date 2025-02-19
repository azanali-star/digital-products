import { Metadata } from 'next';
import Hero from '@/components/ui/Hero';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';

export const metadata: Metadata = {
  title: 'Contact Us | Get in Touch',
  description: 'Have questions about our products or services? Get in touch with our team for support and inquiries.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Hero
        title="Get in Touch"
        subtitle="We'd love to hear from you. Our team is always here to help."
        imageSrc="/images/contact-hero.jpg"
        imageAlt="Customer service team"
        height="h-[40vh]"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-serif mb-6">Send us a Message</h2>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
