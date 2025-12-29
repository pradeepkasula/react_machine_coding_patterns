import { useState } from 'react';
import Tab from './Tab';

const Tabs = () => {
  const tabsData = [
    { id: 1, label: 'Tab 1', content: 'Content for tab 1' },
    { id: 2, label: 'Tab 2', content: 'Content for tab 2' },
    { id: 3, label: 'Tab 3', content: 'Content for tab 3' },
  ];

  const [activeTab, setActiveTab] = useState(tabsData[0].id);

  // Find active content
  const activeContent = tabsData.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className='container'>
      <div>
        <div className='tabs-header'>
          {tabsData.map((tab) => (
            <Tab
              key={tab.id}
              label={tab.label}
              id={tab.id}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </div>
        <div className='tab-content'>{activeContent}</div>
      </div>
    </div>
  );
};

export default Tabs;
