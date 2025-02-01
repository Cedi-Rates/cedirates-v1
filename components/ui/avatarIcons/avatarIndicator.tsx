import React from 'react';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type Mode = 'active' | 'inactive';

const sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl'];
const indicatorSize = ["6px", "8px", "10px", "12px", "14px", "16px"];

interface AvatarIndicatorProps {
  size: any;
  mode: Mode;
}

const AvatarIndicator: React.FC<AvatarIndicatorProps> = ({ size, mode }) => {
  const sizeIndex = sizes.findIndex(s => s === size);
  const indicatorSizePX = sizeIndex !== -1 ? indicatorSize[sizeIndex] : indicatorSize[3];

  return (
    <div className='rounded-full absolute bottom-0 right-0 z-50 bg-white p-0.5'>
      <div
        className="rounded-full"
        style={{
          background: mode === 'active' ? "#059669" : "#A3A3A3",
          height: indicatorSizePX, width: indicatorSizePX
        }}
      />
    </div>
  );
};

export default AvatarIndicator;
