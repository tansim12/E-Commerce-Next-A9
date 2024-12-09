"use client";
import useDebounce from "@/src/hooks/useDebounce";
import { TQueryParams } from "@/src/Types/Filter/filter.type";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

const NavSearch = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [params, setParams] = useState<TQueryParams[] | []>([]);
  const searchTerm = useDebounce(searchValue, 1000); // Debouncing with 500ms delay
  useEffect(() => {
    if (searchTerm) {
      // This will trigger after 500ms delay when the user stops typing
      setParams((pre) => [...pre, { name: "searchTerm", value: searchTerm }]);
      // Call your search API or filtering function here
    } else {
      const filterOtherValue = params?.filter(
        (filter: any) => !(filter.name === "searchTerm")
      );
      setParams(filterOtherValue);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (params?.length > 0) {
      router.push(`/products?searchTerm=${params?.at(-1)?.value}`);
    }
  }, [params]);
  return (
    <div>
      <Input
        //   contentLeft={<FiSearch size={20} />}
        placeholder="Search..."
        aria-label="Search"
        fullWidth
        endContent={<FiSearch size={20} />}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default NavSearch;
