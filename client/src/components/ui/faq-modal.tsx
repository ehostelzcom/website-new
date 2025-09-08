import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Search, Users, CreditCard, Star, Building2, MapPin, Settings } from "lucide-react";

interface FAQModalProps {
  children: React.ReactNode;
}

const faqCategories = [
  {
    category: "Hostel Search & Discovery",
    icon: <Search className="w-4 h-4" />,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    faqs: [
      {
        question: "How do I find hostels in my preferred location?",
        answer: "Use our advanced search feature on the homepage. Select your province, then city, and finally your preferred location. You can filter by hostel type (Boys/Girls), view ratings, and see real-time availability. Each hostel card shows detailed information including contact details, ratings, and reviews."
      },
      {
        question: "What information can I see about each hostel?",
        answer: "Each hostel card displays: Hostel name and type, location with full address, contact phone number, average rating with review count, current availability status, and high-quality photos. Click on review counts to see detailed user feedback and experiences."
      },
      {
        question: "How accurate are the ratings and reviews?",
        answer: "All ratings come from verified students who have actually stayed at the hostels. Our system calculates real-time averages and displays half-star precision (like 4.8/5.0). Reviews include detailed comments about facilities, food, management, and overall experience."
      },
      {
        question: "Can I see available seats before contacting a hostel?",
        answer: "Yes! Click the 'Check Availability' button on any hostel card to see real-time vacant seats information. This helps you know availability before making contact, saving time for both you and the hostel management."
      }
    ]
  },
  {
    category: "Student Login & Authentication",
    icon: <Users className="w-4 h-4" />,
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    faqs: [
      {
        question: "How do I create a student account?",
        answer: "Click 'Student Login' in the header, then select 'Create Account'. You'll need to provide your CNIC, mobile number, email, and basic information. Once registered, hostel management can assign you to their facility and you'll gain access to the student dashboard."
      },
      {
        question: "What can I do in my student dashboard?",
        answer: "Your dashboard provides: Real-time hostel information and status, fee management with payment history, upcoming dues and payment reminders, room allocation details, hostel rules and announcements, contact information for management, and the ability to rate and review your hostel experience."
      },
      {
        question: "I forgot my password, how can I recover it?",
        answer: "Use the 'Change Password' option in your profile dropdown, or contact your hostel management. They can help reset your credentials. Always keep your login information secure and don't share it with others."
      },
      {
        question: "Can I access my account from multiple devices?",
        answer: "Yes, you can login from any device with internet access. Your account syncs across all devices, so you can check fees on your phone and make payments on your computer. Just ensure you logout from shared or public computers."
      }
    ]
  },
  {
    category: "Fee Management & Payments",
    icon: <CreditCard className="w-4 h-4" />,
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    faqs: [
      {
        question: "How do I view my fee details and payment history?",
        answer: "Go to the 'Fees' section in your dashboard. You'll see: Current month dues, payment history with dates and amounts, upcoming payment deadlines, late fee calculations if applicable, and downloadable receipts for all transactions. Everything is organized by month and year for easy tracking."
      },
      {
        question: "What payment methods are accepted?",
        answer: "We support multiple payment methods: Online banking transfers, credit/debit card payments, mobile wallet payments (JazzCash, Easypaisa), and bank deposit options. All online payments are secure and provide instant confirmation with digital receipts."
      },
      {
        question: "How do I make online payments?",
        answer: "Visit the 'Payments' section, select your outstanding dues, choose your preferred payment method, and complete the secure transaction. You'll receive instant confirmation and a digital receipt. The payment status updates immediately in your dashboard."
      },
      {
        question: "What happens if I miss a payment deadline?",
        answer: "The system automatically calculates late fees based on hostel policy. You'll see updated amounts in your dashboard and receive notifications. Contact your hostel management immediately to discuss payment plans and avoid any accommodation issues."
      },
      {
        question: "Can I set up payment reminders?",
        answer: "Yes, the system sends automatic SMS and email reminders before due dates. You can also enable push notifications. This helps ensure you never miss a payment deadline and avoid late fees."
      }
    ]
  },
  {
    category: "Rating & Review System",
    icon: <Star className="w-4 h-4" />,
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    faqs: [
      {
        question: "How do I rate and review my hostel?",
        answer: "Go to the 'Rating' section in your dashboard. You can rate different aspects: Overall experience (1-5 stars), food quality, room cleanliness, staff behavior, facilities, and internet connectivity. Add detailed comments to help future students make informed decisions."
      },
      {
        question: "Can I update my review after posting it?",
        answer: "Yes, you can edit your review anytime from your dashboard. This is helpful if the hostel improves services or if you want to add more details about your experience. Updated reviews help maintain accurate information for other students."
      },
      {
        question: "Are my reviews anonymous?",
        answer: "Reviews show only your first name and are verified as 'Verified Student'. This provides authenticity while maintaining reasonable privacy. Your detailed contact information is never displayed publicly with reviews."
      },
      {
        question: "How do reviews help other students?",
        answer: "Your honest feedback helps prospective students understand: Real living conditions, food quality and timing, management responsiveness, cleanliness standards, internet and facility quality, and overall value for money. This creates a transparent community."
      }
    ]
  },
  {
    category: "Hostel Management Features",
    icon: <Building2 className="w-4 h-4" />,
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    faqs: [
      {
        question: "How does multi-hostel management work?",
        answer: "Hostel owners can manage multiple properties from a single dashboard. They can: Track occupancy across all locations, manage fees and payments centrally, monitor reviews and ratings, handle staff assignments, and generate consolidated reports. Each hostel maintains its unique identity while benefiting from centralized management."
      },
      {
        question: "How are room allocations handled?",
        answer: "The system tracks: Available rooms by type and capacity, student assignments with move-in/move-out dates, room condition and maintenance schedules, and occupancy optimization. Management can easily reassign rooms, track vacancies, and plan capacity."
      },
      {
        question: "What kind of reports are available?",
        answer: "Management gets comprehensive analytics: Monthly revenue and collection reports, occupancy rates and trends, student satisfaction scores, payment default analysis, facility utilization statistics, and comparative performance across multiple hostels if applicable."
      }
    ]
  },
  {
    category: "Technical Support & General",
    icon: <Settings className="w-4 h-4" />,
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    faqs: [
      {
        question: "How do I request a demo of the platform?",
        answer: "Click 'Request Demo' in the header and fill out the form with your hostel details. Our team will contact you within 24 hours to schedule a personalized demonstration. The demo covers all features relevant to your specific needs and requirements."
      },
      {
        question: "Is my personal and financial data secure?",
        answer: "Absolutely. We use industry-standard encryption for all data transmission and storage. Payment processing follows PCI DSS compliance standards. Your personal information is never shared with third parties without explicit consent, and we regularly update our security measures."
      },
      {
        question: "What devices and browsers are supported?",
        answer: "Our platform works on: All modern web browsers (Chrome, Firefox, Safari, Edge), mobile phones and tablets (iOS and Android), desktop and laptop computers, and has responsive design that adapts to any screen size. No app downloads required - everything works in your browser."
      },
      {
        question: "How do I get technical support?",
        answer: "Multiple support channels are available: WhatsApp chat button for instant help, contact form on our website, email support with 24-hour response time, and phone support during business hours. For urgent issues, use WhatsApp for the fastest response."
      },
      {
        question: "Can I suggest new features or improvements?",
        answer: "Yes! We actively listen to user feedback. Use the contact form, WhatsApp chat, or email to suggest features. Many current platform features came directly from user suggestions. We regularly update the system based on community needs."
      }
    ]
  }
];

export default function FAQModal({ children }: FAQModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredFAQs = activeCategory === "all" 
    ? faqCategories 
    : faqCategories.filter(cat => cat.category === activeCategory);

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {children}
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-5xl w-full max-h-[85vh] p-0 overflow-hidden flex flex-col" data-testid="faq-modal">
          <DialogHeader className="flex-shrink-0 p-6 pb-4 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#004e89] to-[#0066cc] rounded-full flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Frequently Asked Questions
                </DialogTitle>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Everything you need to know about using ehostelz.com platform
                </p>
              </div>
            </div>
          </DialogHeader>

          <div className="flex flex-col md:flex-row flex-1 min-h-0">
            {/* Category Filter Sidebar */}
            <div className="w-full md:w-64 flex-shrink-0 p-4 border-r border-gray-200/50 dark:border-gray-700/50 bg-gray-50/30 dark:bg-gray-800/30">
              <div className="space-y-2">
                <Button
                  variant={activeCategory === "all" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveCategory("all")}
                  className="w-full justify-start text-left"
                  data-testid="faq-category-all"
                >
                  All Categories
                </Button>
                {faqCategories.map((category) => (
                  <Button
                    key={category.category}
                    variant={activeCategory === category.category ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveCategory(category.category)}
                    className="w-full justify-start text-left text-xs"
                    data-testid={`faq-category-${category.category.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      {category.icon}
                      <span className="truncate">{category.category}</span>
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* FAQ Content */}
            <div className="flex-1 flex flex-col min-h-0">
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                  {filteredFAQs.map((category) => (
                    <div key={category.category} className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge className={category.color}>
                          {category.icon}
                          <span className="ml-2 font-semibold">{category.category}</span>
                        </Badge>
                      </div>
                      
                      <Accordion type="single" collapsible className="space-y-2">
                        {category.faqs.map((faq, index) => (
                          <AccordionItem
                            key={index}
                            value={`${category.category}-${index}`}
                            className="border border-gray-200/60 dark:border-gray-700/60 rounded-lg px-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                            data-testid={`faq-item-${category.category.toLowerCase().replace(/\s+/g, '-')}-${index}`}
                          >
                            <AccordionTrigger className="text-left hover:no-underline py-4">
                              <span className="font-medium text-gray-900 dark:text-white pr-4">
                                {faq.question}
                              </span>
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-700 dark:text-gray-300 pb-4 leading-relaxed">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Fixed Footer */}
              <div className="flex-shrink-0 p-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800/50 dark:to-gray-900/50">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#004e89] to-[#0066cc] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <HelpCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white">
                        Still have questions?
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        We're here to help you get started
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="default"
                      size="default"
                      onClick={() => {
                        setIsOpen(false);
                        setTimeout(() => {
                          const element = document.getElementById('contact');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 100);
                      }}
                      className="bg-[#004e89] hover:bg-[#003a6b] text-white px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
                      data-testid="faq-contact-us"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Contact Us
                    </Button>
                    <Button
                      variant="outline"
                      size="default"
                      onClick={() => {
                        setIsOpen(false);
                        window.open('https://wa.me/923129409211?text=Hi%2C%20I%20need%20help%20with%20ehostelz.com', '_blank');
                      }}
                      className="border-2 border-[#25d366] text-[#25d366] hover:bg-[#25d366] hover:text-white px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
                      data-testid="faq-whatsapp-us"
                    >
                      💬 WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}