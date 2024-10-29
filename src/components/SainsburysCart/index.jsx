/*
 * Build the HTML structure.
 * Fetch data.
 * Display data.
 * Handle errors.
 * Separate the cart component.
 * Add interactivity:
 *  - Add: "Add to Basket" button - name, quantity, subtotal.
 *  - Update: "+" and "-" buttons in the cart - change the quantity.
 *  - Remove: "Remove" button - remove the item from the cart.
 *  - View: Basket hover - show the details of the cart.
 * Add styling - minimize, but ensure accessibility and responsiveness.
 * Include accessibility features.
 *
 * add loading state rendering
 */

import axios from "axios";
import { useEffect, useState } from "react";
import Cart from "./Cart";
import {
  decreaseCartItem,
  increaseCartItem,
  removeCartItem,
} from "./cartUtils";

const URL = "https://jsainsburyplc.github.io/front-end-test/products.json";
const DEFAULT_ERROR = { errorStatus: false, errorMsg: "" };
const errorMessage = "Connection failed: Nothing to display";

function SainsburysCart() {
  const [allProducts, setAllProducts] = useState([]);
  const [error, setError] = useState(DEFAULT_ERROR);
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const { errorStatus, errorMsg } = error;

  const fetchData = async () => {
    try {
      const res = await axios.get(URL);
      const resData = res.data;
      setIsLoading(true);
      setAllProducts(resData);
      setError(DEFAULT_ERROR);
    } catch (error) {
      console.log(error.message);
      const errorMsg = errorMessage;
      setIsLoading(false);
      setError({ errorStatus: true, errorMsg });
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncreaseCartItem = (productId) => {
    setCartItems((currentItems) => increaseCartItem(currentItems, productId));
  };

  const handleDecreaseCartItem = (productId) => {
    setCartItems((currentItems) => decreaseCartItem(currentItems, productId));
  };

  const handleRemoveCartItem = (productId) => {
    setCartItems(removeCartItem(cartItems, productId));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <header className="flex justify-between items-center">
        <div className="text-xl sm:text-2xl text-orange-600 font-extrabold">
          Sainsbury's Cart
        </div>
        <div>
          <Cart
            allProducts={allProducts}
            cartItems={cartItems}
            increaseCartItem={handleIncreaseCartItem}
            decreaseCartItem={handleDecreaseCartItem}
            removeFromCart={handleRemoveCartItem}
          />
        </div>
      </header>

      <div className="flex items-center justify-center">
        {errorStatus && (
          <div className="flex flex-col  items-center justify-center pt-[30%] ">
            {errorMsg}
            <div className="m-2">
              <button
                className="border-2 bg-[#F06c00] hover:bg-[#e55000] text-white font-bold rounded-3xl"
                aria-label="retry to connect"
                onClick={fetchData}
              >
                Retry
              </button>
            </div>
          </div>
        )}
        {isLoading && (
          <div className="pt-[30%]">
            <span>Loading ...</span>
          </div>
        )}

        <div className="mt-[100px]">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allProducts.map((item) => {
              const { title, productId, image, sku, price } = item;
              return (
                <div
                  className="border-2 p-4 bg-white min-w-[200px]"
                  key={productId}
                >
                  <li key={productId}>
                    <div className="flex justify-center p-1">
                      <img className="" src={image} alt={title} />
                    </div>
                    <div className="flex text-left p-1 mb-10 h-20 overflow-hidden font-medium">
                      <span>{title}</span>
                    </div>
                    <div className="flex justify-start p-1 text-xs text-gray-500">
                      <span>{sku}</span>
                    </div>
                    <div className="flex justify-start p-1 mb-2 text-xl font-bold">
                      <span>£{price}</span>
                    </div>
                    <button
                      className="w-full bg-[#F06c00] hover:bg-[#e55000] text-white font-bold rounded-sm"
                      aria-label="add to basket"
                      onClick={() => handleIncreaseCartItem(productId)}
                    >
                      Add
                    </button>
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default SainsburysCart;
