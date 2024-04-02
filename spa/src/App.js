import React, { useState } from 'react'
import './App.css'
import { UserAnswers } from './userAnswers/userAnswers.tsx'
import { InputQuestions } from './userAnswers/InutQuestions.tsx'

function App() {
  const [activeTab, setActiveTab] = useState('tab1')

  return (
    <div>
      <h1>My App</h1>
      <div>
        <button onClick={() => setActiveTab('tab1')}>История ответов</button>
        <button onClick={() => setActiveTab('tab2')}>Отправка вопросов</button>
      </div>
      <div>
        {activeTab === 'tab1' && <UserAnswers/>}
        {activeTab === 'tab2' && <div><InputQuestions/></div>}
      </div>
    </div>
  )
}


export default App
