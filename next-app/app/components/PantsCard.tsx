import Link from "next/link";

interface PantsCardProps {
  _id: string;
  modelName: string;
  brand: string;
  price: string;
  cover: string;
}

const PantsCard: React.FC<PantsCardProps> = ({ _id, modelName, brand, price, cover }) => (
  <Link href={`/pants/${_id}`}>
    <div className="pantsCard flex flex-col bg-white overflow-hidden">
      <div className="pantsCardIMG relative w-full aspect-square bg-white">
        <img
          src={cover}
          // src={cover || "/placeholder.png"}
          alt={`${modelName} cover`}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-contain"
        />
      </div>
      <div className="p-4 text-left ml-3">
        <h3 className="text-base font-bold">{modelName}</h3>
        <p className="text-gray-600">{brand}</p>
        <p className="text-gray-900 font-semibold">{price}</p>
      </div>
    </div>
  </Link>
);

export default PantsCard;