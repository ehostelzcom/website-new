import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do students need to register every time they move hostels?",
    answer: "No, students register once with their National ID and can join any hostel in the EHostelz network without re-registration."
  },
  {
    question: "Can I manage multiple hostels under one account?",
    answer: "Yes, our multi-hostel dashboard allows you to manage unlimited hostels from one login with separate dashboards for each property."
  },
  {
    question: "Do you provide detailed reports?",
    answer: "Yes, we provide comprehensive monthly reports covering fees, expenses, salaries, occupancy rates, and more with visual graphs and charts."
  },
  {
    question: "Is there a mobile app for students?",
    answer: "Yes, students have access to a dedicated portal where they can view their hostel history, payment records, room details, and more."
  },
  {
    question: "What kind of support do you provide?",
    answer: "We offer email support for Basic plans, priority support for Professional plans, and 24/7 phone support for Enterprise customers."
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleFAQ = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" data-testid="faq-title">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground" data-testid="faq-subtitle">
              Everything you need to know about EHostelz
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openItems.includes(index);
              return (
                <Card key={index} data-testid={`faq-item-${index}`}>
                  <button
                    className="w-full text-left p-6 focus:outline-none"
                    onClick={() => toggleFAQ(index)}
                    data-testid={`faq-button-${index}`}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-lg" data-testid={`faq-question-${index}`}>
                        {faq.question}
                      </h3>
                      <ChevronDown 
                        className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        data-testid={`faq-icon-${index}`}
                      />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6" data-testid={`faq-answer-${index}`}>
                      <p className="text-muted-foreground">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
