import { Chat } from '../../components/Chat/Chat'
import style from './SupportPage.module.scss'

export const SupportPage = () => {
  return (
    <div className={style.page}>
      <Chat header={'Чат с поддержкой'} type={'user'}/>
    </div>
  )
}

