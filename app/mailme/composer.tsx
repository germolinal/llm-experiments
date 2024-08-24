import { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'
import { emailType } from './page'

export default function Composer ({
  openModal,
  closeModal,
  appendEmail
}: //   children,
{
  openModal: boolean
  closeModal: () => void
  //   children: React.ReactNode
  appendEmail: (e: emailType) => void
}) {
  const ref = useRef()
  const [subject, setSubject] = useState<string>('')
  const [content, setContent] = useState<string>('')
  useEffect(() => {
    if (openModal) {
      // @ts-ignore
      ref.current?.showModal()
    } else {
      // @ts-ignore
      ref.current?.close()
    }
  }, [openModal])

  return (
    // @ts-ignore
    <dialog className={styles.modal} ref={ref} onCancel={closeModal}>
      <div className={styles.composer}>
        <input
          type='text'
          id='subject'
          placeholder='Subject of your email'
          onKeyUp={(e: any) => {
            setSubject(e.target.value)
          }}
        ></input>
        <textarea
          id='content'
          onKeyUp={(e: any) => {
            setContent(e.target.value)
          }}
        ></textarea>
        <div className={styles.actions}>
          <button className={styles.cancel_email} onClick={closeModal}>
            Cancel
          </button>
          <button
            className={styles.send_email}
            onClick={async () => {
              if (subject.trim().length === 0 || content.trim().length === 0) {
                alert('Please fill all the data!')
              }
              await appendEmail({
                from: 'me@myself.com',
                subject,
                content
              })
              closeModal()
            }}
          >
            Send
          </button>
        </div>
      </div>
    </dialog>
  )
}
