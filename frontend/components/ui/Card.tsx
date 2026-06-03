import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', glass = true, ...props }) => {
  const baseClasses = "rounded-2xl overflow-hidden transition-all duration-300";
  const glassClasses = glass ? "glass shadow-lg" : "bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border shadow-sm";
  
  return (
    <div className={`${baseClasses} ${glassClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-4 border-b border-slate-200/50 dark:border-slate-700/50 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className = '', ...props }) => (
  <h3 className={`text-lg font-semibold text-slate-800 dark:text-slate-100 ${className}`} {...props}>
    {children}
  </h3>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);