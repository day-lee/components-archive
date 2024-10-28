import { useMemo, useState } from "react";
function Cart({
  allProducts,
  cartItems,
  increaseCartItem,
  decreaseCartItem,
  removeFromCart,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const cartInformation = useMemo(() => {
    console.time("memoised cart calculation");

    const productLookup = new Map(
      allProducts.map((product) => [product.productId, product])
    );

    const result = cartItems.reduce(
      (acc, item) => {
        const id = item.productId;
        if (id !== "") {
          const data = productLookup.get(id);
          const image = data.image;
          const title = data.title;
          const quantity = item["quantity"];
          const subtotal = parseFloat((quantity * data.price).toFixed(2));
          acc.lines.push({ image, id, title, quantity, subtotal });
          acc.totalQuantity += quantity;
          acc.totalPrice += subtotal;
          return acc;
        }
        return acc;
      },
      {
        lines: [],
        totalQuantity: 0,
        totalPrice: 0,
      }
    );
    console.timeEnd("memoised cart calculation");
    return result;
  }, [cartItems, allProducts]);

  const { lines, totalQuantity, totalPrice } = cartInformation;

  return (
    <div className="flex">
      <div className="mt-2 w-full">
        <button
          className="bg-[#F06c00] hover:bg-[#e55000] text-white font-bold p-1"
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
          <div className="sm:block absolute top-[130px] right-0 sm:right-12 bg-gray-200 shadow-2xl border-[1px] sm:w-1/4 min-w-[410px] max-h-[500px] min-h-[200px] overflow-scroll">
            <div className="text-xl font-semibold bg-white w-full py-2">
              My trolley{" "}
              <span className="text-base">({totalQuantity} items)</span>
            </div>
            {cartItems.length > 0 ? (
              <>
                <ul>
                  {lines.map((item) => {
                    return (
                      <li
                        className="flex flex-col gap-2 m-4 bg-white p-2"
                        key={item.productId}
                      >
                        <div
                          className="flex justify-between"
                          key={item.productId}
                        >
                          <div>
                            <img
                              className="m-2 w-20"
                              src={item.image}
                              alt={item.title}
                            />
                          </div>
                          <div className="flex flex-col justify-start ml-5 sm:ml-0">
                            <div className="text-left pb-2 pr-2 w-[200px] text-sm">
                              {item.title}
                            </div>
                            <div className="text-left text-lg font-bold">
                              £{item.subtotal}
                            </div>
                            <button
                              className="bg-[#F06c00] hover:bg-[#e55000] w-20 p-1 my-3 text-white font-semibold"
                              aria-label="remove the item"
                              onClick={() => removeFromCart(item.id)}
                            >
                              remove
                            </button>
                          </div>
                          <div className="flex flex-col gap-1">
                            <button
                              className="bg-[#F06c00] hover:bg-[#e55000] w-10 text-2xl p-1 m-1 text-white font-semibold"
                              aria-label="increase the quantity"
                              onClick={() => increaseCartItem(item.id)}
                            >
                              +
                            </button>
                            <div className="text-center font-extrabold">
                              {item.quantity}
                            </div>
                            <button
                              className="bg-[#F06c00] hover:bg-[#e55000] w-10 text-2xl p-1 m-1 text-white font-semibold"
                              aria-label="decrease the quantity"
                              onClick={() => decreaseCartItem(item.id)}
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
                      className="bg-[#F06c00] hover:bg-[#e55000] text-white font-bold w-[200px] cursor-not-allowed"
                      aria-label="book a slot"
                    >
                      Book a slot
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-4 p-10 w-full h-[30vh] justify-center items-center">
                <p>Your trolley is empty.</p>
                <p className="font-bold">Start shopping by adding items!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
