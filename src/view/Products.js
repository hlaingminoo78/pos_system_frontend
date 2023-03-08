import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../Context";
import KLinkBlueLogo from "../asset/icon/logo_klink_blue.svg";
import searchSVG from "../asset/icon/search.svg";
import Product from "../components/Product";
import ProductInCart from "../components/ProductInCart";

export default function Products() {
  const { token } = useContext(Context);
  const [products, setProducts] = useState([]);
  const [productsInCart, setProductsInCart] = useState([]);

  useEffect(() => {
    loadProduct();
  }, []);

  //   -if there is no token in the local storage(user is not logged in), then redirect to login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  const loadProduct = () => {
    // -call login API
    fetch(process.env.REACT_APP_API_URL + "/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data);
        setProducts(data);
      });
  };
  const onClick = (id) => {
    // -if an item is already added to cart, then do nothing
    for (let i = 0; i < productsInCart.length; i++) {
      if (id === productsInCart[i].id) {
        return;
      }
    }
    // -get the clicked item
    const currentProduct = products.find((p) => p.id === id);

    // -initialize the new product
    const newProductInCart = {
      id: currentProduct.id,
      name: currentProduct.name,
      amount: 1,
      category: currentProduct.category,
      price: currentProduct.price,
    };
    // -update the productsInCart
    setProductsInCart([...productsInCart, newProductInCart]);
  };

  // -function to decrease the amount of chosen item by one
  const decreaseItem = (id) => {
    const currentProduct = productsInCart.find((p) => p.id === id);
    // -remove from cart if amount is 0
    if (currentProduct.amount - 1 === 0) {
      setProductsInCart(productsInCart.filter((p) => p.id !== id));
      return;
    }
    const newProductsInCart = productsInCart.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          amount: p.amount - 1,
        };
      }
      return p;
    });
    setProductsInCart(newProductsInCart);
  };

  // -function to increase the amount of chosen item by one
  const increaseItem = (id) => {
    const newProductsInCart = productsInCart.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          amount: p.amount + 1,
        };
      }
      return p;
    });
    setProductsInCart(newProductsInCart);
  };

  // -function to remove item from the cart
  const removeItem = (id) => {
    setProductsInCart(productsInCart.filter((p) => p.id !== id));
  };

  // -total amount in the cart
  const calculateTotalPrice = () => {
    let total = 0;
    for (const p of productsInCart) {
      total += p.price * p.amount;
    }
    return total;
  };

  // -if user click pay now or checkout, then empty the cart
  const checkOut = () => {
    setProductsInCart([]);
  };

  // -percentage calculator
  const calculatePercentage = (percentage) => {
    return Math.round(calculateTotalPrice() * (percentage / 100.0), 3);
  };

  return (
    <div className="flex flex-col xl:flex-row">
      <section className="w-fullphp xl:w-2/3 flex-auto px-10 py-6 bg-gray-100">
        <header className="mb-8 flex flex-col sm:flex-row justify-between gap-y-4 sm: gap-0">
          <div>
            <img src={KLinkBlueLogo} className="w-40" alt="logo" />
          </div>
          <div className="h-10 flex flex-row items-center pr-2 bg-white border border-gray-300 rounded-md">
            <input
              type="text"
              name="search"
              id="search"
              className="w-72 h-full px-4 rounded-md focus:outline-none"
              placeholder="Search"
            />
            <div className="flex justify-center items-center pl-6 pr-4 py-1 bg-secondary rounded-2xl cursor-pointer hover:bg-primary">
              <img src={searchSVG} className="w-6" alt="search" />
            </div>
          </div>
        </header>
        <div className="mb-4">
          <span className="mx-2 px-3 py-1 text-sm rounded-2xl text-white bg-secondary cursor-pointer">
            All
          </span>
          <span className="mx-2 px-3 py-1 text-sm rounded-2xl bg-gray-200 cursor-pointer">
            Category 1
          </span>
        </div>
        <div className="grid grid-cols-fit gap-4 justify-center sm:justify-around">
          {products.length === 0 ? (
            <div>No Items Right now</div>
          ) : (
            products.map((product) => (
              <Product
                key={product.id}
                {...product}
                onClick={() => onClick(product.id)}
              />
            ))
          )}
        </div>
      </section>
      <section className="w-full xl:w-1/3 flex-auto flex flex-col sm:flex-row xl:flex-col shadow-xl">
        <div className="flex-auto xl:flex-initial xl:grow">
          <div className="px-10 py-6 text-2xl font-bold">Order details</div>
          <div className="flex flex-col gap-y-8 px-10 py-6">
            {productsInCart.map((product) => (
              <ProductInCart
                key={product.id}
                {...product}
                decreaseItem={() => decreaseItem(product.id)}
                increaseItem={() => increaseItem(product.id)}
                removeItem={() => removeItem(product.id)}
              />
            ))}
          </div>
        </div>
        <form onSubmit={checkOut}>
          <div className="flex-auto xl:flex-initial flex flex-col px-10 py-6 gap-y-6 bg-secondary-light">
            <div className="flex flex-row justify-between">
              <div>Subtotal</div>
              <div className="text-lg text-blue-700">
                <span className="text-sm">Ks </span>
                {calculateTotalPrice()}
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div>Tax(5%)</div>
              <div className="text-lg text-blue-700">
                <span className="text-sm">Ks </span>
                {calculatePercentage(5)}
              </div>
            </div>
            <div className="h-1 border-b border-dashed border-gray-400"></div>
            <div className="flex flex-row justify-between">
              <div>Total</div>
              <div className="text-lg font-bold text-blue-700">
                <span className="text-sm">Ks </span>
                {calculateTotalPrice() + calculatePercentage(5)}
              </div>
            </div>
            <input
              type="submit"
              value="Pay now"
              className="w-full leading-10 text-white bg-secondary rounded-md cursor-pointer hover:bg-primary"
            />
          </div>
        </form>
      </section>
    </div>
  );
}
