import styles from './page.module.css'

function Project ({
  title,
  description,
  link
}: {
  title: string
  description: string
  link: string
}) {
  return (
    <a href={link} style={{padding: "1em", paddingTop: "0"}}>
      <div className={styles.project}>
        <span>{title}</span>
        <span>{description}</span>
      </div>
    </a>
  )
}

export default function Home () {
  return (
    <div className={styles.projects}>
      <p>Conversational experiences</p>
      <div>
        <Project title='Chat' description='Talk to a machine' link='chat' />
      </div>
      

      <p>Small applications</p>
      <div>
        <Project
          title='Email app'
          description='Improve email apps, without writing'
          link='mailme'
        />
      </div>


      <p>Client-side AI</p>
      <div>
        <Project
          title='Colour palette generator'
          description='Demo of an on-device AI'
          link='palette'
        />
      </div>

      

    </div>
  )
}
