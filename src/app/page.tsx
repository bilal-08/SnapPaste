import TextArea from '@/components/TextArea';
import { EditableText } from '@/components/EditableText';
import { CodeIdProvider } from '@/store/context';
import { Toaster } from 'sonner';
export default function Home() {
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
              <div className="flex font-fira text-xl text-[#9CCFD8]">
                /<EditableText />{' '}
              </div>
              <svg
                className="m-3 h-4 w-4 text-[#b5e3ea] transition-colors hover:text-[#7bc6d3]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16.7574 2.99677L14.7574 4.99677H5V18.9968H19V9.23941L21 7.23941V19.9968C21 20.5491 20.5523 20.9968 20 20.9968H4C3.44772 20.9968 3 20.5491 3 19.9968V3.99677C3 3.44448 3.44772 2.99677 4 2.99677H16.7574ZM20.4853 2.09727L21.8995 3.51149L12.7071 12.7039L11.2954 12.7063L11.2929 11.2897L20.4853 2.09727Z"></path>
              </svg>
            </div>
          </div>

          <TextArea CodeArea={false} />
        </div>
      </CodeIdProvider>
    </>
  );
}
