import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import emailjs from '@emailjs/browser';
import Subscribe from "./Subscribe";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    try {
      const templateParams = {
        to_email: 'abdulsameer66949@gmail.com',
        from_name: `${data.firstName} ${data.lastName}`,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        reply_to: data.email
      };

      await emailjs.send(
        'service_ecell_smec', // You'll need to set up EmailJS service
        'template_contact', // You'll need to create this template
        templateParams,
        'your_public_key' // You'll need to add your public key
      );

      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      content: "ecell.smec@gmail.com",
      link: "mailto:ecell.smec@gmail.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      content: "+91 6304052967",
      link: "tel:+916304052967"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      content: "St. Martin's Engineering College, Sy. No.98 & 100, Dhulapally Road, Dhulapally, Near Kompally, Medchal–Malkajgiri district, Secunderabad-500 100. Telangana, India",
      link: "https://www.google.com/maps/place/St.Martin's+Engineering+College/@17.541465,78.4719201,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb8ff57a807d8d:0x9922a435110db323!8m2!3d17.541465!4d78.474495!16s%2Fm%2F07k5bnh?authuser=0&entry=ttu"
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/20"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-primary/10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-6xl font-bold text-foreground mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className={`text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Contact us for any queries, questions, or ideas. We'd love to hear from you 
            and help you on your entrepreneurial journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h3 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    placeholder="John"
                    {...register("firstName", { required: "First name is required" })}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    placeholder="Doe"
                    {...register("lastName", { required: "Last name is required" })}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  placeholder="john@example.com"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  placeholder="How can we help you?"
                  {...register("subject", { required: "Subject is required" })}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
                  placeholder="Tell us about your idea or query..."
                  {...register("message", { required: "Message is required" })}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <Button type="submit" variant="hero-primary" size="lg" className="w-full">
                Send Message
                <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className={`transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  target={info.title === "Visit Us" ? "_blank" : undefined}
                  rel={info.title === "Visit Us" ? "noopener noreferrer" : undefined}
                  className="flex items-center p-4 rounded-lg bg-background/50 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="text-primary mr-4 group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {info.title}
                    </h4>
                    <p className="text-muted-foreground">{info.content}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Subscribe Section */}
            <Subscribe />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;