const URL =
  "https://s3.eu-west-1.amazonaws.com/hackajob-assets1.p.hackajob/challenges/sainsbury_products/products.json";

import axios from "axios";
import { useEffect, useState } from "react";

function Supermarket() {
  const [allProducts, setAllProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(URL);
      const resData = res.data;

      const allProductInformation = resData.reduce((acc, item) => {
        const {
          product_uid,
          product_type,
          name,
          image,
          retail_price,
          labels,
          reviews,
        } = item;

        acc.push({
          product_uid,
          product_type,
          name,
          image,
          retail_price,
          labels,
          reviews,
        });

        return acc;
      }, []);
      setError(null);
      setAllProducts(allProductInformation);
    } catch (error) {
      console.error("Error msg: " + error);
      setError("Failed to load data.");
      return;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("lazy loading test");
      fetchData();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="">
        <h1>Supermarket </h1>
        <div className="text-2xl p-4">All Products</div>
        {error && <p>{error}</p>}
        <ul className="grid grid-cols-5 grid-rows-4 gap-2">
          {allProducts.map((product) => (
            <li key={product.product_uid}>
              <div className="flex flex-col items-center w-[230px] h-[564px] border-2 p-4">
                <img
                  className="w-[140px] py-2"
                  src={product.image}
                  alt={product.name}
                />
                <p className="py-2 text-left font-semibold">{product.name}</p>
                <div className="flex">
                  <p className="py-2 text-left text-xl font-semibold">
                    £{product.retail_price.price}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Supermarket;
