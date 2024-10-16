import useSWRInfinite from 'swr/infinite';
import ImageCard from '../components/ImageCard';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import domainUrl from '../util/domainUrl';
const fetcher = (...args) =>
  fetch(...args, { credentials: 'include' })
    .then((res) => res.json())
    .then((json) => json.data.data);

const getKey = (pageIndex, previousPageData, albumId) => {
  pageIndex = pageIndex + 1;

  if (previousPageData && !previousPageData.length) return null; // reached the end

  return `${domainUrl}/api/capture?page=${pageIndex}&album_id=${albumId}`; // SWR key
};

function Album() {
  const [loading, setLoading] = useState(false);
  const { albumId, userId, token } = useParams();

  const handleScroll = () => {
    if (
      document.body.scrollHeight - 200 <
      window.scrollY + window.innerHeight
    ) {
      setLoading(true);
    }
  };

  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  window.addEventListener('scroll', debounce(handleScroll, 500));

  const { data, setSize } = useSWRInfinite(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, albumId),
    fetcher,
    {
      refreshInterval: 20000,
    }
  );

  localStorage.setItem('album_id', albumId);
  localStorage.setItem('user_id', userId);
  localStorage.setItem('token', token);

  useEffect(() => {
    if (loading == true) {
      setSize((size) => size + 1);
    }
  }, [loading, setSize]);

  if (!data)
    return (
      <span className="text-xl text-gray-500 font-bold p-10">Loading...</span>
    );

  const albumData = data?.flat();

  return (
    <>
      {albumData.length == 0 && (
        <div className="font-work-sans text-3xl inset-0 flex justify-center items-center h-screen bounce">
          No Image Captured Yet..
        </div>
      )}

      <div className="columns-1 sm:columns-2 md:columns-2 lg:columns-3  gap-5 px-[15px] sm:py-5">
        {albumData.map((item, index) => (
          <div key={index} className="inline-block h-auto">
            <Link to={`/photo/${item.id}`}>
              <ImageCard key={index} src={item.image_path} />
            </Link>
            {/* <h1>{item.id}</h1> */}
          </div>
        ))}
      </div>

      <div
        className={`${loading ? 'hidden' : 'block'} flex justify-center items-center`}
      >
        <span className="text-xl text-primary font-bold p-10">Loading...</span>
      </div>
    </>
  );
}

export default Album;
