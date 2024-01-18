import classNames from 'classnames'
import style from './LikeButton.module.scss'

export const LikeButton = ({children, onClick, active, type, isDisabled}) => {
  return (
    <button type={type} onClick={onClick} className={classNames(style.likeBtn, active && style.likeBtn_active)} disabled={isDisabled}>
      {children}
    </button>
  )
}

