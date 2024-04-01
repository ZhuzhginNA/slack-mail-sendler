import React, { useEffect, useState } from 'react'
import { getAnswers } from './api'
import { IUserAnswers } from './userAnswersInteface'
import axios from 'axios';

export const UserAnswers: React.VFC<IUserAnswers> = () => {
  const [answers, setAnswers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAnswers = async (page) => {
    const pageSize = 10
    try {
      const response = await axios.get(`/mail/getAnswer?page=${page}&limit=${pageSize}`);
      setAnswers(response.data);
      //setTotalPages(response.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAnswers(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <h1>User Answers</h1>
      <ul>
        {answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous Page</button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next Page</button>
      </div>
    </div>
  );
};