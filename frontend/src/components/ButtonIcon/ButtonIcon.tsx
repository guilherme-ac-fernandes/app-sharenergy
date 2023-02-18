import React from 'react';
import './ButtonIcon.css';

interface ButtonIconProps {
  component: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  dataTestId: string;
}

export default function ButtonIcon({
  component,
  onClick,
  disabled = false,
  dataTestId,
}: ButtonIconProps) {
  return (
    <button
      className="buttonIconContainer"
      type="button"
      onClick={onClick}
      disabled={disabled}
      data-testid={dataTestId}
    >
      {component}
    </button>
  );
}
