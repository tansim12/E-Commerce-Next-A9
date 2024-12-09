"use client";
import { categoryData, premiumData } from "@/src/Constant/filter.const";
import { useUser } from "@/src/Context/user.context";
import { usePublicFindAllCategoryAndSubCategory } from "@/src/hooks/categoryAndSubCategory.hook";
import useDebounce from "@/src/hooks/useDebounce";
import { TQueryParams } from "@/src/Types/Filter/filter.type";
import { Input } from "@nextui-org/react";
import React, { EventHandler, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Slider } from "@nextui-org/react";

const PostFilterSidebar = () => {
  const [value, setValue] = React.useState([0, 10000]);

  const { data: categories } = usePublicFindAllCategoryAndSubCategory();
  const { setParams } = useUser();
  const [filters, setFilters] = useState<TQueryParams[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const handleFilterChange = (e: any) => {
    const { name, value, checked, type } = e.target;

    setFilters((prevFilters: TQueryParams[]) => {
      if (type === "checkbox") {
        if (checked) {
          // Add the {name, value} object dynamically to the array
          return [...prevFilters, { name, value }];
        } else {
          // Remove the unchecked value from the array dynamically
          return prevFilters.filter(
            (filter) => !(filter.name === name && filter.value === value)
          );
        }
      } else {
        // Handle dynamic fields (e.g., radio, text, etc.)
        const existingFilterIndex = prevFilters.findIndex(
          (filter) => filter.name === name
        );

        if (existingFilterIndex > -1) {
          // If the field already exists, update the value
          const updatedFilters = [...prevFilters];
          updatedFilters[existingFilterIndex] = { name, value };
          return updatedFilters;
        } else {
          // Add a new filter dynamically
          return [...prevFilters, { name, value }];
        }
      }
    });
  };

  const searchTerm = useDebounce(searchValue, 700); // Debouncing with 500ms delay
  useEffect(() => {
    if (searchTerm) {
      // This will trigger after 500ms delay when the user stops typing
      setFilters((pre) => [...pre, { name: "searchTerm", value: searchTerm }]);
      // Call your search API or filtering function here
    } else {
      const filterOtherValue = filters?.filter(
        (filter) => !(filter.name === "searchTerm")
      );
      setFilters(filterOtherValue);
    }
  }, [searchTerm]);

  //   const searchTerm = useDebounce(searchValue, 700);
  useEffect(() => {
    const priceRange = [
      { name: "priceStart", value: 0 },
      { name: "priceEnd", value: 10000 },
    ];
    setParams([...filters, ...priceRange]);

    console.log([...filters, ...priceRange], ".........");

    // setParams([...filters]);
  }, [filters, searchTerm]);

  return (
    <div>
      {/* Scrollable container with Tailwind scrollbar classes */}
      <div className="h-[85vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-bgColor scroll-smooth">
        {/* NextUI Search Input */}
        <div className="w-full mb-4">
          <Input
            // // clearable
            // underlined
            aria-label="Search"
            fullWidth
            placeholder="Search..."
            endContent={<FiSearch size={20} />}
            onChange={(e) => setSearchValue(e.target.value)} // Update search value on change
          />
        </div>

        <div>
          <Slider
            className="max-w-md"
            formatOptions={{ style: "currency", currency: "BDT" }}
            label="Budget"
            maxValue={10000}
            minValue={0}
            step={1000}
            value={value}
            onChange={setValue as any}
          />
        </div>

        {/* Categories rendering */}
        {categories?.reverse()?.map((category: any) => (
          <section key={category.id} className="mt-2">
            <details className="rounded-md p-1" open={false}>
              <summary className="cursor-pointer text-white p-2 rounded-md">
                {category.categoryName}
              </summary>

              <div className="mt-2 pl-4">
                {/* Render Subcategories only if they exist */}
                {category.subCategory.length > 0
                  ? category.subCategory.map((sub: any) => (
                      <label
                        key={sub.id}
                        className="text-sm text-gray-500 flex items-center gap-2 mt-1"
                      >
                        <input
                          type="checkbox"
                          name="subCategoryId"
                          value={sub.id}
                          className="h-4 w-4"
                          onChange={handleFilterChange} // Handle checkbox changes
                        />
                        {sub.categoryName}
                      </label>
                    ))
                  : ""}
              </div>
            </details>
          </section>
        ))}
      </div>
    </div>
  );
};

export default PostFilterSidebar;
