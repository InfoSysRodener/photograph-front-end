import domainUrl from '../util/domainUrl';
import useSWRMutation from 'swr/mutation';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';

async function getRequest(url, { arg }) {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: arg,
    }),
  }).then((res) => res.json());
}

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => data);

const Profile = () => {
  const [email, setEmail] = useState('');

  const user_id = localStorage.getItem('user_id');

  const url = `${domainUrl}/api/user/${user_id}`;

  const {
    data: updatedData,
    trigger,
    isMutating,
  } = useSWRMutation(url, getRequest);

  const { data } = useSWR(`${domainUrl}/api/user/${user_id}`, fetcher);

  const handleUpdate = () => {
    trigger(email);
  };

  useEffect(() => {
    if (data?.data.email) {
      setEmail(data?.data?.email);
    }
  }, [data]);

  return (
    <div className="flex flex-col justify-center items-center h-96 mt-40">
      {data?.data.email_verified_at === null ? (
        <p className="text-lg font-work-sans font-semibold  text-gray-500 mb-10 px-10 text-center">
          Provide your email to ensure future access to this album
        </p>
      ) : (
        <p className="text-lg font-work-sans font-semibold  text-gray-500 mb-10 px-10 text-center">
          PROFILE
        </p>
      )}
      <p className="text-lg font-work-sans font-semibold text-red-400">
        {/* {console.log(updatedData)} */}
        {updatedData && updatedData?.message}
      </p>

      <div className="max-w-2xl mx-auto ">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-100"
        >
          Email
        </label>
        <div className="flex items-center mt-1 w-80">
          <input
            type="email"
            id="email"
            className="w-full h-12 px-3 text-sm text-gray-700 border  rounded-r-none border-primary focus:outline-none rounded shadow-sm"
            placeholder="user@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      {isMutating ? (
        <Loading />
      ) : (
        <button
          onClick={handleUpdate}
          className="bg-primary mt-10 text-white font-bold py-2 px-4 rounded w-80"
        >
          Update
        </button>
      )}
    </div>
  );
};

export default Profile;
