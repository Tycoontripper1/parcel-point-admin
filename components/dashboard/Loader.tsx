import React from 'react';

interface LoaderProps {
  isLoading: boolean;
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ isLoading, text = 'Loading...' }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#09090B40] bg-opacity-50 z-[1000]">
      <div className="bg-white p-2 rounded-md shadow-lg flex flex-col items-center">
        <div 
          className="w-[40px] h-[40px] border-[5px] border-solid border-[rgba(174,255,140,0.3)] border-t-[#AEFF8C] rounded-full mb-4"
          style={{ animation: 'spin 1s linear infinite' }}
        />
        <p className="text-gray-600 font-medium text-[12px]">{text}</p>
      </div>
    </div>
  );
};

export default Loader;