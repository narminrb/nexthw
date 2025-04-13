"use client";
import React, { use, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { QUERY_KEYS } from "@/api/QueryKeys";
import { getApiData } from "@/api/http";
import ShopCards from "./ShopCards";

const ShopContainer = () => {
  const ref = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const [pageSize, setPageSize] = React.useState(4);
  const [pageLimit, setPageLimit] = React.useState(
    Number(searchParams.get("page")) || 1
  );
  const [searchquery, setSearchQuery] = React.useState<string>("");
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [categoryFilter, setCategoryFilter] = React.useState<string[]>([]);
  const [startValue, setStartValue] = React.useState<number>(0);
  const [endValue, setEndValue] = React.useState<number>(10000);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      QUERY_KEYS.GET_SHOPS,
      pageLimit,
      categoryFilter,
      searchTerm,
      startValue,
      endValue,
    ],
    queryFn: async () => {
      const categoryFilters = categoryFilter
        .map(
          (data, i) =>
            `filters[categories][name][$in][${i}]=${encodeURIComponent(data)}`
        )
        .join("&");

      const url = `/shops?populate=*&pagination[pageSize]=${pageSize}&pagination[page]=${pageLimit}&${categoryFilters}
        &filters[price][$gte]=${startValue}&filters[price][$lte]=${endValue}&filters[title][$containsi]=${encodeURIComponent(
        searchTerm
      )}`;
      return await getApiData(url);
    },
  });
  const {
    data: categories,
    isLoading: categoryIsLoading,
    isError: categoryIsErr,
  } = useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: async () => await getApiData(`/categories?populate=*`),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return (
      <div className="bg-red-100 text-red-500">{error.message as string}</div>
    );
  }
  const totalPage = Math.ceil(data?.meta?.pagination?.total / pageSize);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          <h2>FIlter Price</h2>
          <div className="flex items-center justify-between">
            <span>Min: {startValue}</span>
            <span>Max: {endValue}</span>
          </div>
          <h1>Categories</h1>
          {categories?.data?.map((category: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <input
                onChange={(e: any) => {
                  if (e.target.checked) {
                    setCategoryFilter([...categoryFilter, category.name]);
                  } else {
                    setCategoryFilter(
                      categoryFilter.filter((item) => item !== category.name)
                    );
                  }
                }}
                type="checkbox"
                className="w-4 h-4"
                id={category.id}
                checked={categoryFilter.includes(category.name)}
                name={category.name}
              />
              <label htmlFor={category.id}>{category.name}</label>
            </div>
          ))}
        </div>
        <div className="col-span-9">
          <div className="my-4 ">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded px-4 py-2"
              value={searchquery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
              onClick={() => {
                setSearchTerm(searchquery);
              }}
            >
              Search
            </button>
          </div>
          <div ref={ref} className="grid grid-cols-4 gap-4">
            {data &&
              data?.data?.map((shop: any, index: number) => (
                <ShopCards
                  key={index}
                  categories={shop?.categories}
                  desc={shop?.desc}
                  title={shop?.title}
                  price={shop?.price}
                  image={shop?.image.url}
                  link={`/shops/${shop.id}`}
                />
                
              ))}
          </div>
          <div className="flex items-center justify-center gap-2.5 my-4">
            <button
              onClick={() => {
                if (pageLimit > 1) {
                  setPageLimit(pageLimit - 1);
                  router.push(`?page=${pageLimit - 1}`);
                  ref.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest",
                  });
                }
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Previous
            </button>
            <div>
              Page {pageLimit} of {totalPage}
            </div>
            <button
              onClick={() => {
                if (pageLimit < totalPage) {
                  setPageLimit(pageLimit + 1);
                  router.push(`?page=${pageLimit + 1}`);
                  ref.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest",
                  });
                }
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopContainer;