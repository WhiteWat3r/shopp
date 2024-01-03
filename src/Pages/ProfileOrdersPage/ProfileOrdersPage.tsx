import style from './ProfileOrdersPage.module.scss'

function ProfileOrdersPage() {
  return (
 
      <>
      <h1 className={style.mainHeader}>История заказов</h1>
          <div>
            <ul className={style.lastSalesList}>
              <li>
                <a className={style.item}>
                    <img src="https://images.stopgame.ru/blogs/2016/04/16/ZwssY68.jpg" alt="" className={style.itemImg}/>
                  <p className={style.name}>Древние русы</p>
                  <p className={style.cost}>2000 Р</p>
                  <p className={style.data}>21.03.2023</p>
                </a>
              </li>
              <li>
                <a className={style.item}>
                    <img src="https://onlyfans-info.ru/wp-content/uploads/2021/05/116594453_297184084884540_2919683908810668172_n.jpg" alt="" className={style.itemImg}/>
                  <p className={style.name}>Древние ываыва</p>
                  <p className={style.cost}>1488 Р</p>
                  <p className={style.data}>21.03.2009</p>
                </a>
              </li>
              <li>
                <a className={style.item}>
                    <img src="https://pro-prikoly.ru/wp-content/uploads/2020/02/274_1000.jpg" alt="" className={style.itemImg}/>
                  <p className={style.name}>Никита сильный</p>
                  <p className={style.cost}>1899 Р</p>
                  <p className={style.data}>21.03.0000</p>
                </a>
              </li>
            </ul>
          </div>
          </>
  )
}

export default ProfileOrdersPage
