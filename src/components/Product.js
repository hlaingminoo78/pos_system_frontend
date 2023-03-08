import shirtPNG from "../asset/image/polo_shirt.png";

export default function Product({ id, name, price, onClick }) {
  return (
    <div
      className="w-56 flex flex-col gap-y-3 p-4 rounded-lg bg-white cursor-pointer hover:shadow-lg"
      onClick={(e) => onClick(id)}
    >
      <img src={shirtPNG} alt="" className="w-full rounded-lg" />
      <div className="font-semibold break-words">{name}</div>
      <div className="text-lg font-bold text-blue-700">
        <span className="text-sm">Ks </span>
        {price}
      </div>
    </div>
  );
}
