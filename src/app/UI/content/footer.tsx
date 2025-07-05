import React from "react";
import ContactForm from "./contact-form";

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
            className="text-blue-700 hover:text-blue-900"
            href="https://web.facebook.com/renato.dulog"
          >
            Facebook
          </a>{" "}
          or{" "}
          <a
            className="text-blue-700 hover:text-blue-900"
            href="https://discord.com/users/901746145095712768"
          >
            Discord
          </a>
          .
        </p>
      </div>
      <div className="relative flex justify-center items-center gap-5">
        <span className="bg-primary/30 h-[1px] w-28"></span>
        <p className="font-bold text-primary/50">OR</p>
        <span className="bg-primary/30 h-[1px] w-28"></span>
      </div>
      <ContactForm />
      {/* Copyright */}
      <p className="text-sm text-primary/70 text-center">
        © 2025 RD Works. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
