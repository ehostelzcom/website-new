import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
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
    <section id="contact" className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
            Contact Us
          </div>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent" data-testid="contact-title">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed" data-testid="contact-subtitle">
            Ready to transform your hostel management? Let's discuss how EHostelz can streamline your operations and boost efficiency.
          </p>
        </div>

        {/* Main Content - 12 Column Grid */}
        <div className="grid grid-cols-12 gap-8">
          {/* Contact Form - 8 columns on desktop */}
          <div className="col-span-12 lg:col-span-8">
            <Card className="shadow-2xl border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardContent className="p-8 lg:p-12">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">Send us a Message</h3>
                  <p className="text-muted-foreground">Fill out the form below and we'll get back to you within 24 hours.</p>
                </div>
                
                <form className="space-y-6" onSubmit={handleSubmit} data-testid="contact-form">
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 sm:col-span-6">
                      <Label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                        className="mt-2 h-12 border-2 focus:border-primary transition-colors"
                        data-testid="input-name"
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-6">
                      <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        required
                        className="mt-2 h-12 border-2 focus:border-primary transition-colors"
                        data-testid="input-email"
                      />
                    </div>
                  </div>
                  
                  {/* Phone Number */}
                  <div>
                    <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+92 300 1234567"
                      className="mt-2 h-12 border-2 focus:border-primary transition-colors"
                      data-testid="input-phone"
                    />
                  </div>
                  
                  {/* Message */}
                  <div>
                    <Label htmlFor="message" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your hostel management needs, number of properties, current challenges, or any specific questions you have..."
                      required
                      className="mt-2 border-2 focus:border-primary transition-colors resize-none"
                      data-testid="input-message"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg"
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300 shadow-lg hover:shadow-xl" 
                    disabled={isSubmitting}
                    data-testid="button-send"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Information - 4 columns on desktop */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Contact Info Card */}
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-6 text-center" data-testid="contact-info-title">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20" data-testid="contact-email">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <Mail className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Email</div>
                      <div className="text-primary text-sm">support@ehostelz.com</div>
                    </div>
                  </div>
                  <div className="flex items-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20" data-testid="contact-phone">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mr-4">
                      <Phone className="text-green-600 h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Phone</div>
                      <div className="text-green-600 text-sm">+92 300 1234567</div>
                    </div>
                  </div>
                  <div className="flex items-center p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20" data-testid="contact-address">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mr-4">
                      <MapPin className="text-orange-600 h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Office</div>
                      <div className="text-orange-600 text-sm">Lahore, Pakistan</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Business Hours Card */}
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4 text-center" data-testid="business-hours-title">
                  Business Hours
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50" data-testid="hours-weekdays">
                    <span className="font-medium text-sm">Mon - Fri</span>
                    <span className="text-sm text-muted-foreground">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50" data-testid="hours-saturday">
                    <span className="font-medium text-sm">Saturday</span>
                    <span className="text-sm text-muted-foreground">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50" data-testid="hours-sunday">
                    <span className="font-medium text-sm">Sunday</span>
                    <span className="text-sm text-red-500">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Immediate Help Card */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-primary to-blue-600 text-white">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-bold mb-2" data-testid="help-title">
                  Need Immediate Help?
                </h4>
                <p className="text-white/90 text-sm mb-6" data-testid="help-description">
                  Get instant support for urgent inquiries or technical assistance.
                </p>
                <Button variant="secondary" className="w-full bg-white text-primary hover:bg-white/90" data-testid="button-live-chat">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Start Live Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
