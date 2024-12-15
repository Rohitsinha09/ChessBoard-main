import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Ciri } from "../ModelCreature/ciri";
import { Heroine } from "../ModelCreature/heroine";
import { Heimdall } from "../ModelCreature/heimdall";
import { BoyWarrior } from "../ModelCreature/boy_warrior";

const RenderModel = ({ model }: { model: string }) => {
  const renderSelectedModel = () => {
    switch (model) {
      case 'Saira':
        return <Ciri url="/genshin_impact_-_chiori.glb" />;
      case 'LaurenFlow':
        return <Heroine url="/hero_guinevere_lotus_lobby.glb" />;
      case 'Devil':
        return <Heimdall url="/heimdall.glb" />;
      case 'CrackBooster':
        return <BoyWarrior url="/boy_warrior.glb" />;
      default:
        return null;
    }
  };

  return (
    <div className=" h-[35vh]   md:h-[50vh]  md:w-full  w-4/5">
      <div className="flex flex-col  gap-2  h-full">
        <Canvas>
          <Environment preset="sunset" />
          <OrbitControls />
          {renderSelectedModel()}
        </Canvas>
        <h1 className="text-center text-lg text-purple">{model}</h1>
      </div>
    </div>
  );
};

export default RenderModel;
