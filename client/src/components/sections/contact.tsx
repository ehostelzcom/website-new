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
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" data-testid="contact-title">
              Get in Touch
            </h2>
            <p className="text-xl text-muted-foreground" data-testid="contact-subtitle">
              Ready to transform your hostel management? Contact us today.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <form className="space-y-6" onSubmit={handleSubmit} data-testid="contact-form">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                    data-testid="input-email"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+92 300 1234567"
                    data-testid="input-phone"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your hostel management needs..."
                    required
                    data-testid="input-message"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                  data-testid="button-send"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4" data-testid="contact-info-title">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start" data-testid="contact-email">
                    <Mail className="text-primary mt-1 mr-3 h-5 w-5" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-muted-foreground">support@ehostelz.com</div>
                    </div>
                  </div>
                  <div className="flex items-start" data-testid="contact-phone">
                    <Phone className="text-primary mt-1 mr-3 h-5 w-5" />
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-muted-foreground">+92 300 1234567</div>
                    </div>
                  </div>
                  <div className="flex items-start" data-testid="contact-address">
                    <MapPin className="text-primary mt-1 mr-3 h-5 w-5" />
                    <div>
                      <div className="font-medium">Office</div>
                      <div className="text-muted-foreground">Lahore, Pakistan</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4" data-testid="business-hours-title">
                  Business Hours
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <div data-testid="hours-weekdays">Monday - Friday: 9:00 AM - 6:00 PM</div>
                  <div data-testid="hours-saturday">Saturday: 10:00 AM - 4:00 PM</div>
                  <div data-testid="hours-sunday">Sunday: Closed</div>
                </div>
              </div>
              
              <Card className="bg-muted/50">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2" data-testid="help-title">
                    Need immediate help?
                  </h4>
                  <p className="text-muted-foreground text-sm mb-4" data-testid="help-description">
                    For urgent technical support or sales inquiries, reach out to us directly.
                  </p>
                  <Button variant="secondary" size="sm" data-testid="button-live-chat">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Live Chat
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
