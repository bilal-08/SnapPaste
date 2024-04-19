import TextArea from '@/components/TextArea';
import { getCodeSnippetById } from '@/lib/database/data';
import { CodeIdProvider } from '@/store/context';
import { redirect } from 'next/navigation';
import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/tokyo-night-dark.css';
import CopyButton from '@/components/CopyButton';
import { Toaster } from 'sonner';
export default async function code({
  params,
}: {
  params: {
    codeId: string;
  };
}) {
  const data = await getCodeSnippetById(params.codeId);
  console.log(data,"data in codeID.tsx")
  if (!data) return redirect('/');

  const hlblock = hljs.highlightAuto(data.content);

  return (
    <>
      <CodeIdProvider>
        <Toaster />

        <div className="min-h-screen w-full bg-[#393552] pt-2">
          <div className="flex h-14 w-full items-center justify-start bg-[#393552]">
            <div className="m-3 flex w-[85px] justify-between gap-1">
              <div className="h-5 w-5 rounded-full bg-[#EB6F92]"></div>
              <div className="h-5 w-5 rounded-full bg-[#F6C177]"></div>
              <div className="h-5 w-5 rounded-full bg-[#31748F]"></div>
            </div>
            <div className="flex w-full items-center justify-center">
              <p className="select-none font-fira text-xl text-[#9CCFD8]">
                /{data.codeShortId}
              </p>
              <CopyButton text={data.content} />
            </div>
          </div>

          <TextArea
            CodeArea={true}
            codeSnippet={hlblock.value || ''}
            views={data.views}
          />
        </div>
      </CodeIdProvider>
    </>
  );
}
