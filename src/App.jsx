import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Album from './pages/Album';
import Profile from './pages/Profile';
import Photo from './pages/Photo';
import Layout from './pages/Layout';
import Redirect from './pages/Redirect';
import Invite from './pages/Invite';
import InviteThruEmail from './pages/InviteThruEmail';
import Download from './pages/Download';
import SharedAlbumRedirect from './pages/SharedAlbumRedirect';

const HashRedirect = () => {
  // Check if the URL hash contains a path
  const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];

  // If a path is found, redirect to that path
  if (path) {
    return <Navigate to={path} replace />;
  }

  return null;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/photo/:photo_id" element={<Photo />} />
      <Route
        path="/photographer/friend/album/:albumId"
        element={<SharedAlbumRedirect />}
      />
      {/* <Route
        path="/photographer/friend/album/:albumId/user/:userEmail"
        element={<SharedAlbumRedirect />}
      /> */}
      <Route
        path="/photographer/album/:albumId/user/:userId/:hash"
        element={<Album />}
      />
      <Route path="/photographer/friend/album/:albumId" element={<Album />} />
      <Route
        path="/photographer/remote/:remote_id/:token"
        element={<Redirect />}
      />
      <Route path="/profile" element={<Profile />} />
      <Route path="/invite" element={<Invite />} />
      <Route path="/invite-friend-email" element={<InviteThruEmail />} />
      <Route path="/download" element={<Download />} />

      {/* Handle hash redirects */}
      <Route path="*" element={<HashRedirect />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
