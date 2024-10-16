import useSWRMutation from 'swr/mutation';
import domainUrl from '../util/domainUrl';
import Cookies from 'js-cookie';

async function getRequest(url) {
  return fetch(url, {
    method: 'POST',
  }).then((res) => res.json());
}

function Home() {
  const value = Cookies.get('user_token');
  console.log(value);
  const url = `${domainUrl}/api/generateQRCodeUrl`;

  const { data, trigger, isMutating } = useSWRMutation(url, getRequest);

  return (
    <>
      <div className=" w-full relative font-work-sans">
        <div className="flex flex-col  justify-center items-center h-screen sm:ml-[250px] ">
          <img className="mb-10" src={data?.data.remote.qrcode_image} />
          <button
            onClick={async () => {
              try {
                const result = await trigger();
                console.log(result);
                // eslint-disable-next-line no-unused-vars
              } catch (e) {
                // error handling
              }
            }}
            disabled={isMutating}
            //   className="bg-primary text-white px-2 py-3 rounded-md mb-5"
            className="cursor-pointer font-work-sans text-xl inline-block rounded bg-primary px-6 pb-2 pt-2.5 font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 disabled:opacity-70 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
          >
            {isMutating ? (
              <>
                <div className="inline-block h-4 w-4 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"></div>
                <span>Loading...</span>
              </>
            ) : (
              <>Generate QR Code</>
            )}
          </button>
          {data != undefined && (
            <div>
              <a
                className="text-blue-500 underline mt-10"
                href={data?.data.url}
              >
                {data?.data.url}
              </a>
            </div>
          )}
        </div>
        {/* <p className="w-1/2 relative inline-flex">{data?.data.url}</p> */}
      </div>
    </>
  );
}

export default Home;
