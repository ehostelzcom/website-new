import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // TODO: Implement actual form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We will get back to you soon.",
      });
      
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white" data-testid="contact-title">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" data-testid="contact-subtitle">
            Ready to transform your hostel management? Contact us today for a personalized demo.
          </p>
        </div>

        {/* Main Content - 12 Column Grid */}
        <div className="grid grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Contact Form - 7 columns */}
          <div className="col-span-12 lg:col-span-7">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 h-full">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Send us a Message</h3>
              <form className="space-y-6" onSubmit={handleSubmit} data-testid="contact-form">
                {/* Name and Email Row */}
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-6">
                    <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                      className="mt-1 h-11"
                      data-testid="input-name"
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                      className="mt-1 h-11"
                      data-testid="input-email"
                    />
                  </div>
                </div>
                
                {/* Phone Number */}
                <div>
                  <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="03129409211"
                    className="mt-1 h-11"
                    data-testid="input-phone"
                  />
                </div>
                
                {/* Message */}
                <div>
                  <Label htmlFor="message" className="text-gray-700 dark:text-gray-300">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your hostel management needs..."
                    required
                    className="mt-1 resize-none"
                    data-testid="input-message"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full h-12 text-base font-semibold" 
                  disabled={isSubmitting}
                  data-testid="button-send"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
          
          {/* Contact Information - 5 columns */}
          <div className="col-span-12 lg:col-span-5">
            {/* Contact Details */}
            <div className="mt-14">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white" data-testid="contact-info-title">
                Contact Information
              </h3>
                <div className="space-y-4">
                  <div className="flex items-start" data-testid="contact-email">
                    <Mail className="text-primary mt-1 mr-3 h-5 w-5" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Email</div>
                      <div className="text-gray-600 dark:text-gray-400">support@ehostelz.com</div>
                    </div>
                  </div>
                  <div className="flex items-start" data-testid="contact-phone">
                    <Phone className="text-primary mt-1 mr-3 h-5 w-5" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Phone</div>
                      <div className="text-gray-600 dark:text-gray-400">03129409211</div>
                    </div>
                  </div>
                  <div className="flex items-start" data-testid="contact-address">
                    <MapPin className="text-primary mt-1 mr-3 h-5 w-5" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Office</div>
                      <div className="text-gray-600 dark:text-gray-400">Islamabad, Pakistan</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Need Help */}
              <div className="bg-primary/10 rounded-lg p-6 mt-8">
                <div className="flex items-center mb-3">
                  <SiWhatsapp className="text-primary h-6 w-6 mr-2" />
                  <h4 className="font-semibold text-gray-900 dark:text-white" data-testid="help-title">
                    Need immediate help?
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4" data-testid="help-description">
                  For urgent technical support or sales inquiries, reach out to us directly.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full" 
                  onClick={() => window.open('https://wa.me/923129409211', '_blank')}
                  data-testid="button-live-chat"
                >
                  <SiWhatsapp className="mr-2 h-4 w-4" />
                  WhatsApp Chat
                </Button>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
