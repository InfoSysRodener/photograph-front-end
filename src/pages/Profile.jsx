const Profile = () => {
  return (
    <div className="flex flex-col justify-center items-center h-96">
      <div className="max-w-2xl mx-auto ">
        <label
          htmlFor="input-9"
          className="block text-sm font-medium text-gray-700 dark:text-gray-100"
        >
          Email
        </label>
        <div className="flex items-center mt-1 w-80">
          <input
            type="email"
            id="input-9"
            className="w-full h-12 px-3 text-sm text-gray-700 border  rounded-r-none border-primary focus:outline-none rounded shadow-sm"
            placeholder="user@mail.com"
          />
        </div>
      </div>
      <button className="bg-primary mt-10 text-white font-bold py-2 px-4 rounded w-80">
        Update
      </button>
    </div>
  );
};

export default Profile;
