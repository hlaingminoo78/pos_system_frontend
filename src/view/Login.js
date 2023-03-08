import { createRef, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../Context";
import starSVG from "../asset/icon/star.svg";
import avatorSVG from "../asset/image/lori_bryson.jpg";
import { ReactComponent as KLinkLogo } from "../asset/icon/logo_klink_white.svg";

export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { token, setUser, setAccessToken } = useContext(Context);
  const [error, setError] = useState(null);

  //   -if user is already logged in, then redirect to product page
  if (token) {
    return <Navigate to="/products" />;
  }

  // -function to call when log in button is clicked
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    // -call login API
    fetch(process.env.REACT_APP_API_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data);
        if ("errors" in data) {
          setError(data.errors);
        } else {
          setUser(data.user);
          setAccessToken(data.token);
        }
      });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 sm:gap-0">
      <section className="flex-1 flex flex-col justify-between p-8 bg-primary gap-y-4">
        <header>
          <KLinkLogo />
        </header>
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-row justify-center gap-x-1">
            <img src={starSVG} className="w-5 h-5" alt="" />
            <img src={starSVG} className="w-5 h-5" alt="" />
            <img src={starSVG} className="w-5 h-5" alt="" />
            <img src={starSVG} className="w-5 h-5" alt="" />
            <img src={starSVG} className="w-5 h-5" alt="" />
          </div>
          <div className="px-10 text-2xl md:text-4xl text-center leading-10 text-white">
            KLink has saved us thousands of hours of work. We're able to spin up
            projects and features much faster.
          </div>
          <div className="flex flex-col items-center gap-y-2">
            <img src={avatorSVG} className="w-20 h-20 rounded-full" alt="" />
            <div className="text-xl text-white">Lori Bryson</div>
            <div className="text-white opacity-70">
              Product Designer, Sisyphus
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="text-white opacity-70">@ klinkentriprise.org</div>
          <div className="flex flex-row items-center gap-x-2 text-white opacity-70">
            <img
              src="./img/icons/envelope-regular.svg"
              className="w-4 h-4"
              alt=""
            />
            <span>help@klinkentriprise.org</span>
          </div>
        </div>
      </section>
      <section className="flex-1 flex justify-center items-center">
        <div className="w-3/5">
          <form onSubmit={onSubmit}>
            <div className="mb-3 text-4xl font-bold">Log in</div>
            <div className="mb-8 text-gray-500">
              Welcome back! Please enter your details.
            </div>
            <div className="mb-4">
              <div className="mb-2">
                <label for="email">Email</label>
              </div>
              {error && "email" in error && (
                <p className="text-sm text-red-600 py-2">{error["email"][0]}</p>
              )}
              <input
                type="text"
                ref={emailRef}
                name="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-5">
              <div className="mb-2">
                <label for="password">Password</label>
              </div>
              {error && "password" in error && (
                <p className="text-sm text-red-600 py-2">
                  {error["password"][0]}
                </p>
              )}
              <input
                type="password"
                ref={passwordRef}
                name="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your password"
              />
            </div>
            <input
              type="submit"
              value="Sign in"
              className="w-full leading-10 text-white bg-secondary rounded-md cursor-pointer hover:bg-primary"
            />
          </form>
        </div>
      </section>
    </div>
  );
}
