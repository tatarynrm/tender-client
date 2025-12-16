"use client";
import NextNProgress from "nextjs-progressbar";
const ProgressBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NextNProgress
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={10}
        
        showOnShallow={true}
      />
      {children}
    </>
  );
};

export default ProgressBar;
