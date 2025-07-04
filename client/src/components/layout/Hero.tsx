import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const Hero = () => {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl" 
        aria-hidden="true"
      >
        <div 
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#b91c1c] to-[#ef4444] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
          <div className="flex mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 backdrop-blur-2xl">
              <Logo variant="compact" />
            </div>
          </div>
          
          <h1 className="mt-10 max-w-lg text-4xl font-bold tracking-tight sm:text-6xl">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-red-500">Face</span>
            <span className="text-primary">Detect</span>
            <span className="block font-medium text-2xl sm:text-3xl mt-2 text-foreground">Smart Attendance System</span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Streamline attendance tracking with advanced facial recognition technology. 
            Accurate, efficient, and secure attendance management for educational institutions and organizations.
          </p>
          
          <div className="mt-8">
            <h3 className="text-base font-semibold text-foreground mb-4">Smart features include:</h3>
            <ul className="space-y-3">
              {[
                "Biometric facial recognition",
                "Real-time attendance tracking",
                "Comprehensive attendance analytics",
                "Automated reporting system"
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-10 flex items-center gap-x-6">
            <Button asChild size="lg" className="gap-2 shadow-md">
              <Link to="/login">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
        
        <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
          <div className="relative mx-auto bg-black shadow-2xl rounded-2xl overflow-hidden w-full max-w-md aspect-[4/3]">
            {/* Glass effect card with logo */}
            <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm bg-gradient-to-br from-red-900/20 to-black/40 border border-white/10">
              <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/10 backdrop-blur-md shadow-xl">
                <Logo variant="hero" className="scale-150 mb-12" />
                
                <div className="mt-8 flex flex-col items-center space-y-2 text-center">
                  <div className="text-sm font-medium text-white/60">Secure. Fast. Accurate.</div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-600 to-red-500 w-4/5 rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-xs text-white/40">Facial recognition in progress</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient */}
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ef4444] to-[#b91c1c] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}
        ></div>
      </div>
    </div>
  );
};

export default Hero; 