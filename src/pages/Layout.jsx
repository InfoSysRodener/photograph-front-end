import SideMenu from '../components/SideMenu';
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const [openModal, setOpenModal] = useState(false);
  const { pathname } = useLocation();

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <>
      <div className="relative w-full sm:w-calc-full-minus-250">
        <Header onClick={handleOpenModal} />
        <Outlet />
      </div>

      <SideMenu isOpen={openModal} onClick={handleOpenModal} />
    </>
  );
};

export default Layout;
