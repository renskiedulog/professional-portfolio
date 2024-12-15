import React from "react";

const AboutMe = () => {
  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-black text-primary/80 dark:text-primary">
        About Me
      </h2>
      <p>
        In early 2022, I discovered programming and immediately realized it was
        a field I could excel in and never tire of. My passion for gaming, which
        began at the age of 7, greatly contributed to my journey into
        programming. Got into a scholarship in{" "}
        <a
          href="https://www.passerellesnumeriques.org/"
          className="underline"
          target="_blank"
        >
          Passarelles Numériques
        </a>{" "}
        where I pursued a Certificate in Computer Technology, completed a 10
        months internship at{" "}
        <a href="https://webriq.com" className="underline" target="_blank">
          WebriQ
        </a>
        , and am now dedicated to continuing this path, striving for growth and
        life stability.
      </p>
    </div>
  );
};

export default AboutMe;
