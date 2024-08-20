'use client'
import styles from './page.module.css'
import { createContext, useState } from 'react'

const models = ['Gemini', 'GPT 3.5']
const DEFAULT_MODEL = models[0]
export const TopbarContext = createContext({ llm: DEFAULT_MODEL })

export function Topbar ({ children }: { children: React.ReactNode }) {
  const [llm, setLLM] = useState<string>(DEFAULT_MODEL)
  return (
    <TopbarContext.Provider value={{ llm }}>
      <nav className={styles.topbar}>
        <a href='/'>Home</a>
        <select
          onChange={e => {
            setLLM(e.target.value)
          }}
        >
          {models.map((m, i) => {
            return (
              <option value={m} key={i}>
                {m}
              </option>
            )
          })}
        </select>
      </nav>
      {children}
    </TopbarContext.Provider>
  )
}
