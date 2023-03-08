import shirtPNG from "../asset/image/polo_shirt.png";

export default function ProductInCart({
  id,
  name,
  price,
  amount,
  increaseItem,
  decreaseItem,
  removeItem,
}) {
  return (
    <div className="flex flex-row gap-x-2 xl:gap-x-10">
      <div className="flex-auto flex flex-row gap-x-4">
        <div className="w-20 shrink-0 p-1 rounded-lg bg-gray-100 ">
          <img src={shirtPNG} alt="shirt" className="w-full rounded-lg" />
        </div>
        <div className="flex flex-col justify-between">
          <div className="font-semibold">{name}</div>
          <div className="flex flex-row items-center gap-x-3">
            <div className="w-32 grid grid-cols-3 divide-x text-xl text-center border rounded-lg">
              <div
                className="px-2 py-1 cursor-pointer"
                onClick={() => decreaseItem(id)}
              >
                -
              </div>
              <div className="px-2 py-1">{amount}</div>
              <div
                className="px-2 py-1 cursor-pointer"
                onClick={() => increaseItem(id)}
              >
                +
              </div>
            </div>
            <div className="text-lg font-bold text-blue-700">
              <span className="text-sm">Ks </span>
              {price}
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex-auto cursor-pointer hover:text-red-600"
        onClick={() => removeItem(id)}
      >
        <span className="text-2xl">x</span>
      </div>
    </div>
  );
}
