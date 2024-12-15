import { Environment, OrbitControls } from "@react-three/drei"
import {Canvas} from "@react-three/fiber"
 import {Chess} from "./Chess"

const ThreeModel = () => {
  return (
    <div className=" h-[50vh] w-screen">
       <div className="flex  w-full h-full flex-col  items-center gap-4">
        <Canvas>
        <Environment preset="sunset"/>
          <OrbitControls/>
          <Chess url='/wooden_chess.glb'/>
        </Canvas>
       
      
    </div>
        </div>
  
  )
}

export default ThreeModel

