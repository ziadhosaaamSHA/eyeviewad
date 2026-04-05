'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    { q: "Do you guarantee results?", a: "We guarantee the inputs, the tracking, and the quality of execution. Our historical performance is exceptional, but any agency promising a specific ROAS before looking at your offer is lying." },
    { q: "What is the typical timeline?", a: "Onboarding takes 1 week. Assets and strategy are finalized by week 2. Campaigns launch by week 3. Full optimization phase begins month 2." },
    { q: "What should my marketing budget be?", a: "Our management fees scale with value, but typically we suggest at least $3k-$5k/mo purely in ad spend to gather meaningful data in the GCC." },
    { q: "Do you handle absolutely everything?", a: "We handle the digital strategy, content creation, production, website optimization, and paid traffic. If it touches your online revenue, we manage it." },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 px-6 md:px-12 bg-white max-w-4xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="ey-heading-lg md:text-[3.5rem] mb-4 text-gray-900">
                    FREQUENTLY ASKED <span className="text-brand-orange">QUESTIONS</span>
                </h2>
                <p className="ey-body text-gray-600">Everything you need to know about working with EYEVIEW.</p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, i) => (
                    <div
                        key={i}
                        className={`ey-card transition-all duration-300 overflow-hidden ${openIndex === i ? 'border-brand-orange bg-white shadow-[0_10px_30px_rgba(251,105,2,0.15)]' : 'border-gray-100 hover:border-gray-200 bg-white hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]'
                            }`}
                    >
                        <button
                            className="w-full flex items-center justify-between p-6 text-left"
                            onClick={() => toggleToggle(i)}
                        >
                            <span className="ey-heading-sm normal-case text-gray-900">{faq.q}</span>
                            {openIndex === i ? (
                                <Minus className="text-brand-orange w-5 h-5 flex-shrink-0" />
                            ) : (
                                <Plus className="text-gray-400 w-5 h-5 flex-shrink-0" />
                            )}
                        </button>
                        <div
                            className={`px-6 ey-body text-gray-600 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <p>{faq.a}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
