import styles from './page.module.css'

function Project ({
  title,
  description,
  link,
  requiresApiKey
}: {
  title: string
  description: string
  link: string
  requiresApiKey: boolean
}) {
  return (
    <li>
      <a href={link}>
        <div>
          <span>{title}</span>
          <span>{description}</span>
          <span>{requiresApiKey ? '*' : ''}</span>
        </div>
      </a>
    </li>
  )
}

export default function Home () {
  return (
    <ul className={styles.ul}>
      <Project
        title='Colour palette generator'
        description='asdasd'
        link='palette'
        requiresApiKey={true}
      />
    </ul>
  )
}
