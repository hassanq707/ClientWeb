const Tabs = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex">
        {children.map(child => (
          <button
            key={child.props.value}
            onClick={() => setActiveTab(child.props.value)}
            className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm flex items-center ${activeTab === child.props.value 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            {child.props.label}
            {child.props.count >= 0 && (
              <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${activeTab === child.props.value 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-800'}`}>
                {child.props.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

const Tab = ({ label, value, count }) => {
  return null; // This is just a placeholder for props
};

export { Tabs, Tab };