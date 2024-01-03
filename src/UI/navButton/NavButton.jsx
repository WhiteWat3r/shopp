import React from 'react'
import styles from './NavButton.module.css'

function NavButton({children, ...props}) {
  return (
    <button className={styles.button}>
        {children}
    </button>
  )
}

export default NavButton
