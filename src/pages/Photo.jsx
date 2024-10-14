import { useParams } from 'react-router-dom';

const Photo = () => {
  const { albumId, userId } = useParams();
  return (
    <div className="relative w-full sm:w-calc-full-minus-250">
      <h1>Hello</h1>
      <h1>Album ID: {albumId}</h1>
      <h2>User ID: {userId}</h2>
    </div>
  );
};

export default Photo;
