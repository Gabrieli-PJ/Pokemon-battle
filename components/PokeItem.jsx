import PokeAction from "./PokeActions";

const formatPokedexNumber = (number) => {
  return number.toString().padStart(4, '0');
};

const getTypeColor = (type) => {
  switch (type) {
    case 'normal':
      return 'bg-gray-500 text-white';
    case 'fire':
      return 'bg-red-600 text-red-100';
    case 'water':
      return 'bg-blue-600 text-blue-100';
    case 'grass':
      return 'bg-green-600 text-green-100';
    case 'flying':
      return 'bg-teal-400 text-teal-800';
    case 'fighting':
      return 'bg-red-800 text-red-100';
    case 'poison':
      return 'bg-purple-600 text-purple-100';
    case 'electric':
      return 'bg-yellow-600 text-white';
    case 'ground':
      return 'bg-orange-700 text-orange-100';
    case 'rock':
      return 'bg-orange-700 text-orange-100';
    case 'psychic':
      return 'bg-pink-600 text-pink-100';
    case 'ice':
      return 'bg-indigo-300 text-indigo-800';
    case 'bug':
      return 'bg-green-300 text-green-800';
    case 'ghost':
      return 'bg-indigo-500 text-indigo-100';
    case 'steel':
      return 'bg-gray-400 text-gray-100';
    case 'dragon':
      return 'bg-purple-400 text-purple-100';
    case 'dark':
      return 'bg-blue-900 text-blue-100';
    case 'fairy':
      return 'bg-pink-300 text-pink-100';
    default:
      return 'bg-gray-500 text-white';
  }
};



const PokemonItem = ({ name, types, imageUrl, id }) => {

    const formatPokedex = formatPokedexNumber(id) || "undefined";


 return ( <div className="flex flex-col m-3 flex-wrap max-w-sm w-1/5 rounded p-4 overflow-hidden shadow-lg" >
    <div className="rounded border-2 border-red-500 bg-red-400  tracking-wide text-white py-1 px-2 w-1/3">
      <p>#{formatPokedex}</p>
    </div>
    <img
      className="card-img-top img-fluid self-center"
      src={imageUrl}
      alt={`${name} sprite`}
    />
    <h2 className="text-center text-xl h-75">{name}</h2>
    <div className="m-2 text-center">
      {types.map((type, index) => (
        <span key={index} className={`mr-2 p-1 px-3 rounded-full text-center w-1/2 ${getTypeColor(type)}`}>
          {type}
        </span>
      ))}
    </div>
    <PokeAction pokemonName={name} />
  </div>)
};



export default PokemonItem;
