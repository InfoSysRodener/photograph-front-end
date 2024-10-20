/* eslint-disable react/prop-types */
import { BsList, BsArrowLeft } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ onClick }) => {
  const location = useLocation();
  const isOnPhotoDetails = location.pathname.startsWith('/photo/');
  const isOnHome = location.pathname === '/';

  const album_id = localStorage.getItem('album_id');
  const user_id = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');

  return (
    <nav className="flex justify-center items-center p-5 relative sm:hidden ">
      {isOnPhotoDetails && (
        <Link
          to={`/photographer/album/${album_id}/user/${user_id}/${token}`}
          className="absolute left-5"
        >
          <BsArrowLeft size={30} color="black" height={50} />
        </Link>
      )}
      <div className="h-[36px] flex items-center">
        <h1 className="font-work-sans tracking-wider text-center text-black font-semibold text-xl">
          ASIDE
        </h1>
      </div>
      {!isOnHome && (
        <BsList
          onClick={onClick}
          className="absolute right-5"
          size={30}
          color="black"
          height={50}
        />
      )}
    </nav>
  );
};

export default Header;
