'use client'

import { useState } from 'react'
import styles from './page.module.css'
import { Hct } from '@material/material-color-utilities'
import * as ort from 'onnxruntime-web'

function genColor (hct: [number, number, number]) {
  //   const hct = genHCT()
  const color = Hct.from(hct[0], hct[1], hct[2])
  const argb = color.toInt()

  // Extract the RGB components from the ARGB value
  const r = (argb >> 16) & 0xff
  const g = (argb >> 8) & 0xff
  const b = argb & 0xff

  return `rgb(${r},${g},${b})`
}

function prepareData (): ort.Tensor {
  let aux = [Math.random(), Math.random(), Math.random()] //genHCT()
  let data = Float32Array.from(aux)
  return new ort.Tensor('float32', data, [1, 3])
}

function initSession (): Promise<ort.InferenceSession> {
  //   const Tensor = ort.Tensor
  const InferenceSession = ort.InferenceSession
  return InferenceSession.create('colour_palette.onnx')
}

type theme = {
  primary: string
  onPrimary: string
  secondary: string
  onSecondary: string
  tertiary: string
  onTertiary: string
  background: string
  error: string
}

type emailType = {
  from: string
  subject: string
  summary: string
}
const emails: emailType[] = [
  {
    from: 'Alice Bennett',
    subject: 'Quarterly Financial Review Meeting',
    summary:
      'Hi team, I would like to schedule a meeting to discuss our quarterly financial performance.'
  },
  {
    from: 'David Roberts',
    subject: 'New Project Proposal: Innovate 2025',
    summary:
      'Dear team, I have a proposal for a new project that aligns with our long-term innovation goals.'
  },
  {
    from: 'Sophia Green',
    subject: 'Client Feedback on Product X',
    summary:
      'Hello, I wanted to share some feedback we received from our clients regarding Product X.'
  },
  {
    from: 'Michael Clark',
    subject: 'Team Building Event: Escape Room Challenge',
    summary:
      "Hi all, I'm organizing a team-building event next Friday. Let's take on the Escape Room Challenge together!"
  },
  {
    from: 'Olivia Turner',
    subject: 'Upcoming Industry Conference: Speaker Lineup',
    summary:
      'Dear colleagues, I’ve attached the speaker lineup for the upcoming industry conference. Let’s discuss our attendance strategy.'
  },
  {
    from: 'James Wilson',
    subject: 'Strategic Planning Session: Vision 2030',
    summary:
      'Hi team, please join me for a strategic planning session where we’ll outline our Vision 2030 roadmap.'
  },
  {
    from: 'Emily Johnson',
    subject: 'Customer Experience Survey Results',
    summary:
      "Hello team, I’ve compiled the results from our latest customer experience survey. Let's review the key insights."
  },
  {
    from: 'Liam Harris',
    subject: 'IT System Upgrade: Scheduled Downtime',
    summary:
      'Hi everyone, please be informed that there will be scheduled downtime this weekend for our IT system upgrade.'
  }
]

function Email ({ theme, content }: { content: emailType; theme: theme }) {
  return (
    <li
      className={styles.email}
      style={{
        backgroundColor: theme.background
      }}
    >
      <div>
        <h1>{content.from}</h1>
        <p>{content.subject}</p>
        <small>{content.summary.slice(0, 30)}...</small>
      </div>
      <p style={{ flexGrow: 1 }}></p>
      <div>
        <span
          style={{
            color: theme.primary
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
            <path fill='none' d='M0 0h24v24H0z'></path>
            <path d='M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9v-2H4V8l8 5 8-5v5h2V6c0-1.1-.9-2-2-2zm-8 7L4 6h16l-8 5zm7 4 4 4-4 4v-3h-4v-2h4v-3z'></path>
          </svg>
        </span>
        <span
          style={{
            color: theme.error
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
            <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5-1-1h-5l-1 1H5v2h14V4h-3.5z'></path>
          </svg>
        </span>
      </div>
    </li>
  )
}

export default function Home () {
  const [theme, setTheme] = useState<theme>({
    primary: '#006587',
    onPrimary: 'white',
    secondary: '#4c626a',
    onSecondary: 'white',
    tertiary: 'green',
    onTertiary: 'black',
    background: '#fcfcff',
    error: 'rgb(186, 27, 26)'
  })

  return (
    <main className={styles.main}>
      <section className={styles.palette}>
        <button
          onClick={async () => {
            let session = await initSession()
            let input = prepareData()
            const res = await session.run(
              { 'onnx::Gemm_0': input },
              { logSeverityLevel: 0 }
            )

            // @ts-ignore
            const data = res['269']['cpuData']

            const roles = [
              'primary',
              'onPrimary',
              'secondary',
              'onSecondary',
              'tertiary',
              'onTertiary',
              'error',
              'background'
            ]

            let newT: any = {}
            roles.forEach((role, i) => {
              i *= 3
              newT[role] = genColor([
                data[i] * 360,
                data[i + 1] * 100,
                data[i + 2] * 100
              ])
            })
            setTheme(newT)
          }}
        >
          Generate Colours
        </button>

        <ul className={styles.pantone}>
          <li
            style={{ backgroundColor: theme.primary, color: theme.onPrimary }}
          >
            Primary 
          </li>
          <li
            style={{
              backgroundColor: theme.secondary,
              color: theme.onSecondary
            }}
          >
            Secondary
          </li>
          <li
            style={{ backgroundColor: theme.tertiary, color: theme.onTertiary }}
          >
            Tertiary
          </li>
          <li style={{ backgroundColor: theme.background, border: "1px solid gray" }}>Background</li>
          <li style={{ color: theme.error, border: `1px solid ${theme.error}` }}>Error</li>
        </ul>
      </section>

      <section
        className={styles.phone}
        style={{
          background: theme.background
        }}
      >
        <div
          className={styles.topbar}
          style={{
            backgroundColor: theme.primary,
            color: theme.onPrimary
          }}
        >
          <div>
            <span></span>
            <span></span>
          </div>
          <h1>Inbox</h1>
        </div>

        <ul className={styles.phonecontent}>
          {emails.map((m, i) => (
            <Email key={i} theme={theme} content={m}></Email>
          ))}
        </ul>

        <ul
          className={styles.bottombar}
          style={{
            backgroundColor: theme.secondary,
            color: theme.onSecondary
          }}
        >
          <li>
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
              <path d='M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 4.99L4 6h16zm0 12H4V8l8 5 8-5v10z'></path>
            </svg>
            <small>Inbox</small>
          </li>
          <li>
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
            <small>Compose</small>
          </li>
          <li>
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
              <path d='M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'></path>
            </svg>
            <small>Search</small>
          </li>
        </ul>
      </section>
    </main>
  )
}
