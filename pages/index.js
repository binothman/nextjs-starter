import Link from 'next/link'

const Home = () => (
  <div className="home">
    Welcome to Next.js! fsd
    <Link href='/about'>
      <a>about</a>
    </Link>
  </div>
)

export default Home
