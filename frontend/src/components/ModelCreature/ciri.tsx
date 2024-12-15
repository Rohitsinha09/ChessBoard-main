import  { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { GLTF as GLTFType} from 'three-stdlib'
import { GroupProps ,useFrame} from '@react-three/fiber'
interface GLTFResult extends GLTFType {
    nodes: {
      _rootJoint: THREE.Object3D;
      Object_359: THREE.SkinnedMesh;
      Object_360: THREE.SkinnedMesh;
      Object_361: THREE.SkinnedMesh;
    };
    materials: {
      material: THREE.Material;
      material_1: THREE.Material;
      material_2: THREE.Material;
    };
  }
  interface ModelProps extends GroupProps {
    url: string;
  }
  export function Ciri(props:ModelProps) {
    const modelRef = useRef<THREE.Group>(null);
    const { nodes, materials } = useGLTF(props.url) as unknown as GLTFResult;
    useFrame((state) => {
      if (modelRef.current) {
        modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime);
      }
    });
    return (
      <group ref={ modelRef} {...props} dispose={null}
      position={[0,-3.5,0.0]}
      scale={[3.5,3.5,3.5]}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <primitive object={nodes._rootJoint} />
          <skinnedMesh
            geometry={nodes.Object_359.geometry}
            material={materials.material}
            skeleton={nodes.Object_359.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Object_360.geometry}
            material={materials.material_1}
            skeleton={nodes.Object_360.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Object_361.geometry}
            material={materials.material_2}
            skeleton={nodes.Object_361.skeleton}
          />
        </group>
      </group>
    );
  }
  
  useGLTF.preload('/genshin_impact_-_chiori.glb');