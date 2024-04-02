import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, Flex, Block, Box} from '@qiwi/pijma-desktop'

export const UserAnswers: React.VFC = () => {
  const [answers, setAnswers] = useState<any>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchAnswers = async (page) => {
    const pageSize: number = 10
    try {
      const response = await axios.get(`http://localhost:3000/mail/getAnswers?page=${page}&limit=${pageSize}`)
      setAnswers(response.data)
      setTotalPages(response.data.totalPages)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchAnswers(currentPage)
  }, [currentPage])

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  };

  return (
    <Flex  justify='space-between'  direction='column' >
        <Grid>
        <Flex direction='row'  >
                <Block>
                    <Box height={'50px'} width={'200px'}>
                        <p>Имя</p>
                    </Box>
                </Block>
                <Block>
                <Box height={'50px'} width={'200px'}>
                <p>Email</p>
                    </Box>
                </Block>
                <Block>
                <Box height={'50px'} width={'200px'}>
                <p>Вопрос</p>
                    </Box>
                </Block>
                <Block>
                <Box height={'50px'} width={'200px'}>
                <p>Ответ</p>
                    </Box>
                </Block>
                </Flex>
        {answers.map((answer) => (
            
                <Flex direction='row'  >
                <Block>
                    <Box height={'80px'} width={'200px'}>
                        {answer.name}
                    </Box>
                </Block>
                <Block>
                <Box height={'80px'} width={'200px'}>
                        {answer.email}
                    </Box>
                </Block>
                <Block>
                <Box height={'80px'} width={'200px'}>
                        {answer.answers[0]?.text || 'Данных пока нет'}
                    </Box>
                </Block>
                <Block>
                <Box height={'80px'} width={'200px'}>
                        {answer.answers[0]?.question.text || 'Данных пока нет'}
                    </Box>
                </Block>
                </Flex>
        ))}
        </Grid>
      

      <Flex align='start'>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous Page</button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next Page</button>
      </Flex>
    </Flex>
  )
}