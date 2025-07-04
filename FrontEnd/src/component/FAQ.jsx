const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={`border border-gray-200 rounded-xl overflow-hidden mb-6 ${isOpen ? 'pb-8 sm:pb-8' : ''}`}>
      <button
        onClick={onClick}
        className="w-full p-4 md:p-6 text-left flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-lg md:text-xl font-semibold text-gray-900">{question}</h3>
        <span className="text-blue-600 text-xl md:text-2xl">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="p-4 md:p-6 pt-3 md:pt-5 bg-white border-t border-gray-200">
          <p className="text-gray-600 pt-1 md:pt-2">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQItem;