import Hero from "@/components/Hero";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home({ data }) {
  const [recipe, setRecipe] = useState(null);

  const router = useRouter();

  function searchRecipe(event) {
    event.preventDefault();
    console.log(recipe);
    router.push(`?s=${recipe}`);
  }

  return (
    <div className=" min-h-screen">
      <form
        className="flex justify-center items-center mt-3"
        onSubmit={searchRecipe}
      >
        <input
          onChange={(e) => {
            setRecipe(e.target.value);
          }}
          className="pl-4 mx-[20px] border-solid border-teal-400 rounded-md border-2"
          type="text"
          placeholder="Search for recipes"
        />
        <button
          className="border-solid border-teal-400 bg-white rounded-md p-1 hover:bg-teal-400 hover:text-white transition-all duration-300 border-2"
          type="submit"
        >
          Search
        </button>
      </form>
      <div className="flex flex-row flex-wrap gap-8 mt-3 justify-center items-center">
        {data && data.meals ? (
          data.meals.map((meal, index) => {
            return <Hero key={index} data={meal} />;
          })
        ) : (
          <h1 className="text-white">Nothing Found</h1>
        )}
      </div>
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps(context) {
  const search = context.query.s;
  console.log(search);
  // Fetch data from external API
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
  );
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}
