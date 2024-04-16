'use client';
import useAutosizeTextArea from '@/hooks/useAutosizeTextArea';
import { useState, useRef } from 'react';
import Menu from './menu';
export default function TextArea({
  CodeArea,
  codeSnippet,
  views,
}: {
  CodeArea: Boolean;
  codeSnippet?: string;
  views?: number;
}) {
  const [value, setValue] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextInputChange = (
    evt: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const val = evt.target?.value;

    setValue(val);
  };
  useAutosizeTextArea(textAreaRef.current, value);
  let lineNumbers = [];
  const contentLength = (codeSnippet?.split('\n').length || 0) + 1;
  for (let i = 1; i < contentLength; i++) {
    lineNumbers.push(<div key={i}>{i}</div>);
  }
  return (
    <>
      <Menu textContent={value} views={views} />

      <div className="flex p-3">
        <div className="h-full ">
          {CodeArea ? (
            <div className="mr-2 mt-1 select-none text-sm leading-6 text-[#908caa]">
              {lineNumbers}
            </div>
          ) : (
            <div className="mr-2 text-xl text-[#E0DEF4]">{'>'} </div>
          )}
        </div>
        <div className="mt-1 min-h-[500px] w-full">
          {CodeArea ? (
            <pre className="text-wrap">
              <code
                onChange={handleTextInputChange}
                dangerouslySetInnerHTML={{
                  __html: codeSnippet || '',
                }}
                ref={textAreaRef}
                className="min-h-full w-full resize-none border-none bg-transparent font-fira text-sm text-white outline-none"
              ></code>
            </pre>
          ) : (
            <textarea
              onChange={handleTextInputChange}
              ref={textAreaRef}
              value={value}
              className="min-h-full w-full resize-none border-none bg-transparent font-fira text-sm text-white outline-none"
            ></textarea>
          )}
        </div>
      </div>
    </>
  );
}
