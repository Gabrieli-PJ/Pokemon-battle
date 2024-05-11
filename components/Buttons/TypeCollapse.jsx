import { useState, useEffect, React } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

const typeAccordion = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [types, setTypes] = useState([])

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/type?limit=18')
        const typeList = response.data.results

        const typeDetailsPromises = typeList.map(async (type) => {
          const typeDetailsResponse = await axios.get(type.url)
          return {
            id: typeDetailsResponse.data.id,
            name: typeDetailsResponse.data.name
          }
        })

        const typeDetails = await Promise.all(typeDetailsPromises)
        setTypes(typeDetails)
      } catch (error) {
        console.error('Error fetching Pokemon data:', error)
      }
    }

    fetchTypes()
  }, [])

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
        <div className="flex flex-col items-center accordion ">
            <button className="accordion-header transition-all duration-300 ease-in-out  inline-flex mx-1 my-1 w-full py-3 justify-center items-center rounded-md bg-orange-400 hover:bg-orange-500 border-b-4 border-orange-700 hover:border-orange-800" onClick={toggleAccordion}>
                <h2 className='text-md font-medium text-orange-100 tracking-wider'>Tipos</h2>
                <span className='text-md font-medium text-orange-100 tracking-wider'>{isOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
            </button>
            <AnimatePresence>
                {isOpen && <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="accordion-content w-full -mt-2 rounded-b-md bg-orange-100 border-x-2 border-b-4 border-b-orange-700 border-orange-300">
                        <div className="w-full overflow-y-auto max-h-60">
                            {types.map((type) => (
                                <Link className='flex flex-row flex-wrap text-orange-900 items-center hover:bg-orange-200' key={type.id} href={`/types/${type.name}`} passHref>
                                    <Image
                                        width={40}
                                        height={40}
                                        className='mx-2 my-2'
                                        src={`/types/Pokemon_Type_Icon_${type.name}.svg`}
                                        alt={`Icone do tipo ${type.name}`}
                                    />
                                    {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                                </Link>
                            ))}
                        </div>
                </motion.div>}

            </AnimatePresence>
        </div>
  )
}

export default typeAccordion
