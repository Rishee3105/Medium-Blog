const Quote = () => {
  return (
    <div className="bg-slate-200 h-screen flex flex-col justify-center">
      <div className="flex justify-center">
        <div className="max-w-lg">
          <div className="text-3xl font-bold">
            “The customer service I received was exceptional. The support team
            went above and beyond to address my concerns.”
          </div>
          <div className="max-w-md text-xl font-semibold mt-4">
            Jules Winnfield
          </div>
          <div className="max-w-md text-md font-semibold text-slate-400">
            CEO, Acme Inc
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
