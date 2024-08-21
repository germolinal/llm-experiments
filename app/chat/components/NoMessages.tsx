'use client'
import { getChat } from '@/utils/llm' // I need this to run on backend
import styles from '../page.module.css'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { TopbarContext } from '../../topbar'
import { Message } from '@/utils/types'
const prompts = [
  'What colour is the sun?',
  '42 is the answer to life, the universe and everything. Why?',
  'What can you help me with?',
  'What are the Big 4 companies?',
  'What is the currency of Japan?',
  'What is the fastest land animal?'
]

// get random prompts
function getPrompts (n: number): string[] {
  if (n > prompts.length) {
    n = prompts.length
  }
  let selected: string[] = []
  while (selected.length < n) {
    const i = Math.round(Math.random() * (prompts.length - 1))
    const p = prompts[i]
    if (!selected.includes(p)) {
      selected.push(p)
    }
  }
  return selected
}

export default function NoMessages ({ appendMsg, context }: { appendMsg: any, context: string }) {
  const [randomPrompts, setPrompts] = useState<string[]>([])
  let { llm } = useContext(TopbarContext)
  useEffect(() => {
    setPrompts(getPrompts(4))
  }, [])

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <ul className={styles.promptlist}>
        {randomPrompts.map((p: string, i: number) => {
          return (
            <li
              key={i}
              onClick={() => {
                appendMsg({
                  origin:"user",
                  msg: p
                })
                getChat(llm, context, p, []).then((res: Message) => {
                  appendMsg(res)
                })
              }}
            >
              <span>{p}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
