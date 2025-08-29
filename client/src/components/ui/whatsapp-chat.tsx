import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface WhatsAppChatProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

export default function WhatsAppChat({ 
  phoneNumber = "923001234567", // Default phone number - user can change this
  message = "Hi! I'm interested in EHostelz. Can you tell me more about your hostel management solution?",
  className = ""
}: WhatsAppChatProps) {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className={`fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ${className}`}
      size="icon"
      data-testid="whatsapp-chat-button"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="sr-only">Chat on WhatsApp</span>
    </Button>
  );
}