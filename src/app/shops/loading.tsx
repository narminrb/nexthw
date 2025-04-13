import React from "react";

const loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-white">
      <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-4 border-t-blue-600" />
    </div>
  );
};

export default loading;