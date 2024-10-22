import axios from "axios";
import { useEffect, useState } from "react";

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
  const [cart, setCart] = useState(0);

  const { errorStatus, errorMsg } = error;

  const fetchData = async () => {
    try {
      const res = await axios.get(URL);
      const resData = res.data;
      //console.log(resData);
      setProducts(resData);
      setError(DEFAULT_ERROR);
    } catch (error) {
      console.error(error);
      const errorMsg = "Nothing to display";
      setError({ errorStatus: true, errorMsg });
      return;
    }
  };

  const addToCart = () => {
    setCart((prev) => prev + 1);
    // {lines:[{productId: "", price: "", quantity:0}], totalQuantity:0, totalPrice:0}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div> Sainsburys cart header </div>
      <div>
        <div>Your basket ({cart} items) </div>
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
                  <button onClick={addToCart}>Add to Basket</button>
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
