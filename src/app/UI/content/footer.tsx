import React from "react";
import ContactForm from "./contact-form";

const Footer = () => {
  return (
    <div className="w-full pt-5 space-y-5">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-geist">
          Want to work with me on projects?
        </h2>
        <h3 className="text-lg px-3 sm:px-0">
          Feel free to send a message on{" "}
          <a
            className="text-blue-500 hover:text-blue-700"
            href="https://web.facebook.com/renato.dulog"
          >
            Facebook
          </a>{" "}
          or{" "}
          <a
            className="text-blue-500 hover:text-blue-700"
            href="https://discord.com/users/901746145095712768"
          >
            Discord
          </a>
          .
        </h3>
      </div>
      <div className="relative flex justify-center items-center gap-5">
        <span className="bg-primary/30 h-[1px] w-28"></span>
        <p className="font-bold text-primary/50">OR</p>
        <span className="bg-primary/30 h-[1px] w-28"></span>
      </div>
      <ContactForm />
    </div>
  );
};

export default Footer;
