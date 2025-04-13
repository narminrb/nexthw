import { CardComponentProps } from "@/global";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";


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
      <div className="w-full relative h-[350px] overflow-hidden rounded-2xl">
        <img
          alt="shop"
          className="absolute top-0 left-0 object-cover w-full h-full"
          sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          src={`http://localhost:1337${image}`}

        />
      </div>
      <div className="my-4 text-center">
        <h2>{title}</h2>
        <p>Shop At {price}</p>
        {categories && (
          <div className="flex items-center justify-center gap-2">
            {categories?.map((category: any, index: number) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm"
              >
                {category?.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ShopCards;