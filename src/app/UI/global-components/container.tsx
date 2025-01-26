import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-5xl mx-auto py-5">{children}</div>;
};

export default Container;
