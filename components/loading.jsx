import Image from 'next/image'
import { React } from 'react'
import Poke from '@/public/Poke.svg'

export default function Loading () {
  return (
        <section className="flex my-48 py-1 h-full justify-center">
            <div className="flex flex-col flex-wrap text-center">
            <h2 className="pt-5 text-3xl font-semibold text-blue-500">Carregando...</h2>
            <Image
            className="self-center"
            src={Poke}
            alt="loading screen"
            width={100}
            height={100} />
            </div>
        </section>

  )
}
