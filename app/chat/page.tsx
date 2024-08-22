'use client'
import MessagesBox from './components/Message'
import TextInput from './components/TextInput'
import styles from './page.module.css'
import { useState } from 'react'

import { Message } from '@/utils/types'

const DEFAULT_CONTEXT = 'You are a helpful assistant'

export default function Home () {
  const [msgs, setMsgs] = useState<Message[]>([])
  const [context, setContext] = useState<string>('You are a helpful assistant')
  const appendMsg = (m: Message) => {
    setMsgs(prevMsgs => [...prevMsgs, m])
  }

  return (
    <main className={styles.main}>
      <div className={styles.chat}>
        <textarea
          style={{
            width: '100%',
            resize: 'none'
          }}
          id='context'
          placeholder={DEFAULT_CONTEXT}
          onChange={e => {
            let v = e.target.value.trim()
            setContext(v)
          }}
        ></textarea>
        <MessagesBox
          context={context && context.length > 0 ? context : DEFAULT_CONTEXT}
          msgs={msgs}
          appendMsg={appendMsg}
        />
        <TextInput
          context={context && context.length > 0 ? context : DEFAULT_CONTEXT}
          appendMsg={appendMsg}
          messages={msgs}
        />
      </div>
    </main>
  )
}
