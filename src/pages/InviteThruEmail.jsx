import domainUrl from '../util/domainUrl';
import useSWRMutation from 'swr/mutation';
import { useState } from 'react';
import Loading from '../components/Loading';

async function getRequest(url, { arg }) {
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: arg.email,
      album_id: arg.albumId,
      type: 'email',
    }),
  }).then((res) => res.json());
}

const InviteThruEmail = () => {
  const [email, setEmail] = useState('');

  const albumId = localStorage.getItem('album_id');

  const url = `${domainUrl}/api/addUserToAlbum`;

  const { data, trigger, isMutating } = useSWRMutation(url, getRequest);

  const handleSubmit = () => {
    trigger({ email, albumId });
  };

  return (
    <form className="flex flex-col justify-center items-center h-96 mt-40">
      <p className="text-lg font-work-sans font-semibold  text-gray-500 mb-10 px-10 text-center">
        Share Album with a Friend
      </p>

      {data?.message && (
        <p className="text-lg font-work-sans font-semibold  text-red-500 mb-10 px-10 text-center ">
          {data?.message}
        </p>
      )}

      <div className="max-w-2xl mx-auto ">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-100"
        >
          Input your friend email
        </label>
        <div className="flex items-center mt-1 w-80">
          <input
            type="email"
            id="email"
            className="w-full h-12 px-3 text-sm text-gray-700 border  rounded-r-none border-primary focus:outline-none rounded shadow-sm"
            placeholder="user@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      {isMutating ? (
        <Loading />
      ) : (
        <button
          onClick={handleSubmit}
          className="bg-primary mt-10 text-white font-bold py-2 px-4 rounded w-80"
        >
          Send
        </button>
      )}
    </form>
  );
};

export default InviteThruEmail;
