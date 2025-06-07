import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import React from "react";

const Donate = () => {
  return (
    <>
      <div>
        <h2 className="font-bold text-primary/90">Donate</h2>
        <div className="flex md:flex-col gap-2 justify-center mt-2 md:flex-nowrap flex-wrap">
          <Link
            href="https://ko-fi.com/X7X31EMD3Z"
            target="_blank"
            rel="noopener noreferrer"
            className="group pl-2 pr-4 rounded-xl pb-1.5 pt-1 flex gap-1 item-end bg-red-400 w-max"
          >
            <Image
              width={40}
              height={40}
              src="/kofi-coin.gif"
              alt="kofi-gif"
              className="object-contain"
              unoptimized
            />

            <Image
              width={100}
              height={100}
              src="/kofi-logo.png"
              alt="Buy Me a Coffee at ko-fi.com"
              className="h-auto w-16 object-contain translate-y-0.5"
            />
          </Link>
          <a
            href="https://www.buymeacoffee.com/renatodulog"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="https://img.buymeacoffee.com/button-api/?text=Buy Me A Coffee&emoji=&slug=renatodulog&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Donate;
