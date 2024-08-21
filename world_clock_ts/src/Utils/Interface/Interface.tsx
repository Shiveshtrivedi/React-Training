import { ReactNode } from "react";

interface IClockProps {
  timeZone: string;
}

interface IFormattedTime {
    dateValue: string;
    timeValue: string;
    hourResult: string;
    meridian?: string;
  }

  interface IHeaderProps {
    isSignedIn: boolean;
    signOut: () => void;
  }
  interface ILoginProps {
    signIn: () => void;
  }
  
  interface IPerson {
    id: number;
    name: string;
    username: string;
    password: string;
  }

  interface IProtectedProps {
    isSignedIn: boolean;
    children: ReactNode;
  }
  

  
export type {IClockProps,IFormattedTime,IHeaderProps,ILoginProps,IPerson,IProtectedProps};
