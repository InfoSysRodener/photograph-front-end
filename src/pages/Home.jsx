import useSWR from 'swr';
import ImageCard from '../components/ImageCard';
import { useParams } from 'react-router-dom';

const fetcher = (...args) =>
  fetch(...args)
    .then((res) => res.json())
    .then((json) => json.data.data);

function Home() {
  const { albumId } = useParams();

  const domain = 'photograph-app.test';

  const url = `http://${domain}/api/capture?album_id=${albumId}`;

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
    <>
      {data.length == 0 && (
        <div className="font-work-sans text-3xl inset-0 flex justify-center items-center h-screen bounce">
          No Image...
        </div>
      )}
      <div className="columns-1 sm:columns-2 md:columns-2 lg:columns-3 gap-5 px-[15px] sm:py-5">
        {data.map((user, index) => (
          <div
            key={user.id}
            className="fadeInCustom transition-transform"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ImageCard src={user.image_path} />
            <p>{user.id}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
