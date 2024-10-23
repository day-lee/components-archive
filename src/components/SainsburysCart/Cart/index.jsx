import { useState } from "react";
function Cart({
  allProduct,
  cart,
  addToCart,
  decreaseCartItem,
  removeFromCart,
}) {
  const [isHovered, setIsHovered] = useState(false);
  // count the items in the cart
  const counter = new Map();
  cart.forEach((productId) =>
    counter.set(productId, (counter.get(productId) ?? 0) + 1)
  );

  const productLookup = new Map(
    allProduct.map((product) => [product.productId, product])
  );

  // summary of cart items
  const cartInformation = Array.from(counter).reduce(
    (acc, item) => {
      const productId = item[0];
      const data = productLookup.get(productId);
      const image = data.image;
      const title = data.title;
      const quantity = counter.get(productId);
      const subtotal = parseFloat((quantity * data.price).toFixed(2));
      acc.lines.push({ image, productId, title, quantity, subtotal });
      acc.totalQuantity += quantity;
      acc.totalPrice += subtotal;
      return acc;
    },
    {
      lines: [],
      totalQuantity: 0,
      totalPrice: 0,
    }
  );
  const { lines, totalQuantity, totalPrice } = cartInformation;

  return (
    <div className="flex">
      <div className="mt-2 w-full">
        <button
          className="bg-[#F06c00] text-white font-bold p-1"
          onClick={() => setIsHovered(!isHovered)}
          //   onMouseOver={() => setIsHovered(true)}
          //   onMouseLeave={() => setIsHovered(false)}
        >
          <div className="p-1">
            <span className="border-2 rounded-full px-2 py-1">
              {totalQuantity}
            </span>
            <span className="pl-2 font-extrabold">
              £{totalPrice.toFixed(2)}
            </span>
          </div>
        </button>

        {isHovered && (
          <div className="hidden sm:block absolute top-[130px] right-12 bg-gray-200 shadow-2xl border-[1px] w-1/2 max-h-[500px] min-h-[200px] overflow-scroll">
            <div className="text-xl font-semibold bg-white w-full py-2">
              My trolley{" "}
              <span className="text-base">({totalQuantity} items)</span>
            </div>
            {cart.length > 0 ? (
              <>
                <ul>
                  {lines.map((item) => {
                    return (
                      <li
                        className="flex flex-col gap-2 m-4 bg-white p-2"
                        key={item.productId}
                      >
                        <div className="flex justify-between">
                          <div>
                            <img
                              className="m-2"
                              src={item.image}
                              alt={item.title}
                            />
                          </div>
                          <div className="">
                            <div className=" pb-2 pr-2 w-[200px] text-sm">
                              {item.title}
                            </div>
                            <div className=" text-lg font-bold">
                              £{item.subtotal}
                            </div>
                            <button
                              className="bg-[#F06c00] w-20 p-1 my-3 text-white font-semibold"
                              aria-label="remove the item"
                              onClick={() => removeFromCart(item.productId)}
                            >
                              remove
                            </button>
                          </div>
                          <div className="flex flex-col gap-1">
                            <button
                              className="bg-[#F06c00] w-10 text-2xl p-1 m-1 text-white font-semibold"
                              aria-label="increase the quantity"
                              onClick={() => addToCart(item.productId)}
                            >
                              +
                            </button>
                            <div className="text-center font-extrabold">
                              {item.quantity}
                            </div>
                            <button
                              className="bg-[#F06c00] w-10 text-2xl p-1 m-1 text-white font-semibold"
                              aria-label="decrease the quantity"
                              onClick={() => decreaseCartItem(item.productId)}
                            >
                              -
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="sticky bottom-0 w-full h-20 bg-gray-200 flex justify-between mb-2 px-2 items-center border-t-[1px] border-gray-300">
                  <div>
                    <span className="pl-2 font-extrabold">
                      £{totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <button
                      className="bg-[#F06c00] text-white font-bold w-[200px] cursor-not-allowed"
                      aria-label="book a slot"
                    >
                      Book a slot
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex w-full h-[150px] justify-center items-center">
                <p>Your trolley is empty.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
