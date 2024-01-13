import style from './LikeButton.module.scss'

export const LikeButton = ({children, onClick, active, type, isDisabled}) => {
  return (
    <button type={type} onClick={onClick} className={style.likeBtn} disabled={isDisabled}>
      {children}
    </button>
  )
}

