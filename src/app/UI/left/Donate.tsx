import Image from "next/image";
import Link from "next/link";
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
          >
            <Image
              src="/kofi.webp"
              alt="Buy Me a Coffee at ko-fi.com"
              height={150}
              width={150}
            />
          </Link>
          {/* <a
            href="https://www.buymeacoffee.com/renatodulog"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="buy-me-a-coffee-logo"
              src="https://img.buymeacoffee.com/button-api/?text=Buy Me A Coffee&emoji=&slug=renatodulog&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"
            />
          </a> */}
        </div>
      </div>
    </>
  );
};

export default Donate;
