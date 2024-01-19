import style from './ProfileOrdersPage.module.scss'

function ProfileOrdersPage() {
  return (
 
   
          <div>
            <ul className={style.lastSalesList}>
              <li>
                <a className={style.item}>
                    <img src="https://external-preview.redd.it/mSCJXZzbD3iA2MekSOFtXHhfp4zYQrUTVqO9ZyxGU_Y.png?auto=webp&s=42e333a7e0c3551ec0ec38ddb49bb93d9723ebb0" alt="" className={style.itemImg}/>
                  <p className={style.name}>Древние русы</p>
                  <p className={style.cost}>2000 Р</p>
                  <p className={style.data}>21.03.2023</p>
                </a>
              </li>
              <li>
                <a className={style.item}>
                    <img src="https://external-preview.redd.it/mSCJXZzbD3iA2MekSOFtXHhfp4zYQrUTVqO9ZyxGU_Y.png?auto=webp&s=42e333a7e0c3551ec0ec38ddb49bb93d9723ebb0" alt="" className={style.itemImg}/>
                  <p className={style.name}>Древние русы</p>
                  <p className={style.cost}>1488 Р</p>
                  <p className={style.data}>21.03.2009</p>
                </a>
              </li>
              <li>
                <a className={style.item}>
                    <img src="https://external-preview.redd.it/mSCJXZzbD3iA2MekSOFtXHhfp4zYQrUTVqO9ZyxGU_Y.png?auto=webp&s=42e333a7e0c3551ec0ec38ddb49bb93d9723ebb0" alt="" className={style.itemImg}/>
                  <p className={style.name}>Древние русы</p>
                  <p className={style.cost}>1899 Р</p>
                  <p className={style.data}>21.03.0000</p>
                </a>
              </li>
            </ul>
          </div>
  )
}

export default ProfileOrdersPage
