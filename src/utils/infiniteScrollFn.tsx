import { useEffect } from "react";

const infiniteScrollFn = (
  page: number,
  setPage: any,
  totalItems: number,
  limit: number
) => {
  const totalPageCalc = Math.ceil(totalItems / limit);
  const handelInfiniteScroll = async () => {
    // console.log("scrollHeight" + document.documentElement.scrollHeight);
    // console.log("innerHeight" + window.innerHeight);
    // console.log("scrollTop" + document.documentElement.scrollTop);
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev: any) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page < totalPageCalc) {
      window.addEventListener("scroll", handelInfiniteScroll);
      return () => window.removeEventListener("scroll", handelInfiniteScroll);
    }
  }, [totalPageCalc, page]);
};

export default infiniteScrollFn;
