'use client'
import MessagesBox from './components/Message'
import TextInput from './components/TextInput'
import styles from './page.module.css'
import {  useState } from 'react'


import { Origin, Message } from '@/utils/types'



export default function Home () {
  const [msgs, setMsgs] = useState<Message[]>([])
  
  
  
  const appendMsg = (m: Message) => {
    setMsgs(prevMsgs => [...prevMsgs, m])
  }

  return (
    <main className={styles.main}>
      <div className={styles.chat}>
        <MessagesBox msgs={msgs} appendMsg={appendMsg} />
        <TextInput appendMsg={appendMsg} messages={msgs} />
      </div>
    </main>
  )
}
