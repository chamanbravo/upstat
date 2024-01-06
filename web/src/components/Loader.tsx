export function Loader() {
  return (
    <div className="absolute w-full h-full flex justify-center content-center flex-wrap">
      <span className="animate-spin-wait inline-block w-[30px] h-[30px] border-4 border-slate-700">
        <span className="animate-height-strech-shrink inline-block align-top bg-slate-400 w-full h-full"></span>
      </span>
    </div>
  );
}
