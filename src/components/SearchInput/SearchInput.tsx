import styles from './SearchInput.module.scss'

import { ISearchInput } from './SearchInputTypes'

export const SearchInput = ({placeholder}: ISearchInput) => {
  return (
    <div className={styles.block}>   
        <input className={styles.input} type="text" placeholder={placeholder}/>
        <button className={styles.searchButton} />
    </div>

  )
}

