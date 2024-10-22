const URL = "https://jsainsburyplc.github.io/front-end-test/products.json.";

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
  return (
    <>
      <div> Sainsburys cart header </div>
      <div>
        <div>cart top right side corner: quantity, subtotal </div>
      </div>
      <div>
        <div>8 items grid mapping </div>
      </div>
    </>
  );
}

export default SainsburysCart;
