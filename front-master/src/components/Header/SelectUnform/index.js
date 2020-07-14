import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

export default function Input({ name, label, ...rest }) {
  const inputRef = useRef(null);

  const {
    fieldName,
    defaultValue = '',
    registerField,
    error,
    selected = '',
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <select
        ref={inputRef}
        id={fieldName}
        defaultValue={defaultValue}
        selected={selected}
        {...rest}
      />

      {error && <span style={{ color: '#f00' }}>{error}</span>}
    </>
  );
}
