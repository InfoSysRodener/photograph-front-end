/* eslint-disable react/prop-types */

import {
  BsTwitter,
  BsInstagram,
  BsDribbble,
  BsArrowRight,
} from 'react-icons/bs';

const SideMenu = ({ status = 'live', isOpen, onClick }) => {
  return (
    <>
      <div
        className={`sm:hidden ${isOpen ? 'fixed inset-0 bg-black bg-opacity-50 z-40 duration-500' : 'duration-1000 bg-opacity-0 inset-0 fixed pointer-events-none -z-0'}`}
      ></div>

      <aside
        className={`h-screen transform transition-transform duration-500 ${isOpen ? 'translate-x-50 ' : 'translate-x-full '} sm:translate-x-0 w-64 fixed top-0 right-0 z-50 leading-5 bg-white pt-10 sm:pt-0`}
      >
        <p
          onClick={onClick}
          className="flex sm:hidden items-center gap-5 font-work-sans uppercase py-10 absolute left-0 -top-5 px-[30px] text-black text-sm"
        >
          Close
          <BsArrowRight size={20} />
        </p>
        <div className="p-[30px]">
          <p className="mb-2 text-xl text-primary uppercase tracking-wider">
            Aside
          </p>
          <p className="mb-0 text-base font-work-sans text-[#859196]">
            Another free html5 bootstrap 4 template by{' '}
            <a
              href="https://uicookies.com/"
              target="_blank"
              className="text-primary"
            >
              uiCookies
            </a>
          </p>
        </div>
        <div className="h-96 text-base text-black font-work-sans">
          <nav className="pl-[30px]">
            {status === 'live' ? (
              <ul>
                <li className="py-1 mb-[10px] cursor-pointer border-b-2 border-b-primary inline-block">
                  Home
                </li>
                <li className="py-1 mb-[10px] cursor-pointer group relative inline-block">
                  Receive all my pictures
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-50 transition-transform duration-500 origin-left"></span>
                </li>
                <li className="py-1 mb-[10px] cursor-pointer  group relative inline-block">
                  Invite Friends to album
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-50 transition-transform duration-500 origin-left"></span>
                </li>
              </ul>
            ) : (
              <ul>
                <li className="py-1 mb-[10px] cursor-pointer border-b-2 border-b-primary inline-block">
                  Home
                </li>
                <li className="py-1 mb-[10px] cursor-pointer  group relative inline-block">
                  Invite Friends to album
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-50 transition-transform duration-500 origin-left"></span>
                </li>
                <li className="py-1 mb-[10px] cursor-pointer  group relative inline-block">
                  Download all my picture
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-50 transition-transform duration-500 origin-left"></span>
                </li>
              </ul>
            )}
          </nav>
          <footer className="absolute bottom-10 font-work-sans pl-[30px]">
            <ul className="flex gap-10 mb-5 text-[#666666]">
              <li>
                <BsTwitter
                  width={20}
                  className="cursor-pointer hover:text-primary duration-300 transition-colors"
                />
              </li>
              <li>
                <BsInstagram
                  width={20}
                  className="cursor-pointer hover:text-primary duration-300 transition-colors"
                />
              </li>
              <li>
                <BsDribbble
                  width={20}
                  className="cursor-pointer hover:text-primary duration-300 transition-colors"
                />
              </li>
            </ul>
            <p className="text-[#859196] text-sm">
              &copy; 2017{' '}
              <a
                href="https://uicookies.com/"
                target="_blank"
                className="text-primary"
              >
                uiCookies:Aside
              </a>
              . <br /> All Rights Reserved.
            </p>
          </footer>
        </div>
      </aside>
    </>
  );
};

export default SideMenu;
