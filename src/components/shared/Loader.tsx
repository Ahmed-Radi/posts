const Loader = () => {
  return (
    <div className="container mx-auto md:px-12 px-3">
      <section className='space-y-5'>
        <div className="h-10 bg-gray-500 rounded-md mt-5 animate-pulse" />
        <div>
          <div className="h-10 w-16 bg-gray-500 rounded-md animate-pulse" />
        </div>
        <div className='flex justify-between items-center flex-wrap gap-4'>
          {Array.from({ length: 10 }).map((_, index) => (
            <section key={index} className='bg-slate-300 p-5 lg:w-3/12 md:w-1/3 w-full flex flex-1 flex-col rounded-md transition-all duration-500'>
            <div className='bg-gray-400 h-10 rounded-md animate-pulse'></div>
            <p className='my-3 bg-gray-400 h-10 rounded-md animate-pulse'></p>
            <div className='flex justify-between'>
              <div className='bg-gray-400 h-10 w-16 rounded-md animate-pulse' />
              <div className='bg-gray-400 h-10 w-16 rounded-md animate-pulse' />
              <div className='bg-gray-400 h-10 w-16 rounded-md animate-pulse' />
            </div>
          </section>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Loader;
