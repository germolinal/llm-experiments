'use client'
import styles from '../page.module.css'

import { Message } from '@/utils/types'
import NoMessages from './NoMessages'

function UserMsg ({ msg }: { msg: string }) {
  return (
    <div
      style={{
        display: 'flex'
      }}
    >
      <span style={{ flexGrow: 1 }}></span>
      <p
        style={{
          background: '#f4f4f4',
          width: 'fit-content',
          maxWidth: '500px',
          padding: '0.625rem 1.25rem',
          borderRadius: '1.5rem'
        }}
      >
        {msg}
      </p>
    </div>
  )
}

export default function MessagesBox ({
  msgs,
  appendMsg,
  context
}: {
  msgs: Message[]
  appendMsg: any
  context: string
}) {
  return (
    <div id='msgs' className={styles.msgs}>
      {msgs.length !== 0 &&
        msgs.map((m: Message, i: number) => {
          if (m.origin === 'user') {
            return <UserMsg key={i} msg={m.msg} />
          } else {
            return <p key={i}>{m.msg}</p>
          }
        })}
      {msgs.length === 0 && (
        <NoMessages context={context} appendMsg={appendMsg} />
      )}
    </div>
  )
}
