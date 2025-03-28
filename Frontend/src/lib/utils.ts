import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from 'react-toastify';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cleanErrorMessage = (message: string): string => {
  let cleaned = message.replace(/^Error:\s*/, '');
  cleaned = cleaned.split(/\s+at\s/)[0];
  return cleaned.trim();
};


export const displayError = (message: string) => {
  const cleanedMessage = cleanErrorMessage(message);
  toast.error(cleanedMessage, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "bg-red-600 text-white font-semibold",
  });
};

export const extractErrorMessage = (html: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const pre = doc.querySelector('pre');
  return pre ? pre.textContent || 'An unknown error occurred' : 'An unknown error occurred';
};
