'use client'
import styles from './page.module.css'
import { createContext, useState } from 'react'

import { LLM, llms } from '../utils/ai_providers'
const DEFAULT_MODEL = llms[0]
export const TopbarContext = createContext({ llm: DEFAULT_MODEL })

export function Topbar ({ children }: { children: React.ReactNode }) {
  const [llm, setLLM] = useState<LLM>(DEFAULT_MODEL)
  return (
    <TopbarContext.Provider value={{ llm }}>
      <nav className={styles.topbar}>
        <a href='/'>Home</a>
        <select
          onChange={e => {
            setLLM(e.target.value as LLM)
          }}
        >
          {llms.map((m, i) => {
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
