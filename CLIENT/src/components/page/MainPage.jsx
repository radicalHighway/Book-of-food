
import RecieptCard from '../widgets/RecieptCard'

import React, { useEffect, useState } from 'react'
import axiosInstance from '../shared/lib/axiosInstance';


export default function MainPage() {

  const [reciepts, setReciepts] = useState([])

  console.log(reciepts);
  
  useEffect(() => {
      const getRecipts = async () =>
          { const allReciepts = await axiosInstance.get('/reciepts/')
              setReciepts(allReciepts.data)
          } 
      getRecipts()
  }, [])

  return (
    <>
   {reciepts.map((el) =><RecieptCard reciept={el} key={el.id}/>)}
   </>
  )
}
