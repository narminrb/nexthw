"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { QUERY_KEYS } from "@/api/QueryKeys";
import { getApiData } from "@/api/http";

const ShopDetailContainer = () => {
  const { slug } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.SHOP_DETAIL, slug],
    queryFn: async () =>
      await getApiData(`/shop?populate=*&filters[id]=${slug}`),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error...</div>;
  }
  return (
    <div className="container mx-auto">
      <div className=" grid grid-cols-2  gap-4 my-20">
        <div className="w-full h-[400px] relative overflow-hidden rounded-2xl">
          <Image
            fill
            className="absolute top-0 left-0 object-cover w-full h-full"
            sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
            src={`http://localhost:1337${data?.data[0]?.image?.url}`}
            alt="shop"
          />
        </div>
        <div>
          <h1>{data?.data[0]?.title}</h1>
          <p>{data?.data[0]?.desc}</p>
          <p>{data?.data[0]?.price}AZN</p>
        </div>
      </div>
    </div>
  );
};

export default ShopDetailContainer;