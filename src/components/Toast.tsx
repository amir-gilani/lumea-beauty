import { Icon } from './ui/Icon';
import React from 'react';
import { useStore } from '../store/useStore';

export const Toast: React.FC = () => {
  const { toastMessage, hideToast } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#392d30] text-[#ffecf0] px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 transition-all duration-300 animate-fadeIn">
      <Icon name="check_circle" className="text-[#fdb2c5] text-[22px]" />
      <span className="font-label-md text-label-md font-semibold">{toastMessage}</span>
      <button
        onClick={hideToast}
        className="w-5 h-5 rounded-full text-white/60 hover:text-white flex items-center justify-center cursor-pointer mr-1"
      >
        <Icon name="close" className="text-[16px]" />
      </button>
    </div>
  );
};
