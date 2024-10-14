import useSWR from 'swr';

const fetcher = (...args) =>
  fetch(...args)
    .then((res) => res.json())
    .then((json) => json.data);

const Invite = () => {
  //get album with remote
  const album_id = localStorage.getItem('album_id');

  // const domain = 'photograph-app.test';
  const domain = '54.254.11.45';

  const url = `http://${domain}/api/album/${album_id}`;

  const { data, error, isLoading } = useSWR(url, fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <div className="font-work-sans text-3xl inset-0 flex justify-center items-center h-screen">
        loading...
      </div>
    );

  localStorage.setItem('album_status', data?.status);

  console.log(data);
  return (
    <div className="relative w-full h-full">
      <div className="flex justify-center items-center flex-col mt-10 px-5">
        <img src={data.remotes.qrcode_image} />
        <p className="text-lg font-work-sans text-center mt-10">
          Scan this QR code to open the same live album on a different phone
        </p>
      </div>
    </div>
  );
};

export default Invite;
