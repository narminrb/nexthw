import React from "react";
import NavItems from "./NavItems";

const Header = () => {
  const items = [
    {
      name: "Home",
      url: "/",
      id: 1,
    },
    {
      name: "Shops",
      url: "/shops",
      id: 2,
    },
  ];
  return (
    <header className="lg:px-16 px-4 bg-white flex flex-wrap items-center py-4 shadow-md">
      <div className="flex-1 flex justify-between items-center">
        <a href="#" className="text-xl">
          E-Commerce
        </a>
      </div>

      <label htmlFor="menu-toggle" className="pointer-cursor md:hidden block">
        <svg
          className="fill-current text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </label>
      <input className="hidden" type="checkbox" id="menu-toggle" />

      <div
        className="hidden md:flex md:items-center md:w-auto w-full"
        id="menu"
      >
        <NavItems navItems={items} />
      </div>
    </header>
  );
};

export default Header;