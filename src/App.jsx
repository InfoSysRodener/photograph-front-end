import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Album from './pages/Album';
import Profile from './pages/Profile';
import Photo from './pages/Photo';
import Layout from './pages/Layout';
import Redirect from './pages/Redirect';
import Invite from './pages/Invite';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/photo/:photo_id" element={<Photo />} />
      <Route
        path="/photographer/album/:albumId/user/:userId/:hash"
        element={<Album />}
      />
      <Route
        path="/photographer/remote/:remote_id/:token"
        element={<Redirect />}
      />
      <Route path="/profile" element={<Profile />} />
      <Route path="/invite" element={<Invite />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
