import React from 'react';
import './button.css';

interface ButtonProps {
<<<<<<< HEAD
 
  primary?: boolean;
  
  backgroundColor?: string;
  
=======
  
  primary?: boolean;
 
  backgroundColor?: string;
 
>>>>>>> 771d7a355e5ee234471cdd0c15d68c207e52fa7e
  size?: 'small' | 'medium' | 'large';
  
  label: string;
  
  onClick?: () => void;
}


export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      {...props}
    >
      {label}
      <style jsx>{`
        button {
          background-color: ${backgroundColor};
        }
      `}</style>
    </button>
  );
};
