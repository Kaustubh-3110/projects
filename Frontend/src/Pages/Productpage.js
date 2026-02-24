import Productcartcomponent from "../Components/Productcartcomponent";

export default function Productpage({
  products,
  likesproducts,
  setLikesproducts,
  cartproducts,
  setCartproducts
}) {

  const handlelike = (id) => {
    if (likesproducts.includes(id)) {
      setLikesproducts(likesproducts.filter(num => num !== id));
    } else {
      setLikesproducts([...likesproducts, id]);
    }
  };

  return (
    <section className="py-20 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-3xl md:text-4xl font-bold mb-12">
          All <span className="text-[#00f5ff]">Products</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((item) => (
            <Productcartcomponent
              key={item.id}
              img={item.image}
              id={item.id}
              alreadyliked={likesproducts.includes(item.id)}
              title={item.title}
              price={item.price}
              category={item.category}
              handlelike={handlelike}
              cartproducts={cartproducts}
              setCartproducts={setCartproducts}
            />
          ))}
        </div>

      </div>
    </section>
  );
}