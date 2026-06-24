import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare, ShieldCheck, ShoppingBag, Truck } from 'lucide-react';

function FAQs() {
  // State to track which accordion tab is active
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      category: "Virtual Try-On",
      icon: <HelpCircle className="text-[#C19A6B]" size={18} />,
      questions: [
        {
          q: "How does the TryLo Virtual Try-On feature work?",
          a: "It is extremely simple! Browse to any product page, click on the 'Activate Try-On' button, and upload a clear, front-facing, full-length or half-body photograph of yourself. Our built-in AI will automatically render and project the 2D garment onto your profile picture so you can visually evaluate the drape and look before checking out."
        },
        {
          q: "What type of photo works best for the  Virtual Try-On?",
          a: "For the most accurate photorealistic results, upload a well-lit, front-facing image with minimal background clutter. Avoid bulky clothes in your profile photo so the AI model can perfectly map the structural constraints of our premium apparel onto your physique."
        }
      ]
    },
    {
      category: "Orders & Sizing",
      icon: <ShoppingBag className="text-blue-600" size={18} />,
      questions: [
        {
          q: "What fabric standards do you use for Eastern Wear?",
          a: "Our premium Eastern collection utilizes premium-grade Wash & Wear fabrics and high-density combed cotton threads. They are specifically engineered to offer crisp wrinkles resistance, brilliant color retention, and maximum breathing metrics for everyday comfort."
        },
        {
          q: "How do I select my perfect size variant?",
          a: "Every product page features an explicit size guide with chest, length, and shoulder parameters. Additionally, you can utilize our interactive styling assistant chatbot or try the item virtually via the AI Try-On module to lock in your exact fit preferences."
        }
      ]
    },
    {
      category: "Shipping & Tracking",
      icon: <Truck className="text-emerald-600" size={18} />,
      questions: [
        {
          q: "What are your standard delivery timelines?",
          a: "Local shipments within our core hubs take 2 to 3 working days. For nationwide standard shipping across Pakistan, it takes 3 to 5 business days. Real-time tracking IDs are routed automatically via SMS and Email post-dispatch."
        },
        {
          q: "Do you offer Free Shipping?",
          a: "Yes! We provide Free Standard Delivery on all orders valued above PKR 3,000. For orders below this threshold, a flat delivery fee is systemically computed at checkout."
        }
      ]
    },
    {
      category: "Returns & Exchanges",
      icon: <ShieldCheck className="text-purple-600" size={18} />,
      questions: [
        {
          q: "What is your exchange window policy?",
          a: "TryLo offers a secure 7-day hassle-free exchange and return policy from the exact date of shipment receipt. Items must be completely pristine, unworn, unwashed, and intact with all original factory tags attached."
        },
        {
          q: "Can I open the Cash on Delivery (COD) package before paying?",
          a: "According to strict courier logistics guidelines, packages cannot be opened or checked prior to executing the outstanding payment to the dispatch agent. However, once paid, you are completely secure under our 7-day exchange protocol if any sizing issue arises."
        }
      ]
    }
  ];

  // Flattening dataset to create unique tracking keys for accordion mechanics
  let globalIndex = 0;

  return (
    <div className="bg-white min-h-screen font-sans antialiased text-gray-800 w-full overflow-x-hidden">
      
      {/* 1. HERO HEADER */}
      <div className="bg-gray-50 border-b border-gray-100 py-12 px-4 sm:px-6 md:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 uppercase">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Got questions about your fit, order dispatch tracking, or how our Virtual Try-On Room functions? Find all your answers sorted beautifully below.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-16">
        
        {/* 2. DYNAMIC FAQS ACCORDION LAYOUT WRAPPER */}
        <div className="space-y-10">
          {faqData.map((section, sIdx) => (
            <div key={sIdx} className="space-y-4">
              
              {/* Category Divider Header */}
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                {section.icon}
                <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
                  {section.category}
                </h2>
              </div>

              {/* Accordion List for Current Category */}
              <div className="space-y-3">
                {section.questions.map((item, qIdx) => {
                  const currentKey = globalIndex++;
                  const isOpen = activeIndex === currentKey;

                  return (
                    <div 
                      key={qIdx} 
                      className={`border rounded-xl transition duration-200 overflow-hidden ${
                        isOpen ? 'border-[#C19A6B] bg-amber-50/10 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      {/* Trigger Header */}
                      <button
                        type="button"
                        onClick={() => toggleAccordion(currentKey)}
                        className="w-full px-5 py-4 flex items-center justify-between text-left font-medium text-sm sm:text-base text-gray-900 focus:outline-none"
                      >
                        <span className={isOpen ? "text-[#C19A6B] font-bold" : "text-gray-800"}>
                          {item.q}
                        </span>
                        <span className="text-gray-400 shrink-0 ml-4">
                          {isOpen ? <ChevronUp size={18} className="text-[#C19A6B]" /> : <ChevronDown size={18} />}
                        </span>
                      </button>

                      {/* Collapsible Content Area */}
                      <div 
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          isOpen ? 'max-h-[500px] border-t border-gray-100' : 'max-h-0'
                        }`}
                      >
                        <p className="px-5 py-4 text-xs sm:text-sm text-gray-600 leading-relaxed bg-white">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

        {/* 3. STILL NEED HELP FOLLOWER BLOCK */}
        <div className="mt-16 bg-gray-50 rounded-2xl border border-gray-100 p-6 text-center space-y-3">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <MessageSquare size={20} />
          </div>
          <h3 className="text-base font-bold text-gray-900">Still have a query in mind?</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Our specialized fashion support helpline is available to guide you through sizes, combo styling, and system navigation.
          </p>
          <div className="pt-2">
            <span className="text-xs font-bold text-[#C19A6B] bg-white border px-4 py-2 rounded-lg shadow-sm font-mono">
              Helpline: support@trylo.com
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default FAQs;