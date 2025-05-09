import { motion } from "framer-motion";
import Hero from "../components/contactUs/Hero";
import ContactForm from "../components/contactUs/ContactForm";
import ContactInfo from "../components/contactUs/ContactInfo";

const ContactUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <Hero />
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ContactForm />
          {/* Contact Information */}
          <ContactInfo />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
