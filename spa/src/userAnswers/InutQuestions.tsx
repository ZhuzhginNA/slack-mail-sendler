import React from 'react'
//import { Button } from '@qiwi/pijma-desktop'
import axios from 'axios'

export const InputQuestions: React.VFC = () => {
  const handleButtonClick = async () => {
    const text = 'Привет! Планируешь ли ты ехать на летний корпоратив?';
    try {
      const response = await axios.post(`http://localhost:3000/mail/sendMessageToAllUsers?text=${text}`)
      console.log('Nest Controller Response:', response.data)
      
    } catch (error) {
      console.error('Error calling Nest Controller:', error)
     
    }
  }
  return (
    <div>
      <button onClick={handleButtonClick}>Инициировать рассылку</button>
    </div>
  )
}