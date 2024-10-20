import useSWRMutation from 'swr/mutation';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import domainUrl from '../util/domainUrl';

async function getRequest(url, { arg }) {
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      album_id: arg.albumId,
      email: arg.email,
    }),
  }).then((res) => res.json());
}

function SharedAlbumRedirect() {
  const navigate = useNavigate();
  const { albumId, userEmail } = useParams();

  const url = `${domainUrl}/api/addUserToAlbum`;

  const { data, trigger, isMutating } = useSWRMutation(url, getRequest);

  console.log(albumId);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fetchData = async () => {
        try {
          const result = await trigger({ albumId, email: userEmail });

          if (result?.data?.url) {
            const { album_id, user_id, token } = result.data.url;

            localStorage.setItem('album_id', album_id);
            localStorage.setItem('user_id', user_id);
            localStorage.setItem('token', token);

            navigate('/profile');
          }

          // navigate(
          //   `/photographer/album/${result.data?.url.album_id}/user/${result.data?.url.user_id}/${result.data?.url.token}`
          // );

          // eslint-disable-next-line no-unused-vars
        } catch (e) {
          // error handling
        }
      };
      fetchData();
    }, 2000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, trigger]);

  return (
    <>
      <div className="flex flex-col  justify-center items-center h-screen w-full relative font-work-sans">
        {isMutating && (
          <>
            <div className="inline-block h-4 w-4 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"></div>
            <span className="text-2xl text-primary">Redirect...</span>
          </>
        )}
        <span className="text-2xl text-primary"> {data && data.message}</span>
      </div>
    </>
  );
}

export default SharedAlbumRedirect;
