import { CardComponentProps } from "@/global";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import './style.css';
import "remixicon/fonts/remixicon.css";

const ShopCards: FC<CardComponentProps> = ({
  title,
  desc,
  price,
  image,
  onClick,
  link,
  categories,
}) => {
  return (
    <Link href={link} className="block w-full h-full">
      <div className="shopcard relative group">
        <div className="icon-column">
          <i className="ri-heart-line"></i>
          <i className="ri-shopping-cart-line"></i>
          <i className="ri-eye-line"></i>
          <i className="ri-share-line"></i>
        </div>
        <div className="cardimgbox">
          <img
            alt="shop"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={`http://localhost:1337${image}`}
          />
        </div>
        <div className="my-4">
          <h2 className="cardtitle">{title}</h2>
          <p className="cardprice">${price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ShopCards;
