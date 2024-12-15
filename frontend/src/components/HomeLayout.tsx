import { Outlet } from "react-router-dom";
import { Spotlight } from "./ui/Spotlight";

const HomeLayout = () => {
  return (
    <div className=" max-w-7xl w-full min-h-screen">
    <div className="pb-20">
    <div>
      <Spotlight className=" -top-40 -left-10 md:-left-32 md:-top-20 h-screen  "  fill="purple"/>
      <Spotlight className=" top-10  left-full  h-[80vh] w-[50vw]" fill="purple" />
        </div>
        <div className="h-screen w-full dark:bg-black-100 bg-white  dark:bg-grid-white/[0.03] bg-grid-black/[0.3]  absolute top-0 left-0 flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 
      flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"/>
      </div>
      <section className="flex justify-center relative  text-white-200">
        <Outlet/>
       </section>
    </div>
    </div>
  )
}

export default HomeLayout