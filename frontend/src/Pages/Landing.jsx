import { useEffect, useState } from "react";
import Foods from "../assets/Images/ArrayOfFoods.png";
import Search from "../assets/Images/Seach Recipe.png";
import Cooking from "../assets/Images/Cooking.png";
import Cards from "../Components/Cards.jsx";
import massa from "../assets/Images/Massaman.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RecipeCardSkeleton from "./RecipeSkeleton.jsx";
import Testimonial from "../Components/Testimonial.jsx";
import RecipeOfTheDay from '../Components/RecipeOfTheDay';

const Landing = () => {
  const navigator = useNavigate();
  const [best, setBest] = useState([])
  const [loading, setLoading] = useState(true);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [reviews, setReviews] = useState(null);
  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/feedback`);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const feedbacks = await response.json();
      const reviews = feedbacks.data;
      // Set infiniteReviews only after ensuring the data is valid
      if (reviews.length > 0) {
        setReviews(reviews);
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    let token = localStorage.getItem("tastytoken");
   if(token){
    token = JSON.parse(token)
     axios.get(`${backendURL}/api/token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
     })
     .then((res)=>{
        if (res.data.success && window.location.pathname != '/') {
        navigator(`/user/${res.data.user._id}`, {state: {user: res.data.user}})
       }
     })
     .catch((err)=>{
      console.log(err)
     })
   }
   fetchFeedbacks();
  }, [])

  
  useEffect(() => {
    setLoading(true); 

    axios.get(`${backendURL}/api/recipes`)
        .then((res) => {
            
            setBest(res.data.recipes.slice(0, 3)); 
        })
        .catch((err) => {
            console.log(err); 
        })
        .finally(() => {
            setLoading(false); 
        });
}, [setBest]); 

  return (
    <div className="min-h-screen" id="Landing">
      {/* -------------------------- Hero Section ----------------------  */}
      <section id="Hero" className="py-4 my-2">
     <div className="min-h-screen flex justify-center items-start">
  <h1
    className="font-extrabold text-red-700 text-[4rem] text-center lg:mt-[5rem] md:w-[40%] sm:w-[60%] font-[Roboto] transition-transform duration-300"
    style={{
      transition: 'transform 0.3s ease',
      textShadow: '0 1px 0 rgba(0,0,0,0.1), 0 2px 0 rgba(0,0,0,0.1), 0 3px 0 rgba(0,0,0,0.1), 0 4px 0 rgba(0,0,0,0.1)',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)'; 
      e.currentTarget.style.textShadow = '0 5px 15px rgba(0, 0, 0, 0.3)'; 
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = ''; 
      e.currentTarget.style.textShadow = ''; 
    }}
  >
    Where Flavour Meets Perfection
  </h1>
</div>

    </section>

      {/* -------------------------- Features Section ----------------------  */}
      <section id="Fetaure" className="sm:py-4 mt-[-36vh] sm:my-20  mx-8">
        <h1 className="text-center font-semibold text-4xl text-red-700 sm:my-4 font-[Merriweather]">
          Features
        </h1>
        <div className="grid sm:grid-cols-1 md:grid-cols-3">
          <div className="p-4 sm:mb-0 mb-6 text-center">
            <div className="rounded-lg overflow-hidden ">
              <img
                alt="content"
                className="object-center w-[30%] h-[30%] m-auto"
                src={Foods}
                loading="lazy"
              />
            </div>
            <h2 className="text-xl title-font text-gray-900 mt-5 font-semibold">
              Array of Delights
            </h2>
            <p className="text-base leading-relaxed mt-2 text-left">
              Indulge in our diverse array of culinary delights from across the
              globe. Discover a rich assortment of recipes that cater to every
              palate, from comforting classics to innovative flavors, providing
              a delightful journey through the world of gastronomy.
            </p>
          </div>
          <div className="p-4 sm:mb-0 mb-6 text-center">
            <div className="rounded-lg overflow-hidden ">
              <img
                alt="content"
                className="object-center w-[30%] h-[30%] m-auto"
                src={Search}
                loading="lazy"
              />
            </div>
            <h2 className="text-xl title-font text-gray-900 mt-5 font-semibold">
              Customized Recipe Search
            </h2>
            <p className="text-base leading-relaxed mt-2 text-left">
              Explore the art of personalized recipe discovery with our
              intuitive search tools. Tailor your culinary exploration by
              filtering recipes based on ingredients, cuisine types, dietary
              preferences, and more, ensuring a seamless and customized
              recipe-finding experience.
            </p>
          </div>
          <div className="p-4 sm:mb-0 mb-6 text-center">
            <div className="rounded-lg overflow-hidden ">
              <img
                alt="content"
                className="object-center w-[30%] h-[30%] m-auto"
                src={Cooking}
                loading="lazy"
              />
            </div>
            <h2 className="text-xl title-font text-gray-900 mt-5 font-semibold">
              Create Your Own Masterpiece
            </h2>
            <p className="text-base leading-relaxed mt-2 text-left">
              Unleash your inner chef and craft your culinary masterpieces.
              Share your unique recipes, secret ingredients, and personal
              touches with our community, fostering a space where creativity
              thrives, inspiring others to create and innovate in the kitchen.
            </p>
          </div>
        </div>
      </section>

{/* -------------------------- Recipe For The Day Section ----------------------  */}
      <section id="RecipeOfTheDay" className="py-10 mx-8">
        <h2 className="text-center font-semibold text-4xl text-red-700 mb-4 font-[Merriweather]">
        </h2>
        <RecipeOfTheDay /> {/* Add the RecipeOfTheDay component here */}
      </section>
      
      {/* -------------------------- Best Dishes Section ----------------------  */}
      <section id="Trending" className="py-4 my-20 mx-8">
        <h1 className="text-center font-semibold text-4xl text-red-700 my-4 font-[Merriweather]">
           World's Best Dishes
        </h1>
        {/* integrated a loading skeleton for landing page */}
          {loading ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 py-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <RecipeCardSkeleton key={i} />
              ))}
            </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {best.map((food) => (
                <Cards dish={food} key={food._id} />
              ))}
            </div>
        )}
      </section>

      {/* -------------------------- About Section ----------------------  */}
      <section
        className="text-gray-600 body-font overflow-hidden py-4 my-20 mx-8"
        id="About"
      >
        <div className="container m-auto">
          <div className=" w-[80vw] mx-auto grid md:grid-cols-2 sm:grid-cols-1">
            <div className="w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 flex flex-col justify-center items-center">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                TastyTrails
              </h2>
              <h1 className="font-bold text-3xl title-font mb-4 font-[Merriweather] text-red-700">
                About Us
              </h1>

              <p className="leading-relaxed mb-4">
              Welcome to TastyTrails, your passport to a world of delectable flavors and culinary adventures! At TastyTrails, we are passionate about bringing together food enthusiasts, aspiring chefs, and seasoned cooks on a flavorful journey. Our platform curates a diverse collection of recipes, from time-honored classics to innovative creations, catering to every taste bud. Whether you are a novice in the kitchen or a seasoned pro, TastyTrails is your companion in exploring, sharing, and celebrating the art of cooking. Join us in discovering, creating, and savoring delightful dishes that inspire and unite food lovers worldwide
              </p>
            </div>
            <img
              alt="ecommerce"
              className="object-cover object-center rounded sm:w-[90%] mx-auto"
              src={massa}
              loading="lazy"
            />
          </div>
        </div>
      </section>
      <section>
        {reviews &&(

        <Testimonial infiniteReviews={reviews} />
        )}
      </section>
    </div>
  );
};

export default Landing;
