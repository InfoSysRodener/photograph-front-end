import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Photo from './pages/Photo';

import SideMenu from './components/sideMenu';
import Header from './components/Header';
import { useState } from 'react';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="/photo" element={<Photo />} />
      <Route
        path="/photographer/album/:albumId/user/:userId/:hash"
        element={<Home />}
      />
    </Route>
  )
);

function App() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <>
      <div className="relative w-full sm:w-calc-full-minus-250">
        <Header onClick={handleOpenModal} />
        <RouterProvider router={router} />
      </div>

      <SideMenu isOpen={openModal} onClick={handleOpenModal} />
    </>
  );
}

export default App;
