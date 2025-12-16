const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex space-x-4">
        {/* Круглі точки з glow */}
        <div className="w-6 h-6 rounded-full bg-red-500 animate-bounce shadow-[0_0_15px_rgba(239,68,68,0.7)]"></div>
        <div className="w-6 h-6 rounded-full bg-yellow-400 animate-bounce delay-150 shadow-[0_0_15px_rgba(250,204,21,0.7)]"></div>
        <div className="w-6 h-6 rounded-full bg-green-500 animate-bounce delay-300 shadow-[0_0_15px_rgba(34,197,94,0.7)]"></div>
        <div className="w-6 h-6 rounded-full bg-blue-500 animate-bounce delay-450 shadow-[0_0_15px_rgba(59,130,246,0.7)]"></div>
      </div>
    </div>
  );
};

export default Loader;
