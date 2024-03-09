// PokeActions
import Link from "next/link";

export default function PokeAction({ pokemonName }) {
    const formattedPokemonName = pokemonName ? pokemonName.toLowerCase() : '';

    return (
        <>
            <div className="self-center m-2">
                <Link href={`/pokemon/${formattedPokemonName}`}>
                    <button className="bg-orange-400 tracking-widest hover:bg-orange-500 text-white py-2 px-4 border-b-4 border-orange-500 hover:border-orange-800 rounded">
                        Ver Pokémon
                    </button>
                </Link>
            </div>
        </>
    );
}
