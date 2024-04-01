import React, { useState } from 'react';
import './App.css';
import { UserAnswers } from './userAnswers/userAnswers.tsx';

function App() {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div>
      <h1>My App</h1>
      <div>
        <button onClick={() => setActiveTab('tab1')}>Tab 1</button>
        <button onClick={() => setActiveTab('tab2')}>Tab 2</button>
      </div>
      <div>
        {activeTab === 'tab1' && <UserAnswers />}
      </div>
    </div>
  );
}

export default App;
