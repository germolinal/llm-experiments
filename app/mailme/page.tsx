'use client'
import { useState } from 'react'
import { getCompletion } from '@/utils/llm'
import styles from './page.module.css'
import { useContext } from 'react'
import Composer from './composer'
import { TopbarContext } from '../topbar'

export type emailType = {
  from: string
  subject: string
  content: string
  actualSubject?: string
}

const defaultEmails: emailType[] = [
  {
    from: 'Alice Bennett',
    subject: 'Quarterly Financial Review Meeting',
    content:
      'Hi team, I would like to schedule a meeting to discuss our quarterly financial performance.',    
  }
]

function Email ({ email }: { email: emailType }) {
  return (
    <div className={styles.email}>
      <span>{email.from}</span>
      <div>
        <span>{email.actualSubject ? email.actualSubject : email.subject}</span>
        <span>{email.actualSubject ? email.subject : ""}</span>
      </div>

      <span>{email.content.slice(0, 30)}...</span>
    </div>
  )
}

export default function Mailme () {
  let { llm } = useContext(TopbarContext)
  const [composeMode, setComposeMode] = useState<boolean>(false)
  const [emails, setEmails] = useState<emailType[]>(defaultEmails)

  return (
    <div
      style={{
        display: 'flex'
      }}
    >
      <Composer
        openModal={composeMode}
        closeModal={() => setComposeMode(false)}
        appendEmail={async (m: emailType) => {
          m.actualSubject = await getCompletion(
            llm,
            'Your job is to read emails and replace their subjects by concise and direct sentences that clearly state the intent. For instance, changing subjects for sentences like "Probably spam", "A SaaS company offering a sales product" or "Mike wants to discuss Some Company\'s project". You will receive just the content of the email. Return only the suggested subject. Be reasonably sceptical and cinical of the intents of the sender.',
            m.content
          )
          console.log(m.actualSubject)
          setEmails(prevEmails => [...prevEmails, m])
        }}
      />
      <div style={{ paddingTop: '1em' }}>
        <span
          className={styles.composeButton}
          onClick={async () => {
            let n = !composeMode
            setComposeMode(n)
          }}
        >
          <svg
            stroke='currentColor'
            fill='currentColor'
            strokeWidth='0'
            viewBox='0 0 24 24'
            height='1em'
            width='1em'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path fill='none' d='M0 0h24v24H0V0z'></path>
            <path d='m14.06 9.02.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 0 0 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z'></path>
          </svg>
        </span>
      </div>
      <div style={{ flexGrow: '1' }}>
        {emails.map((m: emailType, i: number) => {
          return <Email email={m} key={i}></Email>
        })}
      </div>
    </div>
  )
}
