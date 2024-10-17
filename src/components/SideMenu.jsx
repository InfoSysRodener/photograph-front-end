/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import domainUrl from '../util/domainUrl';
import useSWR from 'swr';

import {
  BsTwitter,
  BsInstagram,
  BsDribbble,
  BsArrowRight,
  BsEnvelope,
  BsPhone,
  BsDownload,
} from 'react-icons/bs';

async function getRequest(url, { arg }) {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      album_status: arg,
    }),
  }).then((res) => res.json());
}

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => data);

const SideMenu = ({ isOpen, onClick }) => {
  const location = useLocation();

  const album_id = localStorage.getItem('album_id');
  const user_id = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');

  const album_status = localStorage.getItem('album_status');

  const [active, setActive] = useState();

  useEffect(() => {
    if (location.pathname.includes('/photographer')) {
      setActive('home');
    } else if (location.pathname.includes('/profile')) {
      setActive('profile');
    } else if (location.pathname.includes('/invite')) {
      setActive('invite');
    } else if (location.pathname.includes('/invite-friend-email')) {
      setActive('invite');
    } else if (location.pathname.includes('/download')) {
      setActive('invite');
    }
  }, [location]);

  const url = `${domainUrl}/api/album/${album_id}`;

  const { trigger } = useSWRMutation(url, getRequest);
  const { data } = useSWR(`${domainUrl}/api/album/${album_id}`, fetcher);

  localStorage.setItem('album_status', data?.data.status);

  const handleCheckboxChange = (e) => {
    trigger(e.target.checked ? 'longterm' : 'live');
  };

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
            {data?.data.status === 'live' ? (
              <ul>
                <Link
                  to={`/photographer/album/${album_id}/user/${user_id}/${token}`}
                  className={`py-1 mb-[10px] cursor-pointer group relative  inline-flex ${active === 'home' ? 'border-b-2 border-b-primary' : ''}`}
                >
                  Home
                  {active !== 'home' && (
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-50 transition-transform duration-500 origin-left"></span>
                  )}
                </Link>
                <Link
                  to={'/profile'}
                  className={`py-1 mb-[10px] cursor-pointer group relative inline-flex items-center gap-2  ${active === 'profile' ? 'border-b-2 border-b-primary' : ''}`}
                >
                  Receive all my pictures <BsEnvelope />
                  {active !== 'profile' && (
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-50 transition-transform duration-500 origin-left"></span>
                  )}
                </Link>
                <Link
                  to={'/invite'}
                  className={`py-1 mb-[10px] cursor-pointer  group relative inline-flex items-center gap-2 ${active === 'invite' ? 'border-b-2 border-b-primary' : ''}`}
                >
                  Invite Friends to album <BsPhone />
                  {active !== 'invite' && (
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-50 transition-transform duration-500 origin-left"></span>
                  )}
                </Link>
              </ul>
            ) : (
              <ul>
                <Link
                  to={`/photographer/album/${album_id}/user/${user_id}/${token}`}
                  className={`py-1 mb-[10px] cursor-pointer group relative  inline-flex ${active === 'home' ? 'border-b-2 border-b-primary' : ''}`}
                >
                  Home
                  {active !== 'home' && (
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-50 transition-transform duration-500 origin-left"></span>
                  )}
                </Link>
                <Link
                  to={'/invite-friend-email'}
                  className={`py-1 mb-[10px] cursor-pointer group relative inline-flex items-center gap-2  ${active === 'invite-friend-email' ? 'border-b-2 border-b-primary' : ''}`}
                >
                  Invite Friends to album <BsPhone />
                  {active !== 'invite-friend-email' && (
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-50 transition-transform duration-500 origin-left"></span>
                  )}
                </Link>
                <Link
                  to={'/download'}
                  className={`py-1 mb-[10px] cursor-pointer  group relative inline-flex items-center gap-2 ${active === 'download' ? 'border-b-2 border-b-primary' : ''}`}
                >
                  Download all my picture <BsDownload />
                  {active !== 'download' && (
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-50 transition-transform duration-500 origin-left"></span>
                  )}
                </Link>
              </ul>
            )}
          </nav>

          <footer className="absolute bottom-10 font-work-sans pl-[30px]">
            <div className="relative mb-10 flex flex-col justify-center gap-5">
              <p>{data?.data.status}</p>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  id="switch"
                  type="checkbox"
                  className="peer sr-only"
                  checked={data?.data.status === 'longterm'}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="switch" className="hidden"></label>
                <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
              </label>
            </div>
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
