import { Heroine } from "@/components/ModelCreature/heroine";
import { BoyWarrior } from "@/components/ModelCreature/boy_warrior";
import { Ciri } from "@/components/ModelCreature/ciri";
import { Heimdall } from "@/components/ModelCreature/heimdall";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useToast } from "@/components/ui/use-toast"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useModel } from '@/components/provider/ModelProvider';
const ChooseCharacter = () => {
  const { toast } = useToast()
  
  const { setSelectedModel } = useModel();
  
  const handleClick=(name:string)=>{
    setSelectedModel(name);
    toast({
      title: "🤞 Character Locked In!",
      description: `${name} is excited to join your adventure. Let's play!`,
   })
    console.log("model",name);
  }
  return (
    <div className="h-[50vh] flex mx-auto my-auto items-center"> 
      <Carousel className="w-full min-h-full max-w-xs md:max-w-sm  text-xl text-purple">
        <CarouselContent>
          <CarouselItem onClick={()=>{
            handleClick("Saira");
          }
          }>
            <div className="flex flex-col gap-3 h-full w-full items-center">
            <Canvas>
              <Environment preset="sunset"/>
              <OrbitControls/>
              <Ciri  url="/genshin_impact_-_chiori.glb"/>
            </Canvas>
            <h1>Saira</h1>
            </div>
           
          </CarouselItem> 

          <CarouselItem onClick={()=>handleClick("LaurenFlow")}>
          <div className="flex flex-col gap-3 h-full w-full items-center">
            <Canvas>
              <Environment preset="sunset"/>
              <OrbitControls/>
              <Heroine  url="/hero_guinevere_lotus_lobby.glb"/>
            </Canvas>
            <h1>LaurenFlow</h1>
            </div>
          </CarouselItem>

          <CarouselItem onClick={()=>handleClick("Devil")}>
          <div className="flex flex-col gap-3 h-full w-full items-center">
            <Canvas>
              <Environment preset="sunset"/>
              <OrbitControls/>
              <Heimdall  url="/heimdall.glb"/>
             
            </Canvas>
            <h1>Devil</h1>
            </div>
          </CarouselItem>

          <CarouselItem onClick={()=>handleClick("CrackBooster")}>
          <div className="flex flex-col gap-3 h-full w-full items-center">
            <Canvas>
              <Environment preset="sunset"/>
              <OrbitControls/>
              <BoyWarrior  url="/boy_warrior.glb"/>
            </Canvas>
            <h1>CrackBooster</h1>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ChooseCharacter;
