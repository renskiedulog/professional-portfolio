import React from "react";

const Heading = ({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h2
      className={`text-3xl font-black text-primary/80 dark:text-primary ${className}`}
    >
      {children}
    </h2>
  );
};

export default Heading;
