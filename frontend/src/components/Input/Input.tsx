import React from 'react';
import './Input.css';

interface InputProps {
  id: string,
  label?: string,
  type: 'text' | 'password' | 'number' | 'email',
  value: string,
  setValue: (value: string) => void,
  dataTestId: string,
  placeholder: string,
  maxLength?: number,
  className?: string;
}

export default function Input({
  id,
  label,
  type,
  value,
  setValue,
  dataTestId,
  placeholder,
  maxLength,
  className,
}: InputProps) {
  return (
    <label htmlFor={id} className={className || 'labelContainer'}>
      { label || '' }
      <input
        id={id}
        type={type}
        value={value}
        className="inputContainer"
        onChange={({ target }) => { setValue(target.value); }}
        data-testid={dataTestId}
        placeholder={placeholder}
        min="0"
        maxLength={maxLength}
      />
    </label>
  );
}
