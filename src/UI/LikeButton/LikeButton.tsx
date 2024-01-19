import classNames from 'classnames'
import style from './LikeButton.module.scss'
import { ILikeButton } from './LikeButtonTypes'

export const LikeButton = ({children, onClick, active, type, isDisabled}: ILikeButton) => {
  return (
    <button type={type} onClick={onClick} className={classNames(style.likeBtn, active && style.likeBtn_active)} disabled={isDisabled}>
      {children}
    </button>
  )
}

