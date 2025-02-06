import React from "react";
import ReactDOM from "react-dom";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="w-12 h-12 border-4 border-t-black border-transparent rounded-full animate-spin"></div>
    </div>,
    document.getElementById("loader") // Ensure this element exists in your HTML
  );
};

export default Loader;
