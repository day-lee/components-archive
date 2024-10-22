import axios from "axios";
import { useEffect, useState } from "react";
import Cart from "./Cart";

const URL = "https://jsainsburyplc.github.io/front-end-test/products.json";
const DEFAULT_ERROR = { errorStatus: false, errorMsg: "" };
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
      const errorMsg = "Nothing to display";
      setError({ errorStatus: true, errorMsg });
      return;
    }
  };

  const addToCart = (productId) => {
    setCart((prev) => [...prev, productId]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div> Sainsburys cart header </div>
      <div>
        <Cart allProduct={products} cart={cart} />
      </div>
      <div>
        {errorStatus && <div>{errorMsg}</div>}
        <div>
          <ul>
            {products.map((item) => {
              const { title, productId, image, sku, price } = item;
              return (
                <li key={productId}>
                  <img src={image} alt={title} />
                  <div>{title}</div>
                  <div>{sku}</div>
                  <div>£{price}</div>
                  <button onClick={() => addToCart(productId)}>
                    Add to Basket
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default SainsburysCart;
