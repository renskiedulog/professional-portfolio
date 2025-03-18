import React from "react";

interface ContainerProps<T extends React.ElementType = "div">
  extends React.HTMLAttributes<T> {
  as?: T;
  children: React.ReactNode;
}

const Container = <T extends React.ElementType = "div">({
  as,
  children,
  className,
  ...props
}: ContainerProps<T>) => {
  const Component = as || "div";
  return (
    <Component
      className={`max-w-5xl mx-auto py-5 ${className ?? ""}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Container;
