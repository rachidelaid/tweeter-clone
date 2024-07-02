const LoadingTweet = () => {
  return (
    <div className="shadow bg-white rounded-lg p-4 md:p-5 flex flex-col gap-5">
      <div className="flex gap-4">
        <div className="h-8 w-8 rounded skeleton" />
        <div className="flex flex-col justify-around w-full">
          <div className="h-2 w-36 max-w-[50%] rounded skeleton" />

          <div className="h-2 w-16 rounded skeleton" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-3 w-full rounded skeleton" />
        <div className="h-3 w-full rounded skeleton" />
        <div className="h-3 w-1/2 rounded skeleton" />
      </div>

      <div className="relative w-full aspect-video rounded-lg overflow-hidden skeleton" />
    </div>
  );
};

export default LoadingTweet;
