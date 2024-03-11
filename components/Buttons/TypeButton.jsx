// TypeButton.jsx
import Link from 'next/link'
import axios from 'axios'
import { FaAngleDown } from 'react-icons/fa'
import { useState, useEffect, useRef, React } from 'react'
import styles from '@/styles/Button.module.css'

const TypeButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [type, setTypes] = useState([])
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
    const fetchType = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/type?limit=18')
        const ResponseList = response.data.results

        const typeDetailPromises = ResponseList.map(async (region) => {
          const typeDetailsResponse = await axios.get(region.url)
          return {
            id: typeDetailsResponse.data.id,
            types: typeDetailsResponse.data.name
          }
        })

        const typeDetails = await Promise.all(typeDetailPromises)
        setTypes(typeDetails)
      } catch (error) {
        console.error('Error fetching Pokemon data:', error)
      }
    }

    fetchType()
  }, [])

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      <button className={styles.toggle} onClick={toggleDropdown}>
        Tipos <FaAngleDown className="ms-5" />
      </button>
      {isOpen && (
        <div className={styles.menu}>
          {type.map((type) => (
            <Link key={type.id} href={`/types/${type.types}`} passHref>
                <img
                  src={`/types/Pokemon_Type_Icon_${type.types}.svg`}
                  alt={`Icone do tipo ${type.types}`}
                  className={styles.typeIcon}
                />
                {type.types}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default TypeButton
