import { useState } from 'react';
import './TabNavigation.css';
import classNames from 'classnames';

// Write a component called Tabs that renders a tab-based navigation. It should receive an array of tabs as a prop,
// and each tab should be displayed as a button. When a tab is clicked, it should be highlighted as active, and its
// corresponding content should be displayed.
const TabNavigation = ({ tabs }) => {
  const [currentTab, setCurrentTab] = useState('1');

  const openTab = (id) => {
    setCurrentTab(id);
  }

  return (
    <div className="TabNavigation">
      <header>Tab Navigation</header>
      <div className="tabs">
        {tabs.map(tab => (
          <div key={tab.id}>
            <button className={classNames('tab', { 'active': currentTab === tab.id })} onClick={() => openTab(tab.id)}>{tab.title}</button>
          </div>
        ))}
      </div>
      <div className="content">{tabs.find(tab => tab.id === currentTab).content}</div>
    </div>
  );
}

export default TabNavigation;
