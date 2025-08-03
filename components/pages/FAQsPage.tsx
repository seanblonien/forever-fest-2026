const faqs = [
  {
    question: 'When is the wedding?',
    answer: 'Forever Fest 2026 - Date TBD',
  },
  {
    question: 'Where is the wedding?',
    answer: 'Location details coming soon...',
  },
  {
    question: 'What should I wear?',
    answer: 'Dress code information coming soon...',
  },
  {
    question: 'Will there be accommodations nearby?',
    answer: 'Hotel recommendations and booking information coming soon...',
  },
];

export default function FAQsPage() {
  return (
    <div className="w-full max-w-[600px] mx-auto text-center text-white pt-6 pb-12 px-2 md:px-0">
      <h1 className="text-4xl md:text-6xl mb-8 font-league-gothic">FAQs</h1>
      <div className="space-y-6">
        <p className="text-lg md:text-xl mb-12">
          Frequently asked questions about Forever Fest 2026
        </p>
        <div className="space-y-6 text-left">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl mb-3 font-league-gothic">{faq.question}</h3>
              <p className="text-lg">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
