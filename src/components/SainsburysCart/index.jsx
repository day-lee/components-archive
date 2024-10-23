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
 */

import axios from "axios";
import { useEffect, useState } from "react";
import Cart from "./Cart";

const URL = "https://jsainsburyplc.github.io/front-end-test/products.json";
const DEFAULT_ERROR = { errorStatus: false, errorMsg: "" };

function SainsburysCart() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(DEFAULT_ERROR);
  const [cart, setCart] = useState([]);

  const { errorStatus, errorMsg } = error;

  const fetchData = async () => {
    try {
      const res = await axios.get(URL);
      const resData = res.data;
      setProducts(resData);
      setError(DEFAULT_ERROR);
    } catch (error) {
      console.error(error);
      const errorMsg = "Connection failed: Nothing to display";
      setError({ errorStatus: true, errorMsg });
      return;
    }
  };

  const addToCart = (productId) => {
    setCart((prev) => [...prev, productId]);
  };

  const decreaseCartItem = (productId) => {
    const decreaseIndex = cart.indexOf(productId);
    let newCart = [
      ...cart.slice(0, decreaseIndex),
      ...cart.slice(decreaseIndex + 1),
    ];

    setCart(newCart);
  };

  const removeFromCart = (productId) => {
    const filteredProduct = cart.filter((id) => id !== productId);
    setCart(filteredProduct);
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
            allProduct={products}
            cart={cart}
            addToCart={addToCart}
            decreaseCartItem={decreaseCartItem}
            removeFromCart={removeFromCart}
          />
        </div>
      </header>

      <div className="flex items-center justify-center">
        {errorStatus && <div>{errorMsg}</div>}
        <div className="mt-[100px]">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {products.map((item) => {
              const { title, productId, image, sku, price } = item;
              return (
                <div className="border-2 p-4 bg-white min-w-[200px]">
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
                      onClick={() => addToCart(productId)}
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
