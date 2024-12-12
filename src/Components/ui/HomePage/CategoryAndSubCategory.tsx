"use client";
import { usePublicFindAllCategoryAndSubCategory } from "@/src/hooks/categoryAndSubCategory.hook";
import { useRouter } from "next/navigation";
import React from "react";

interface Category {
  id: string;
  categoryName: string;
  subCategory: SubCategory[];
}

interface SubCategory {
  id: string;
  categoryName: string;
}

const CategoryAndSubCategory = () => {
  const { data: categories } = usePublicFindAllCategoryAndSubCategory();
  const router = useRouter();

  const handleNavigate = (type: "category" | "subCategory", id: string) => {
    if (type === "category") {
      router.push(`/products?categoryId=${id}`);
    } else {
      router.push(`/products?subCategoryId=${id}`);
    }
  };

  return (
    <div className=" ">
      <div className=" relative flex flex-wrap   items-center   shadow-md border-2 border-primary py-1 rounded-xl">
        {categories?.map((category: Category) => (
          <div key={category.id} className="group relative">
            <button
              className=" font-medium hover:text-orange-500 p-3"
              onClick={() => handleNavigate("category", category.id)}
            >
              {category.categoryName}
            </button>
            {category.subCategory.length > 0 && (
              <div className="absolute z-50 left-0 top-10 mt-2 hidden w-48 rounded-md bg-white shadow-lg group-hover:block">
                <ul className="py-1">
                  {category.subCategory.map((sub) => (
                    <li
                      key={sub.id}
                      onClick={() => handleNavigate("subCategory", sub.id)}
                      className="px-4 py-2 text-gray-700 hover:bg-orange-100 cursor-pointer"
                    >
                      {sub.categoryName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryAndSubCategory;
