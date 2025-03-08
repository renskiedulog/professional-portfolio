import React from "react";
import Heading from "../global-components/heading";

const AboutMe = () => {
  return (
    <div className="space-y-3">
      <Heading>About Me</Heading>
      <p>
        In late 2022, I discovered programming and immediately realized it was
        something I really had great affinity with. My passion for computer and gaming, which
        began at the age of 7, greatly contributed to my journey into
        programming. Just when I decided to not pursue college due to financial issues, I
        luckily got into a scholarship in{" "}
        <a
          href="https://www.passerellesnumeriques.org/"
          className="underline"
          target="_blank"
        >
          Passarelles Numériques Philippines
        </a>{" "}
        where I pursued a Certificate in Computer Technology at the{" "}
        <a href="https://usc.edu.ph/" target="_blank" className="underline">
          University Of San Carlos
        </a>
        , completed a 10 months internship at{" "}
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
