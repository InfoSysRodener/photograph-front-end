import { useParams } from 'react-router-dom';
import useSWR from 'swr';

const fetcher = (...args) =>
  fetch(...args)
    .then((res) => res.json())
    .then((json) => json.data);

const Photo = () => {
  const { photo_id } = useParams();

  // const domain = 'photograph-app.test';
  const domain = '54.254.11.45';

  const url = `http://${domain}/api/capture/${photo_id}`;

  const { data, error, isLoading } = useSWR(url, fetcher, {
    refreshInterval: 20000,
  });

  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <div className="font-work-sans text-3xl inset-0 flex justify-center items-center h-screen">
        loading...
      </div>
    );

  return (
    <div className="relative w-full">
      <div className="flex flex-col justify-center items-center h-screen px-5 ">
        <img src={data.image_path} alt="Photo" />
        <h2 className="text-base mt-10 font-work-sans">
          long click on the image and click save to camera roll
        </h2>
      </div>
    </div>
  );
};

export default Photo;
