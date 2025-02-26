import React from "react";

const Heading = ({
  children,
  className = "",
  ...rest
}: {
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h2
      className={`text-3xl font-black text-primary/80 dark:text-primary font-geist ${className}`}
      {...rest}
    >
      {children}
    </h2>
  );
};

export default Heading;
