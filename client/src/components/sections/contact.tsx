import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
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
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary/5 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" data-testid="contact-title">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed" data-testid="contact-subtitle">
            Ready to transform your hostel management? Let's connect and discuss how ehostelz.com can revolutionize your operations.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form - 2 columns */}
            <div className="lg:col-span-2">
              <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50 to-primary/5 dark:from-gray-800 dark:via-gray-750 dark:to-gray-700 p-8 shadow-2xl border-0 hover:shadow-3xl transition-all duration-500">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-xl opacity-30"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mr-4">
                      <Send className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Send us a Message</h3>
                  </div>
                  
                  <form className="space-y-6" onSubmit={handleSubmit} data-testid="contact-form">
                    {/* Name and Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 font-medium">Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          required
                          className="mt-2 h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-primary transition-colors"
                          data-testid="input-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          required
                          className="mt-2 h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-primary transition-colors"
                          data-testid="input-email"
                        />
                      </div>
                    </div>
                    
                    {/* Phone Number */}
                    <div>
                      <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300 font-medium">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="03129409211"
                        className="mt-2 h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-primary transition-colors"
                        data-testid="input-phone"
                      />
                    </div>
                    
                    {/* Message */}
                    <div>
                      <Label htmlFor="message" className="text-gray-700 dark:text-gray-300 font-medium">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your hostel management needs..."
                        required
                        className="mt-2 resize-none border-2 border-gray-200 dark:border-gray-600 focus:border-primary transition-colors"
                        data-testid="input-message"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      size="lg"
                      className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl" 
                      disabled={isSubmitting}
                      data-testid="button-send"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
            
            {/* Contact Information - 1 column */}
            <div className="flex flex-col h-full">
              {/* Contact Details Cards */}
              <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50 to-accent/5 dark:from-gray-800 dark:via-gray-750 dark:to-gray-700 p-6 shadow-2xl border-0 hover:shadow-3xl hover:-translate-y-1 transition-all duration-500 mb-6 flex-shrink-0">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-xl opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mr-3">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white" data-testid="contact-info-title">
                      Contact Info
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" data-testid="contact-email">
                      <Mail className="text-primary mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">Email</div>
                        <div className="text-gray-600 dark:text-gray-400">support@ehostelz.com</div>
                      </div>
                    </div>
                    <div className="flex items-start p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" data-testid="contact-phone">
                      <Phone className="text-primary mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">Phone</div>
                        <div className="text-gray-600 dark:text-gray-400">03129409211</div>
                      </div>
                    </div>
                    <div className="flex items-start p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" data-testid="contact-address">
                      <MapPin className="text-primary mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">Office</div>
                        <div className="text-gray-600 dark:text-gray-400">Islamabad, Pakistan</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* WhatsApp Card - Positioned at bottom */}
              <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-800 dark:via-gray-750 dark:to-green-900/20 p-6 shadow-2xl border-0 hover:shadow-3xl hover:-translate-y-1 transition-all duration-500 mt-auto">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full blur-xl opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center mr-3">
                      <SiWhatsapp className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-xl text-gray-900 dark:text-white" data-testid="help-title">
                      Quick Support
                    </h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed" data-testid="help-description">
                    Need immediate assistance? Connect with our team instantly for real-time support and quick solutions.
                  </p>
                  <Button 
                    className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl" 
                    onClick={() => window.open('https://wa.me/923129409211', '_blank')}
                    data-testid="button-live-chat"
                  >
                    <SiWhatsapp className="mr-2 h-5 w-5" />
                    WhatsApp Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
