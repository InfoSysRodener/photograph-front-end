/* eslint-disable react/prop-types */
import { BsList } from 'react-icons/bs';

const Header = ({ onClick }) => {
  return (
    <nav className="flex justify-center items-center p-5 relative sm:hidden ">
      <div className="h-[36px] flex items-center">
        <h1 className="font-work-sans tracking-wider text-center text-black font-semibold text-xl">
          ASIDE
        </h1>
      </div>

      <BsList
        onClick={onClick}
        className="absolute right-5"
        size={30}
        color="black"
        height={50}
      />
    </nav>
  );
};

export default Header;
