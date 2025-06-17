import React from "react";
type HeadingProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
  unset?: boolean;
} & React.ComponentPropsWithoutRef<T>;

const Heading = <T extends React.ElementType = "h2">({
  as: Tag = "h2",
  className = "",
  children,
  unset = false,
  ...rest
}: HeadingProps<T>) => {
  return (
    <Tag
      className={`${!unset ? "text-3xl font-black text-primary/80 dark:text-primary font-geist" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Heading;
