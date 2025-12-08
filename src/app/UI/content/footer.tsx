import React from "react";
import ContactForm from "./contact-form";
import Crown from "../global-components/crown";

const Footer = () => {
  return (
    <footer className="w-full pt-5 space-y-5">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-geist">
          Want to work with me on projects?
        </h2>
        <p className="text-lg px-3 sm:px-0">
          Feel free to send a message on{" "}
          <a
            className="text-blue-700 hover:text-primary underline"
            href="https://web.facebook.com/renato.dulog"
          >
            Facebook
          </a>{" "}
          or{" "}
          <a
            className="text-blue-700 hover:text-primary underline"
            href="https://www.linkedin.com/in/renato-dulog/"
          >
            LinkedIn
          </a>
          .
        </p>
      </div>
      <div className="relative flex justify-center items-center gap-5">
        <Crown>Or Use The Form Below</Crown>
      </div>
      <ContactForm />
      {/* Copyright */}
      <p className="text-sm text-primary/70 text-center">
        © {new Date().getFullYear()} Renato Dulog. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
