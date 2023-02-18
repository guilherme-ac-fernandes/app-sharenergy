import React from 'react';
import './CheckBox.css';

interface CheckBoxProps {
  id: string,
  label: string,
  checked: boolean,
  setValue: (value: boolean) => void,
  dataTestId: string,
}

export default function CheckBox({
  id,
  label,
  checked,
  setValue,
  dataTestId,
}: CheckBoxProps) {
  return (
    <label htmlFor={id} className="checkBoxContainer">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={({ target }) => {
          setValue(target.checked);
        }}
        data-testid={dataTestId}
      />
      { label }
    </label>
  );
}
