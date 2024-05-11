// TypeButton.jsx
import Link from 'next/link'
import axios from 'axios'
import { FaAngleDown } from 'react-icons/fa'
import { useState, useEffect, useRef, React } from 'react'
import Image from 'next/image'

const TypeButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [types, setTypes] = useState([])
  const dropdownRef = useRef(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', closeDropdown)

    return () => {
      document.removeEventListener('click', closeDropdown)
    }
  }, [])

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

  return (
    <div ref={dropdownRef} className="relative inline-block text-center dropdown">
      <div>
        <button
          type="button"
          className='inline-flex mx-1 my-1 transition-all duration-500 ease-in-out lg:w-40 w-24 py-3 justify-center items-center rounded-md bg-orange-400 hover:bg-orange-500 border-b-4 border-orange-700 hover:border-orange-800'
          onClick={toggleDropdown}
        >
          <p className='lg:text-lg text-sm font-medium text-orange-100 tracking-wider'>Tipos</p> <FaAngleDown className="lg:ms-5 ms-1 text-md font-medium text-orange-100" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-1 z-10 w-40 origin-top-center rounded-md bg-orange-100 border-2 border-orange-300 shadow-lg focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
          <div className="w-full overflow-y-auto max-h-60 py-1" role="none">
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
        </div>
      )}
    </div>
  )
}

export default TypeButton
