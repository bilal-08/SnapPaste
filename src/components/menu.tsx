'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useCodeIdContext } from '@/store/context';
import { toast } from 'sonner';
import axios from 'axios'

export default function Menu({
  textContent,
  views,
}: {
  textContent: string;
  views?: number;
}) {
  const [prevScrollPos, setPrevScrollPos] = useState(
    typeof window !== 'undefined' ? window.scrollY : 0,
  );
  const [visible, setVisible] = useState(true);
  const [isBurnEnabled, setIsBurnEnabled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const router = useRouter();
  const params = useParams();
  const isPaste = params.codeId ? true : false;
  const { dynamicData: codeId } = useCodeIdContext();

  useEffect(() => {
    setCurrentUrl(window.location.href);
    const handleResize = () => {
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isSmallScreen);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const saveCode = async () => {
    if (!textContent) return void null;
  
    const toastId = toast('loading...', {
      position: isMobile ? 'top-center' : 'bottom-right',
    });
    toast.loading('Saving your paste...', {
      id: toastId,
      style: {
        background: '#26233a',
        color: 'white',
        border: '2px solid#9CCFD8',
      },
    });
    
    try {
      const response = await axios.post('/api/code', {
        content: textContent,
        codeId,
        singleViewBurn: isBurnEnabled,
      });
      if (response.status === 200) {
        toast.success('The paste is saved! redirecting...', {
          id: toastId,
        });
        setTimeout(() => {
          router.push('/' + response.data);
        }, 500);
      } else {
        // Handle non-200 status codes
        toast.error(response.data || 'An error occurred while saving the paste', {
          id: toastId,
        });
      }
    } catch (error) {
      // Handle fetch errors
      console.error('An error occurred during the Axios request:', error);
      toast.error('An error occurred while saving the paste', {
        id: toastId,
      });
    }
  };
  

  const shareContent = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'paste shared from SnapPaste',
          text: 'code snippet shared from SnapPaste',
          url: currentUrl,
        })
        .then(() => console.log('Successfully shared'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
      console.log('Web Share API is not supported in this browser');
    }
  };

  const handleRedirect = () => {
    const gitrepo = 'https://github.com/bilal-08/SnapPaste';
    router.push(gitrepo);
  };
  const toggleViewBurn = async () => {
    setIsBurnEnabled((view) => !view);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [prevScrollPos]);
  return (
    <>
      <div
        className={`fixed bottom-0 flex w-full justify-start bg-[#1F1D2E] py-1 text-white transition-transform duration-700  ease-out ${
          visible ? 'translate-y-0' : 'translate-y-36'
        }`}
      >
        <p className="max-sm:text-md animate-textShine ml-3 w-3/4 select-none bg-gradient-to-r from-[#31748f] via-[#c4a7e7] to-[#f6c177] bg-clip-text font-fira text-xl font-black text-transparent">
          SnapPaste
        </p>

        {views ? (
          <p className="text-md mr-5 w-1/4 select-none self-center justify-self-end text-right font-fira text-[#908caa] max-sm:text-sm">
            Views:{views}
          </p>
        ) : (
          ''
        )}
        <div
          className={`ease-ou fixed bottom-14 left-1/2 flex h-20 w-64 -translate-x-1/2 transform items-center justify-between rounded-2xl bg-[#26233A] p-8 py-4 transition-transform duration-700 max-sm:h-12 max-sm:w-44 max-sm:rounded-xl max-sm:p-4 ${
            visible ? 'translate-y-0' : 'translate-y-36'
          }`}
        >
          <button onClick={saveCode} disabled={isPaste}>
            <svg
              className={`h-6 w-6 transition-colors max-sm:h-5 max-sm:w-5   ${isPaste ? 'text-[#908caa]' : 'text-[#9CCFD8] hover:text-[#f6c177]'}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18 19H19V6.82843L17.1716 5H16V9H7V5H5V19H6V12H18V19ZM4 3H18L20.7071 5.70711C20.8946 5.89464 21 6.149 21 6.41421V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM8 14V19H16V14H8Z"></path>
            </svg>
          </button>
          <button onClick={toggleViewBurn} disabled={isPaste}>
            <svg
              className={`h-[25px] w-[23px] transition-colors max-sm:h-[20px] max-sm:w-[18px] ${isBurnEnabled ? 'text-[#EB6F92]' : isPaste ? 'text-[#908caa]' : 'text-[#9CCFD8] hover:text-[#c4a7e7]'} `}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 23C16.1421 23 19.5 19.6421 19.5 15.5C19.5 14.6345 19.2697 13.8032 19 13.0296C17.3333 14.6765 16.0667 15.5 15.2 15.5C19.1954 8.5 17 5.5 11 1.5C11.5 6.49951 8.20403 8.77375 6.86179 10.0366C5.40786 11.4045 4.5 13.3462 4.5 15.5C4.5 19.6421 7.85786 23 12 23ZM12.7094 5.23498C15.9511 7.98528 15.9666 10.1223 13.463 14.5086C12.702 15.8419 13.6648 17.5 15.2 17.5C15.8884 17.5 16.5841 17.2992 17.3189 16.9051C16.6979 19.262 14.5519 21 12 21C8.96243 21 6.5 18.5376 6.5 15.5C6.5 13.9608 7.13279 12.5276 8.23225 11.4932C8.35826 11.3747 8.99749 10.8081 9.02477 10.7836C9.44862 10.4021 9.7978 10.0663 10.1429 9.69677C11.3733 8.37932 12.2571 6.91631 12.7094 5.23498Z"></path>
            </svg>
          </button>
          <button
            onClick={() => {
              router.push('/');
            }}
            disabled={!isPaste}
          >
            <svg
              className={`h-[25px] w-[23px] transition-colors max-sm:h-[20px] max-sm:w-[18px] ${isPaste ? 'text-[#9CCFD8] hover:text-[#D7827E]' : 'text-[#908caa]'} `}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="240"
              height="240"
              fill="currentColor"
            >
              <path d="M15 4H5V20H19V8H15V4ZM3 2.9918C3 2.44405 3.44749 2 3.9985 2H16L20.9997 7L21 20.9925C21 21.5489 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918ZM11 11V8H13V11H16V13H13V16H11V13H8V11H11Z"></path>
            </svg>
          </button>
          <button onClick={shareContent} disabled={!isPaste}>
            <svg
              className={`h-[23px] w-[25.5px] transition-colors max-sm:h-[18px] max-sm:w-[20.5px] ${isPaste ? 'text-[#9CCFD8] hover:text-[#31748f]' : 'text-[#908caa]'}  `}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="240"
              height="240"
              fill="currentColor"
            >
              <path d="M13.1202 17.0228L8.92129 14.7324C8.19135 15.5125 7.15261 16 6 16C3.79086 16 2 14.2091 2 12C2 9.79086 3.79086 8 6 8C7.15255 8 8.19125 8.48746 8.92118 9.26746L13.1202 6.97713C13.0417 6.66441 13 6.33707 13 6C13 3.79086 14.7909 2 17 2C19.2091 2 21 3.79086 21 6C21 8.20914 19.2091 10 17 10C15.8474 10 14.8087 9.51251 14.0787 8.73246L9.87977 11.0228C9.9583 11.3355 10 11.6629 10 12C10 12.3371 9.95831 12.6644 9.87981 12.9771L14.0788 15.2675C14.8087 14.4875 15.8474 14 17 14C19.2091 14 21 15.7909 21 18C21 20.2091 19.2091 22 17 22C14.7909 22 13 20.2091 13 18C13 17.6629 13.0417 17.3355 13.1202 17.0228ZM6 14C7.10457 14 8 13.1046 8 12C8 10.8954 7.10457 10 6 10C4.89543 10 4 10.8954 4 12C4 13.1046 4.89543 14 6 14ZM17 8C18.1046 8 19 7.10457 19 6C19 4.89543 18.1046 4 17 4C15.8954 4 15 4.89543 15 6C15 7.10457 15.8954 8 17 8ZM17 20C18.1046 20 19 19.1046 19 18C19 16.8954 18.1046 16 17 16C15.8954 16 15 16.8954 15 18C15 19.1046 15.8954 20 17 20Z"></path>
            </svg>
          </button>
          <button onClick={handleRedirect}>
            <svg
              className="h-[24.5px] w-[22.5px] text-[#9CCFD8] transition-colors hover:text-[#c4a7e7] max-sm:h-[19.5px] max-sm:w-[17.5px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M5.88401 18.6533C5.58404 18.4526 5.32587 18.1975 5.0239 17.8369C4.91473 17.7065 4.47283 17.1524 4.55811 17.2583C4.09533 16.6833 3.80296 16.417 3.50156 16.3089C2.9817 16.1225 2.7114 15.5499 2.89784 15.0301C3.08428 14.5102 3.65685 14.2399 4.17672 14.4263C4.92936 14.6963 5.43847 15.1611 6.12425 16.0143C6.03025 15.8974 6.46364 16.441 6.55731 16.5529C6.74784 16.7804 6.88732 16.9182 6.99629 16.9911C7.20118 17.1283 7.58451 17.1874 8.14709 17.1311C8.17065 16.7489 8.24136 16.3783 8.34919 16.0358C5.38097 15.3104 3.70116 13.3952 3.70116 9.63971C3.70116 8.40085 4.0704 7.28393 4.75917 6.3478C4.5415 5.45392 4.57433 4.37284 5.06092 3.15636C5.1725 2.87739 5.40361 2.66338 5.69031 2.57352C5.77242 2.54973 5.81791 2.53915 5.89878 2.52673C6.70167 2.40343 7.83573 2.69705 9.31449 3.62336C10.181 3.41879 11.0885 3.315 12.0012 3.315C12.9129 3.315 13.8196 3.4186 14.6854 3.62277C16.1619 2.69 17.2986 2.39649 18.1072 2.52651C18.1919 2.54013 18.2645 2.55783 18.3249 2.57766C18.6059 2.66991 18.8316 2.88179 18.9414 3.15636C19.4279 4.37256 19.4608 5.45344 19.2433 6.3472C19.9342 7.28337 20.3012 8.39208 20.3012 9.63971C20.3012 13.3968 18.627 15.3048 15.6588 16.032C15.7837 16.447 15.8496 16.9105 15.8496 17.4121C15.8496 18.0765 15.8471 18.711 15.8424 19.4225C15.8412 19.6127 15.8397 19.8159 15.8375 20.1281C16.2129 20.2109 16.5229 20.5077 16.6031 20.9089C16.7114 21.4504 16.3602 21.9773 15.8186 22.0856C14.6794 22.3134 13.8353 21.5538 13.8353 20.5611C13.8353 20.4708 13.836 20.3417 13.8375 20.1145C13.8398 19.8015 13.8412 19.599 13.8425 19.4094C13.8471 18.7019 13.8496 18.0716 13.8496 17.4121C13.8496 16.7148 13.6664 16.2602 13.4237 16.051C12.7627 15.4812 13.0977 14.3973 13.965 14.2999C16.9314 13.9666 18.3012 12.8177 18.3012 9.63971C18.3012 8.68508 17.9893 7.89571 17.3881 7.23559C17.1301 6.95233 17.0567 6.54659 17.199 6.19087C17.3647 5.77663 17.4354 5.23384 17.2941 4.57702L17.2847 4.57968C16.7928 4.71886 16.1744 5.0198 15.4261 5.5285C15.182 5.69438 14.8772 5.74401 14.5932 5.66413C13.7729 5.43343 12.8913 5.315 12.0012 5.315C11.111 5.315 10.2294 5.43343 9.40916 5.66413C9.12662 5.74359 8.82344 5.69492 8.57997 5.53101C7.8274 5.02439 7.2056 4.72379 6.71079 4.58376C6.56735 5.23696 6.63814 5.77782 6.80336 6.19087C6.94565 6.54659 6.87219 6.95233 6.61423 7.23559C6.01715 7.8912 5.70116 8.69376 5.70116 9.63971C5.70116 12.8116 7.07225 13.9683 10.023 14.2999C10.8883 14.3971 11.2246 15.4769 10.5675 16.0482C10.3751 16.2156 10.1384 16.7802 10.1384 17.4121V20.5611C10.1384 21.5474 9.30356 22.2869 8.17878 22.09C7.63476 21.9948 7.27093 21.4766 7.36613 20.9326C7.43827 20.5204 7.75331 20.2116 8.13841 20.1276V19.1381C7.22829 19.1994 6.47656 19.0498 5.88401 18.6533Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
