const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mb-2"></div>
      <p className="text-gray-500">Loading...</p>
    </div>
  );
};

export default Loading;
