// components/Hero.js

import Link from "next/link";

const Hero = ({ data }) => {
  const { strMeal, strMealThumb, idMeal } = data;

  return (
    <div className="max-w-md bg-[#FFDB58] rounded-md overflow-hidden shadow-md">
      <img className="w-full h-48 object-cover" src={strMealThumb} alt={strMeal} />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2 text-white">{strMeal}</h2>
        <Link href={`/recipe/${idMeal}`}>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
