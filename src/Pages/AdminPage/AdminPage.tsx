import { Route, Routes } from 'react-router-dom'
import { AdminHeader } from '../../components/AdminHeader/AdminHeader'
import { AdminGameList } from '../../components/AdminGameList/AdminGameList'
import { AdminGamePage } from '../AdminGamePage/AdminGamePage'

export const AdminPage = () => {
  return (
    <>
      {/* <AdminHeader/> */}
      <Routes>
        <Route path='/games' element={<AdminGameList />}/>
        <Route path='/game/:gameId' element={<AdminGamePage />}/>
      </Routes>
    </>
  )
}
