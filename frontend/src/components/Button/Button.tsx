import React from 'react';
import './Button.css';

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  dataTestId: string;
}

export default function Button({
  text,
  onClick,
  disabled = false,
  dataTestId,
}: ButtonProps) {
  return (
    <button
      className="buttonContainer"
      type="button"
      onClick={onClick}
      disabled={disabled}
      data-testid={dataTestId}
    >
      {text}
    </button>
  );
}
