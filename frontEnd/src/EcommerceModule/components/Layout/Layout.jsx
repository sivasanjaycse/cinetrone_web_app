import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import "./Layout.siva.css"
const Layout = () => {
  return (
    <>
      <Header />
      <main className='siva-sanjay'>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;