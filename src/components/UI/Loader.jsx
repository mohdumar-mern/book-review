// src/components/UI/Loader.jsx
const Loader = ({ text = "Loading...", center = true, size = "md" }) => {
    const sizeMap = {
      sm: "h-4 w-4 border-2",
      md: "h-6 w-6 border-4",
      lg: "h-10 w-10 border-[6px]",
    };
  
    return (
      <div className={`flex flex-col items-center ${center ? "justify-center min-h-[200px]" : ""}`}>
        <div
          className={`animate-spin rounded-full border-t-blue-500 border-gray-300 ${sizeMap[size]}`}
          role="status"
          aria-label="Loading spinner"
        ></div>
        <p className="text-gray-500 text-sm mt-2">{text}</p>
      </div>
    );
  };
  
  export default Loader;
  