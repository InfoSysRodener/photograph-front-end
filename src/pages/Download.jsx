import domainUrl from '../util/domainUrl';
import useSWRMutation from 'swr/mutation';

async function getRequest(url) {
  return await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/zip',
    },
  })
    .then(async (res) => {
      if (!res.ok) {
        const error = new Error();

        error.message = await res.json();

        throw error;
      }
      return res.blob();
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `album_images.zip`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    })
    .catch((error) => {
      // console.error('Download error:', error);
      // console.log('Download error:', error.message.message);
      // alert('Failed to download file.');
      throw error;
    });
}

const Download = () => {
  const album_id = localStorage.getItem('album_id');
  const url = `${domainUrl}/api/download-images/${album_id}`;

  const { trigger, isMutating, error } = useSWRMutation(url, getRequest);

  const handleSubmit = () => {
    trigger();
  };

  return (
    <div className="flex flex-col justify-center items-center h-96 mt-40">
      <h2 className="text-2xl mb-10">Download Album Files</h2>

      {isMutating ? (
        <div className="flex flex-col items-center justify-center mt-5">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mb-2"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : (
        <button
          onClick={handleSubmit}
          className="bg-primary  text-white font-bold py-2 px-4 rounded w-80"
        >
          Download Album
        </button>
      )}
      <p className="text-xl text-red-500 my-10">
        {error && error?.message?.message}
      </p>
    </div>
  );
};

export default Download;
