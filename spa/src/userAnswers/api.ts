import axios from 'axios'

export const getAnswers = async (page: number): Promise<any> => {
  const pageSize = 10
  const offset = (page - 1) * pageSize

  try {
        const response = await axios.get(`/mail/getAnswer?page=${page}&limit=${pageSize}`)
        
        const users = response.data
        console.log(users)
    } catch (error) {
        
        console.error(error)
    }
};