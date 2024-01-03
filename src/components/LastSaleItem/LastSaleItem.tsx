import style from './LastSaleItem.module.scss'


function LastSaleItem() {
  return (
    <>
      <li className={style.lastSaleItem}>
        <img
          className={style.img}
          src="https://cdn1.epicgames.com/offer/135201128d4f428699a891fc501a5097/EGS_Scorn_EbbSoftwaredoo_S1_2560x1440-b958f07bf097c78b100af56b0dd0c833"
          alt=""
        />
        <div className={style.info}>
          <p>Scorn</p>
          <p>1320 Р</p>
        </div>
        <div className={style.discount}>-24%</div>
      </li>
      <li className={style.lastSaleItem}>
        <img
          className={style.img}
          src="https://cdn1.epicgames.com/offer/135201128d4f428699a891fc501a5097/EGS_Scorn_EbbSoftwaredoo_S1_2560x1440-b958f07bf097c78b100af56b0dd0c833"
          alt=""
        />
        <div className={style.info}>
          <p>Scorn</p>
          <p>1320 Р</p>
        </div>
        <div className={style.discount}>-24%</div>
      </li>
      <li className={style.lastSaleItem}>
        <img
          className={style.img}
          src="https://cdn1.epicgames.com/spt-assets/177dc72233934ac487abd83b01587086/spirit-of-the-north-offer-mznb7.jpg"
          alt=""
        />
        <div className={style.info}>
          <p>Spirit of the North</p>
          <p>680 Р</p>
        </div>
        <div className={style.discount}>-20%</div>
      </li>
      <li className={style.lastSaleItem}>
        <img
          className={style.img}
          src="https://ixbt.online/live/images/original/16/77/13/2023/09/01/03d245c14a.jpg"
          alt=""
        />
        <div className={style.info}>
          <p>Starfield</p>
          <p>2999 Р</p>
        </div>
        <div className={style.discount}>-5%</div>
      </li>
      <li className={style.lastSaleItem}>
        <img
          className={style.img}
          src="https://gaming-cdn.com/images/products/4824/orig/elden-ring-pc-game-steam-europe-cover.jpg?v=1693544549"
          alt=""
        />
        <div className={style.info}>
          <p>Elden Ring</p>
          <p>390 Р</p>
        </div>
        <div className={style.discount}>-24%</div>
      </li>
      </>
  );
}

export default LastSaleItem;
