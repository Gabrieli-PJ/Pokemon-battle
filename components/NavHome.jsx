import Link from 'next/link'
import { React } from 'react'
import Image from 'next/image'
import Logo from '@/public/LogoBattle.png'
import TypeButton from './Buttons/TypeButton'
import VersionButton from './Buttons/GameButton'

export default function NavHome () {
  return (

        <nav className="flex flex-wrap items-center justify-between bg-yellow-200 border-b-4 p-2 border-yellow-400">
            <Link href={'/'} className="flex row items-center ">
                <Image
                    src={Logo}
                    width={200}
                    height={50}
                    alt="Logo pokemon"
                />
            </Link>
            <div>
                <TypeButton />
                <VersionButton />
                <Link href="/myTeam"><button className="bg-red-500 tracking-widest hover:bg-red-700 text-orange-100 py-2 px-4 border-b-4 border-red-800 hover:border-red-900 rounded">Equipe</button></Link>
            </div>
        </nav>
  )
}
