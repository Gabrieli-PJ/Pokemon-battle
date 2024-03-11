import { FaGithub } from 'react-icons/fa'
import { React } from 'react'
import { MdCatchingPokemon } from 'react-icons/md'

export default function Footer () {
  return (

        <footer className="relative bottom-0 left-0 w-full bg-yellow-200 border-t-4 border-yellow-400 p-4">
            <a href="https://github.com/Gabrieli-PJ" className="flex flex-row items-center justify-center">
                <FaGithub className="text-3xl text-orange-800 me-2"/>
                <h1 className="text-3xl font-semibold text-orange-800">Gabrieli-PJ</h1>
            </a>
            <a href="https://pokeapi.co" className="flex flex-row items-center justify-center">
            <MdCatchingPokemon className="text-2xl text-blue-900 me-2"/>
            <h2 className="text-2xl text-blue-900">PokeApi.co</h2>
            </a>
        </footer>
  )
}
