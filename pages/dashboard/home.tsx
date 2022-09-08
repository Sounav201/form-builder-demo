import Head from 'next/head'
import Sidebar from '../../components/dashboard/sidebar'
import Container from '../../components/dashboard/Container'
import Header from '../../components/dashboard/Header'


export default function Home() {
  return (
    <div className="w-full h-full">
      <div className="flex w-full h-full bg-my_bg_img" >
        <Sidebar />
        <div className="w-full h-full bg-gradient-to-tr from-black/50 to-gray-900/0  ">
          <Header />
          <Container />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}
