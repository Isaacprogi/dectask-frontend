import { Outlet } from "react-router-dom"
import Header from "../../components/Header/Header"

const Home:React.FC = () => {

  return (
   <div className="w-full bg-neutral-200 min-h-[calc(100%-4rem)]">
   <Header/>
   <div className="w-full ">
   <Outlet/>
   </div>
   </div>
  )
}

export default Home