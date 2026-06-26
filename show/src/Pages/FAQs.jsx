import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare, ShieldCheck, ShoppingBag, Truck } from 'lucide-react';

function FAQs() {
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
          a: "It's simple. On any product page, click 'Activate Try-On' and upload a clear, front-facing photo of yourself. Our AI automatically projects the garment onto your image, allowing you to see the drape and fit before you buy."
        },
        {
          q: "What photo works best for the Virtual Try-On?",
          a: "For the most realistic results, use a well-lit, front-facing photo with a plain background. Avoid wearing bulky clothing in your upload so the AI can accurately map the garment to your physique."
        }
      ]
    },
    {
      category: "Orders & Sizing",
      icon: <ShoppingBag className="text-neutral-900" size={18} />,
      questions: [
        {
          q: "What fabric standards do you use?",
          a: "We use premium-grade wash-and-wear fabrics and high-density cotton. They are engineered for wrinkle resistance, brilliant color, and maximum comfort."
        },
        {
          q: "How do I choose the right size?",
          a: "Check the size guide on each product page for chest, length, and shoulder measurements. For the best result, use our AI Try-On module to see how the size fits your body."
        }
      ]
    },
    {
      category: "Shipping & Tracking",
      icon: <Truck className="text-neutral-900" size={18} />,
      questions: [
        {
          q: "How long is the delivery?",
          a: "Local deliveries arrive in 2-3 days, while national shipments across Pakistan take 3-5 business days. You will receive tracking details via SMS and Email once dispatched."
        },
        {
          q: "Do you offer free shipping?",
          a: "Yes, we offer free standard delivery on all orders above PKR 3,000."
        }
      ]
    },
    {
      category: "Returns & Exchanges",
      icon: <ShieldCheck className="text-neutral-900" size={18} />,
      questions: [
        {
          q: "What is your exchange policy?",
          a: "We offer a 7-day hassle-free exchange policy. Items must be in their original, unused condition with all tags attached."
        },
        {
          q: "Can I open the package before paying (COD)?",
          a: "Standard courier guidelines do not allow opening packages before payment. However, once paid, you are fully protected by our 7-day exchange policy."
        }
      ]
    }
  ];

  let globalIndex = 0;

  return (
    <div className="bg-[#fcfcfc] min-h-screen text-neutral-900 w-full font-sans">
      
      {/* 1. HERO HEADER */}
      <div className="bg-white border-b border-neutral-100 py-16 sm:py-24 px-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium tracking-tight text-neutral-950 uppercase">
          Help Center
        </h1>
        <p className="mt-6 text-sm sm:text-base text-neutral-500 max-w-lg mx-auto font-light leading-relaxed">
          Need answers? Find details about our AI Try-On, orders, and shipping policies below.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        
        {/* 2. DYNAMIC ACCORDION */}
        <div className="space-y-12">
          {faqData.map((section, sIdx) => (
            <div key={sIdx} className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-neutral-200">
                {section.icon}
                <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-900">
                  {section.category}
                </h2>
              </div>

              <div className="space-y-3">
                {section.questions.map((item, qIdx) => {
                  const currentKey = globalIndex++;
                  const isOpen = activeIndex === currentKey;

                  return (
                    <div key={qIdx} className={`border border-neutral-100 bg-white transition-all duration-300 ${isOpen ? 'border-[#C19A6B]' : ''}`}>
                      <button
                        onClick={() => toggleAccordion(currentKey)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                      >
                        <span className={`text-sm font-medium transition ${isOpen ? 'text-[#C19A6B]' : 'text-neutral-900'}`}>
                          {item.q}
                        </span>
                        {isOpen ? <ChevronUp size={16} className="text-[#C19A6B]" /> : <ChevronDown size={16} />}
                      </button>

                      <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                        <div className="overflow-hidden">
                          <p className="px-6 pb-6 text-xs text-neutral-500 font-light leading-relaxed">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 3. SUPPORT FOLLOWER */}
        <div className="mt-20 bg-neutral-900 text-white p-8 rounded-sm text-center space-y-4">
          <MessageSquare className="mx-auto text-[#C19A6B]" size={24} />
          <h3 className="text-sm font-bold uppercase tracking-widest">Still have a query?</h3>
          <p className="text-xs text-neutral-400 font-light max-w-sm mx-auto">
            Our fashion support team is ready to help you with sizes, styling, or system navigation.
          </p>
          <div className="pt-4">
            <span className="text-[10px] font-bold text-[#C19A6B] bg-neutral-800 border border-neutral-700 px-6 py-3 rounded-sm font-mono">
              HELPLINE: SUPPORT@TRYLO.COM
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default FAQs;