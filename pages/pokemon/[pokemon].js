// pages/pokemon/[pokemon].js
import { useRouter } from 'next/router'
import { useState, useEffect, React } from 'react'
import axios from 'axios'
import Loading from '@/components/loading'
import Head from 'next/head'
import PokeCard from '@/components/PokeCard'
import ButtonGroup from '@/components/Buttons/buttonGroup'
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
          abilities: await Promise.all(response.data.abilities.map(async (ability) => {
            const abilityResponse = await axios.get(ability.ability.url)
            const englishAbility = abilityResponse.data.effect_entries.find(entry => entry.language.name === 'en')
            return englishAbility ? { name: ability.ability.name, effect: englishAbility.effect } : null
          }).filter(Boolean)),
          imageUrl: response.data.sprites?.other['official-artwork'].front_default,
          stats: response.data.stats,
          moves: response.data.moves
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
          <section className=''>
            <PokeCard key={details.name} {...details} typeEffectiveness={typeEffectiveness} />
            {/* Stats Button */}
            <ButtonGroup id={details.id} stats={details.stats} moves={details.moves} />
          </section>
          )}
    </>
  )
}

export default PokemonPage
