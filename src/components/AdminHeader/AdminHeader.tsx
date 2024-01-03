import { Link } from 'react-router-dom'
import style from './AdminHeader.module.scss'

export const AdminHeader = () => {
  return (
    <header className={style.header}>
        <ul className={style.header__links}>
            <Link to='/admin/games'>
            <li className={style.header__link}>Игры</li>
            </Link>
            <li className={style.header__link}>Розыгрыши</li>
            <li className={style.header__link}>Слайдер</li>
            <Link to='/'>
            <li className={style.header__link}>Магазин</li></Link>
        </ul>
    </header>
  )
}

