import React from "react";
import { Link } from "react-router-dom";
import { Camera } from "lucide-react";

interface LogoProps {
  variant?: "default" | "compact" | "hero";
  className?: string;
}

const Logo = ({ variant = "default", className = "" }: LogoProps) => {
  return (
    <Link 
      to="/" 
      className={`flex items-center gap-2 font-bold pl-2 ${className}`}
    >
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-500 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative h-10 w-10 flex items-center justify-center bg-gradient-to-br from-black to-neutral-900 rounded-lg shadow-lg transition-all duration-300 group-hover:scale-105">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6"
          >
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path 
              d="M12 3.5C7.02944 3.5 3 7.52944 3 12.5C3 17.4706 7.02944 21.5 12 21.5C16.9706 21.5 21 17.4706 21 12.5C21 7.52944 16.9706 3.5 12 3.5Z" 
              stroke="url(#logoGradient)" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="animate-pulse"
              filter="url(#glow)"
            />
            <path 
              d="M8 7.5V9.5M12 7.5V9.5M16 7.5V9.5M8 15.5V17.5M12 15.5V17.5M16 15.5V17.5" 
              stroke="url(#logoGradient)" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="animate-pulse" 
              style={{ animationDelay: "0.3s" }}
              filter="url(#glow)"
            />
            <path 
              d="M9 11C9.55228 11 10 10.5523 10 10C10 9.44772 9.55228 9 9 9C8.44772 9 8 9.44772 8 10C8 10.5523 8.44772 11 9 11Z"
              fill="url(#logoGradient)"
              className="animate-pulse" 
              style={{ animationDelay: "0.1s" }}
            />
            <path 
              d="M15 11C15.5523 11 16 10.5523 16 10C16 9.44772 15.5523 9 15 9C14.4477 9 14 9.44772 14 10C14 10.5523 14.4477 11 15 11Z"
              fill="url(#logoGradient)"
              className="animate-pulse" 
              style={{ animationDelay: "0.1s" }}
            />
            <path 
              d="M9 14.5C9 14.5 10 16 12 16C14 16 15 14.5 15 14.5" 
              stroke="url(#logoGradient)" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="animate-pulse" 
              style={{ animationDelay: "0.4s" }}
              filter="url(#glow)"
            />
          </svg>
          <div className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-red-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
        </div>
      </div>
      
      {variant !== "compact" && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center">
            <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-red-500">Face<span className="text-primary">Detect</span></span>
            {variant === "hero" && (
              <div className="ml-1.5 px-1.5 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-md">v1.0</div>
            )}
          </div>
          <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
            Attendance System
          </span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
