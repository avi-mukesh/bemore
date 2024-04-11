import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const formatDateToLocal = (
  date : string | Date,
  locale: string = 'en-GB',
) => {
  const dateObj = typeof date ==="string" ? new Date(date) : date;
  // const options: Intl.DateTimeFormatOptions = {
  //   day: 'numeric',
  //   month: 'short',
  //   year: 'numeric',
  // };
  const formatter = new Intl.DateTimeFormat(locale, {dateStyle:"long"});
  return formatter.format(dateObj);
};