import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children, className, ...props }) => {
  return (
    <div className={`max-w-5xl mx-auto py-5 ${className ?? ""}`} {...props}>
      {children}
    </div>
  );
};

export default Container;
