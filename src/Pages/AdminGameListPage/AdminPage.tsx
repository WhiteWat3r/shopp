import { Route, Routes } from 'react-router-dom'
import { AdminGamePage } from '../AdminGamePage/AdminGamePage'
import { AdminGameListPage } from '../../components/AdminGameListPage/AdminGameListPage'

export const AdminPage = () => {
  return (
    <>
      {/* <AdminHeader/> */}
      <Routes>
        <Route path='/games' element={<AdminGameListPage />}/>
        <Route path='/game/:gameId' element={<AdminGamePage />}/>
      </Routes>
    </>
  )
}
