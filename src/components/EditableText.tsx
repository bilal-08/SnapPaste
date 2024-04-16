'use client';

import { useState, useEffect, type ChangeEvent } from 'react';
import { useCodeIdContext } from '@/store/context';
import { nanoid } from 'nanoid';
export const EditableText = () => {
  const [editableText, setEditableText] = useState(nanoid(6) || 'fnscie');

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setEditableText(event.target.value || '');
  };

  const { handleDataChange } = useCodeIdContext();
  useEffect(() => {
    handleDataChange(editableText.trim());
  }, [editableText]);

  return (
    <>
      <input
        className="min-w-2 bg-transparent outline-none"
        style={{ width: `${editableText.length}ch` }}
        type="text"
        value={editableText}
        onChange={handleInput}
      ></input>
    </>
  );
};
