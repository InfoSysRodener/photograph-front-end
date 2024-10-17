/* eslint-disable no-unused-vars */
import useSWR from 'swr';
import domainUrl from '../util/domainUrl';
import useSWRMutation from 'swr/mutation';
import { useEffect } from 'react';

// const fetcher = (...args) =>
//   fetch(...args)
//     .then((res) => res.json())
//     .then((json) => json.data);

async function getRequest(url) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      album_id: localStorage.getItem('album_id'),
    }),
  }).then((res) => res.json());
}

const Invite = () => {
  // const album_id = localStorage.getItem('album_id');

  // const url = `${domainUrl}/api/album/${album_id}`;

  // const { data, error, isLoading } = useSWR(url, fetcher);

  const url = `${domainUrl}/api/generateQRCodeUserToAlbum`;

  const { data, trigger, isMutating } = useSWRMutation(url, getRequest);

  // if (error) return <div>failed to load</div>;
  // if (isLoading)
  //   return (
  //     <div className="font-work-sans text-3xl inset-0 flex justify-center items-center h-screen">
  //       loading...
  //     </div>
  //   );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await trigger();
      } catch (e) {
        // error handling
      }
    };
    fetchData();
  }, [trigger]);

  return (
    <div className="relative w-full h-full">
      <div className="flex justify-center items-center flex-col mt-10 px-5">
        {isMutating && (
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
            <p className="text-gray-500">Loading...</p>
          </div>
        )}
        {data && <img src={data?.data.image} />}
        <p className="text-lg font-work-sans text-center mt-10">
          Scan this QR code to open the same live album on a different phone
        </p>
      </div>
    </div>
  );
};

export default Invite;
