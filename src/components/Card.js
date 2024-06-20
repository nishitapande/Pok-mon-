const Card = ({ item, index }) => {
  return (
    <div className="border-2  w-64 my-5 flex flex-col  cursor-pointer">
      <div>
        <img
          src={item.url}
          alt={item.name}
          className="object-cover self-center "
        />
      </div>
      <div>
        <h3 className="text-center font-semibold capitalize text-2xl">
          {item.name}
        </h3>
        <div className="pl-3 pb-5">
          <p>
            <strong>Abilities:</strong> {item.abilities}
          </p>
          <p>
            <strong>Types:</strong> {item.types}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
