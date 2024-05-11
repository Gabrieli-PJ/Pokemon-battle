import Image from 'next/image'
import { useState, React, useEffect } from 'react'
import Logo from '@/public/LogoBattle.png'
import TypeButton from './Buttons/TypeButton'
import TypeAccordion from './Buttons/TypeCollapse'
import VersionButton from './Buttons/GameButton'
import GameAccordion from './Buttons/GameCollapse'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { FaBars, FaTimes } from 'react-icons/fa'

const NavHome = () => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen)
  }

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <section className="lg:h-32 lg:bg-transparent bg-yellow-200 h-24 lg:border-none border-b-4 border-yellow-500 relative lg:mt-1 max-w-full">
      <div className='absolute top-[30px] right-[39px] z-10'>
        <button
          className="lg:hidden text-2xl focus:outline-none"
          onClick={toggleOffcanvas}
        >
          <FaBars className='text-orange-700 text-4xl' />
        </button>
      </div>
      <AnimatePresence>
        {isOffcanvasOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="fixed inset-y-0 inset-x-0 bg-gray-900 bg-opacity-50 z-50 flex justify-end">
            <div className="w-64 bg-yellow-100 h-full p-4">
              <nav className="flex flex-col mt-10">
                <TypeAccordion />
                <GameAccordion />
                <Link href="/myTeam">
                  <button className="text-gray-800 hover:text-gray-600">Equipe</button>
                </Link>
              </nav>
            </div>
            <button
              className="absolute top-4 right-4 text-2xl focus:outline-none"
              onClick={toggleOffcanvas}
            >
              <FaTimes className='text-orange-800' />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className='hidden lg:inline-flex absolute top-[30px] right-[39px] z-10'>
        <TypeButton />
        <VersionButton />
        <Link href="/myTeam">
          <button className="trasition-all duration-500 ease-in-out mx-1 my-1 lg:w-40 w-24 py-3 justify-center items-center rounded-md bg-red-500 hover:bg-red-700 border-b-4 border-red-800 hover:border-red-900 lg:text-lg text-sm font-medium text-orange-100 tracking-wider">Equipe</button>
        </Link>
      </div>
      <Image
        width={85}
        height={154}
        className="absolute hidden lg:inline-flex top-[6px] left-[39px]"
        loading="lazy"
        alt="shadow1"
        src="/vector-8.svg"
      />
      <Image
        width={32}
        height={16}
        className="absolute hidden lg:inline-flex top-0 left-[260px]"
        loading="lazy"
        alt="triangleShadow"
        src="/vector-9.svg"
      />
      {isSmallScreen
        ? (
          <nav>
            <Image
              width={50}
              height={50}
              className="absolute w-full top-0 bottom-0 left-0 -ms-[50px] z-[2]"
              alt="front"
              src="/front2.svg"
            />
            <Link href={'/'} className="absolute lg:top-6 top-5 bottom-0 left-[14px] z-[2]">
              <Image
                src={Logo}
                width={150}
                height={50}
                alt="Logo pokemon"
              />
            </Link>
          </nav>
          )
        : (
          <section>
            <Image
              width={50}
              height={50}
              className="absolute top-[11px] left-[3px] w-full h-auto z-[1]"
              alt="mainRectangle"
              src="/vector-5.svg"
            />
            <Image
              width={1159.5}
              height={50}
              className="absolute lg:w-3/5 top-0 bottom-0 left-0 z-[2]"
              alt="front"
              src="/front.svg"
            />
            <Link href={'/'} className="absolute lg:top-6 top-4 bottom-0 lg:left-[70px] left-[10px] z-[2]">
              <Image
                src={Logo}
                width={200}
                height={50}
                alt="Logo pokemon"
              />
            </Link>
            <Image
              width={895.5}
              height={3}
              className="absolute w-3/5  top-[117px] left-[357px] z-[3]"
              loading="lazy"
              alt="lineRightBottom"
              src="/vector-12.svg"
            />
            <Image
              width={895.5}
              height={3}
              className="absolute hidden lg:inline-flex top-[109px] left-[350px] z-[3]"
              loading="lazy"
              alt="lineRightBottom"
              src="/vector-12.svg"
            />
          </section>
          )}
    </section>
  )
}

export default NavHome
