// pages/pokemon/[pokemon].js
import { useRouter } from 'next/router'
import { useState, useEffect, React } from 'react'
import axios from 'axios'
import Loading from '@/components/loading'
import Head from 'next/head'
import PokeCard from '@/components/PokeCard'
import StatsButton from '@/components/Buttons/StatsButton'
import MovesButton from '@/components/Buttons/MovesButton'
import typeEffectiveness from '@/data/typesWS.json'

const PokemonPage = () => {
  const router = useRouter()
  const { pokemon } = router.query

  const [loading, setLoading] = useState(true)
  const [details, setDetails] = useState(null)

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        const pokemonDetails = {
          name: response.data.name,
          id: response.data.id,
          height: response.data.height,
          weight: response.data.weight,
          types: response.data.types.map((type) => type.type.name.toUpperCase()),
          abilities: response.data.abilities.map((ability) => ability.ability.name),
          imageUrl: response.data.sprites?.other['official-artwork'].front_default,
          stats: response.data.stats,
          moves: response.data.moves
          // Add other essential details
        }

        setDetails(pokemonDetails)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching Pokemon details:', error)
        setLoading(false)
      }
    }

    if (pokemon) {
      fetchPokemonDetails()
    }
  }, [pokemon])

  return (
    <>
      <Head>
        <title>{details ? details.name : 'Loading...'}</title>
      </Head>
      {loading
        ? (<Loading />)
        : (
        <div className='flex flex-col w-full justify-center items-center'>
          <PokeCard key={details.name} {...details} typeEffectiveness={typeEffectiveness} />
          {/* Stats Button */}
          <StatsButton stats={details.stats} />
          <MovesButton moves={details.moves} />
        </div>
          )}
    </>
  )
}

export default PokemonPage
