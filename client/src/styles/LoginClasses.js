import clsx from "clsx";

// Login styles //
export const loginContainerClasses = clsx(
  "h-screen w-screen bg-white",
  "grid grid-cols-1 md:grid-cols-2" 
);

export const formContainerClasses = clsx(
  "grid place-items-center",
  "order-2 md:order-1"
);

export const introContainerClasses = clsx(
  "grid place-items-center",
  "bg-gradient-to-tr from-blue-900 to-teal-900",
  "rounder-none",
  "md:rounded-l-[70%]",
  "p-6 md:p-12",
  "order-1 md:order-2"
);

export const textContainerClasses = clsx(
  "grid grid-cols-1", 
  "text-center sm:text-left",
  "w-full max-w-md space-y-4 text-white",
  "w-[90%]"
);

export const heroClasses = clsx(
  "text-4xl font-bold"
);

export const introTextClasses = clsx(
  "text-lg"
);

export const blockqouteClass = clsx(
  "mt-6 italic text-white/80"
);

export const ulClasses = clsx(
  "flex flex-col items-center sm:items-start",
  "mt-6 space-y-4"
);

export const liClasses = clsx(
  "flex items-center space-x-2"
);

export const iconClasses = clsx(
  "w-6 h-6 text-white"
);

// Form styles //

export const formClasses = clsx(
  "w-[90%] max-w-md space-y-6",
  "p-6",
  "md:shadow-2xl md:shadow-blue-900/30 md:rounded-2xl md:bg-white"
);

export const h2Classes = clsx(
  "text-2xl font-bold text-center"
);

export const inputContainerClasses = clsx(
  "mb-5 text-l"
);

export const labelClasses = clsx(
  "font-bold"
);

export const inputClasses = clsx(
  "w-full p-2.5",
  "placeholder-gray-400 transition",
  "border text-gray-900",
  "rounded-lg block"
);

export const checkClasses = clsx(
  "text-black  cursor-pointer"
);

export const checkLabelClasses = clsx(
  "ms-2 text-sm font-medium text-black  cursor-pointer"
);

export const buttonClasses = clsx(
  "bg-gradient-to-tr from-blue-900 to-teal-900", 
  "hover:bg-blue-800 focus:ring-4 focus:outline-none",
  "focus:ring-blue-300 font-medium",
  "rounded-lg text-sm w-full cursor-pointer",
  "px-5 py-2.5 text-center text-white"
);