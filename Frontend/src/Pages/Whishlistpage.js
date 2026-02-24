import Productcartcomponent from "../Components/Productcartcomponent";

export default function Whishlistpage({
  likesproducts,
  products,
  handlelike,
  cartproducts,
  setCartproducts
}) {

  const likedProductsList = products
    ? products.filter(product => likesproducts.includes(product.id))
    : [];

  if (likedProductsList.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f]">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Your <span className="text-[#ff007a]">Wishlist</span> is Empty
          </h2>
          <p className="text-gray-400">
            Start adding some gear to your arsenal.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] px-6 py-12">

      <h1 className="text-3xl font-bold text-white mb-10 text-center">
        Your <span className="text-[#ff007a]">Wishlist</span>
      </h1>

      <div className="grid 
                      grid-cols-1 
                      sm:grid-cols-2 
                      md:grid-cols-3 
                      lg:grid-cols-4 
                      gap-8 
                      max-w-7xl 
                      mx-auto">

        {likedProductsList.map(item => (
          <Productcartcomponent
            key={item.id}
            img={item.image}
            id={item.id}
            alreadyliked={true}
            handlelike={handlelike}
            title={item.title}
            price={item.price}
            category={item.category || "General"}
            cartproducts={cartproducts}
            setCartproducts={setCartproducts}
          />
        ))}

      </div>
    </div>
  );
}