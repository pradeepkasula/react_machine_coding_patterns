const Tab = ({ label, id, activeTab, setActiveTab }) => {
  const handleClick = () => {
    setActiveTab(id);
  };

  // Check if this tab is the active one
  const isActive = activeTab === id;

  return (
    <div>
      <button
        onClick={handleClick}
        tabIndex={0}
        className={`tab-button ${isActive ? 'active' : ''}`}
      >
        {label}
      </button>
    </div>
  );
};

export default Tab;
