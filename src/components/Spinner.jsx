import React from 'react';

export default function Spinner({ size = 'md', center = false }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className={`${center ? 'flex items-center justify-center py-12' : 'inline-flex'}`}>
      <div className={`${sizes[size]} border-4 border-primary-100 border-t-primary rounded-full animate-spin`}></div>
    </div>
  );
}
