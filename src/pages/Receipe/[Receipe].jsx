import { useRouter } from "next/router";
import Image from "next/image";
const Recipe = ({ data }) => {
  const router = useRouter();

  const ingredients = [];
  const amounts = [];

  // Extract ingredients and amounts
  function extractIngredientsAndAmounts(recipe) {
    for (const key in recipe) {
      if (key.startsWith("strIngredient") && recipe[key] !== "") {
        ingredients.push(recipe[key]);
      } else if (key.startsWith("strMeasure") && recipe[key] !== "") {
        amounts.push(recipe[key]);
      }
    }
  }
  console.log(data);
  extractIngredientsAndAmounts(data.meals[0]);

  const mealName = data.meals[0].strMeal;

  if (ingredients.length > 0 && amounts.length > 0 && data) {
    return (
      <div className="container mb-10 w-[90%] mx-auto mt-10 p-8 bg-teal-700 text-white rounded-xl">
        <div className="flex justify-center items-center">
          {" "}
          <Image
            src={data.meals[0].strMealThumb}
            width={0}
            height={0}
            sizes="100vw"
            className="w-[100%] h-[225px] rounded-xl mb-8 object-cover"
          />
        </div>
        <h1 className="text-4xl font-bold mb-8 text-center">{mealName}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">Ingredients:</h2>
            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={index} className="mb-2">
                  {ingredient} - {amounts[index]}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold">Video Tutorial</h2>
              <a
                href={data.meals[0].strYoutube}
                className="text-[#FFDB58] font-bold hover:underline"
              >
                Recipe Video
              </a>
            </div>
            <div className="text-start">
              <h2 className="text-3xl font-bold mb-4">Instructions</h2>
              <p>{data.meals[0].strInstructions}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Recipe;

export async function getServerSideProps(context) {
  // Fetch data from external API
  const mealid = context.query.Receipe;
  console.log(mealid);

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`
  );
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}

/* www.themealdb.com/api/json/v1/1/lookup.php?i=52772 */
