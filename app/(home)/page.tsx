import Link from 'next/link'

const Home = () => {
  return (
    <Link href="/about/123">
      <button className="text-red flex w-full">Ir</button>
    </Link>
  )
}

export default Home
