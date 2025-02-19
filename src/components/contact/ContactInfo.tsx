import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif mb-6">Contact Information</h2>
        <p className="text-gray-600 mb-8">
          Have questions about our products or need assistance with your order? 
          We're here to help! Choose your preferred way to reach us.
        </p>
      </div>

      <div className="space-y-6">
        {/* Address */}
        <div className="flex items-start gap-4">
          <MapPinIcon className="w-6 h-6 text-primary-600 flex-shrink-0" />
          <div>
            <h3 className="font-medium mb-1">Visit Us</h3>
            <p className="text-gray-600">
              123 Artisan Street<br />
              Craftsville, CV 12345<br />
              United States
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-4">
          <PhoneIcon className="w-6 h-6 text-primary-600 flex-shrink-0" />
          <div>
            <h3 className="font-medium mb-1">Call Us</h3>
            <p className="text-gray-600">
              <a href="tel:+1234567890" className="hover:text-primary-600">
                +1 (234) 567-890
              </a>
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4">
          <EnvelopeIcon className="w-6 h-6 text-primary-600 flex-shrink-0" />
          <div>
            <h3 className="font-medium mb-1">Email Us</h3>
            <p className="text-gray-600">
              <a href="mailto:hello@example.com" className="hover:text-primary-600">
                hello@example.com
              </a>
            </p>
          </div>
        </div>

        {/* Business Hours */}
        <div className="flex items-start gap-4">
          <ClockIcon className="w-6 h-6 text-primary-600 flex-shrink-0" />
          <div>
            <h3 className="font-medium mb-1">Business Hours</h3>
            <p className="text-gray-600">
              Monday - Friday: 9:00 AM - 6:00 PM<br />
              Saturday: 10:00 AM - 4:00 PM<br />
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="pt-8 border-t">
        <h3 className="font-medium mb-4">Follow Us</h3>
        <div className="flex gap-4">
          {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map((platform) => (
            <a
              key={platform}
              href="#"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              {platform}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
