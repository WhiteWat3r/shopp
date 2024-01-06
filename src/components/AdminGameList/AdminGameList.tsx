import { useEffect, useState } from 'react';
import style from './AdminGameList.module.scss'
import ReactPaginate from 'react-paginate'
import { IGame } from '../../services/gameTypes';
import { Link } from 'react-router-dom';
import { iAdminGameList } from './AdminGameListTypes';
import { AdminGameItem } from '../AdminGameItem/AdminGameItem';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";


const PER_PAGE = 12;


export const AdminGameList = ({allGames}: iAdminGameList) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState<IGame[]>([]);



  useEffect(() => {
    setData(allGames);
  }, [allGames]);



    const offset = currentPage * PER_PAGE;
    const currentPageData = data
      ?.slice(offset, offset + PER_PAGE)
      .map((item) => (
        <AdminGameItem  item={item} key={item.id}/>
      ));
  
    const pageCount = Math.ceil(data?.length / PER_PAGE);
  
    function handlePageClick({ selected: selectedPage }: {selected: number}) {
      setCurrentPage(selectedPage);
    }

  return (
    <>
      <ul className={style.list}>
        {currentPageData}
      </ul>

      <ReactPaginate
        previousLabel={<FaLongArrowAltLeft size={25}/>}
        nextLabel={<FaLongArrowAltRight size={25}/>}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={style.pagination}
        previousLinkClassName={style.pagination__link}
        nextLinkClassName={style.pagination__link}
        disabledClassName={style.pagination__link_disabled}
        activeClassName={style.pagination__link_active}
        // breakAriaLabels={{ forward: 'Jump forward', backward: 'Jump backward' }}
        pageLinkClassName={style.pagination__link_default}

        previousClassName={style.pagination__button}
        nextClassName={style.pagination__button}

      />
    </>
  )
}

