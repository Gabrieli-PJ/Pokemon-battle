import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { FaRegArrowAltCircleRight, FaRegArrowAltCircleDown } from 'react-icons/fa'
import Link from 'next/link'

const Evolution = ({ id }) => {
  const [evolutions, setEvolutions] = useState([])

  useEffect(() => {
    const fetchEvolutions = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
        const evolutionChainUrl = response.data.evolution_chain.url

        const evolutionResponse = await axios.get(evolutionChainUrl)
        const evolutionChain = evolutionResponse.data.chain

        const extractEvolutions = async (chain, currentEvolutions = []) => {
          if (chain) {
            const currentSpecies = {
              name: chain.species.name,
              id: chain.species.url.split('/').slice(-2, -1)[0]
            }
            const currentSpeciesData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${currentSpecies.id}/`)
            currentSpecies.imageUrl = currentSpeciesData.data.sprites.other['official-artwork'].front_default

            if (!currentEvolutions.find(e => e.id === currentSpecies.id)) {
              currentEvolutions.push(currentSpecies)
            }

            if (chain.evolves_to && chain.evolves_to.length > 0) {
              for (const evolution of chain.evolves_to) {
                const nextSpecies = {
                  name: evolution.species.name,
                  id: evolution.species.url.split('/').slice(-2, -1)[0]
                }
                const nextSpeciesData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nextSpecies.id}/`)
                nextSpecies.imageUrl = nextSpeciesData.data.sprites.other['official-artwork'].front_default

                if (!currentEvolutions.find(e => e.id === nextSpecies.id)) {
                  currentEvolutions.push(nextSpecies)
                }

                await extractEvolutions(evolution, currentEvolutions)
              }
            }
          }

          return currentEvolutions
        }

        const allEvolutions = await extractEvolutions(evolutionChain)

        setEvolutions(allEvolutions)
      } catch (error) {
        console.error('Error fetching evolutions:', error)
      }
    }

    fetchEvolutions()
  }, [id])

  const uniqueEvolutions = evolutions.filter((evolution, index, self) =>
    index === self.findIndex(e => e.id === evolution.id)
  )

  return (
    <>
      {uniqueEvolutions.map((evolution, index) => (
        <div key={evolution.id} className='flex lg:flex-row flex-col justify-center items-center'>
          <Link href={`${evolution.name}`} className='px-5'>
            <Image
              width={150}
              height={150}
              src={evolution.imageUrl}
              alt={evolution.name}
            />
            <p>{evolution.name.charAt(0).toUpperCase() + evolution.name.slice(1)}</p>
          </Link>
          {index < uniqueEvolutions.length - 1 && (
            <section>
              <div className='py-2 text-3xl lg:hidden inline-flex text-yellow-600'>
                <FaRegArrowAltCircleDown />
              </div>
              <div className='px-2 text-3xl lg:inline-flex hidden text-yellow-600'>
                <FaRegArrowAltCircleRight />
              </div>
            </section>
          )}
        </div>
      ))}
    </>
  )
}

Evolution.propTypes = {
  id: PropTypes.number.isRequired
}

export default Evolution
