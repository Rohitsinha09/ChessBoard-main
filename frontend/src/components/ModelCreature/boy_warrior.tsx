import  { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib'
import * as THREE from 'three'; 
import { GroupProps,useFrame } from '@react-three/fiber'
interface GLTFResult extends GLTF {
  nodes: {
    Object_4: THREE.Mesh;
    Object_9: THREE.SkinnedMesh;
    Object_10: THREE.SkinnedMesh;
    GLTF_created_0_rootJoint: THREE.Bone;
  };
  materials: {
    Sword: THREE.Material;
    Material: THREE.Material;
    material_0: THREE.Material;
  };
  animations: THREE.AnimationClip[];
}
interface ModelProps extends GroupProps {
  url: string;
}
export function BoyWarrior(props: ModelProps) {
  const modelRef = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF(props.url) as unknown as GLTFResult; //animations as a prop
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime);
    }
  });

  return (
    <group ref={ modelRef} {...props} dispose={null}
    position={[0,-2.8,0.0]}
    scale={[6.5,6.5,6.5]}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group
                name="Cube_52"
                position={[0.176, 0.206, -0.078]}
                rotation={[3.066, 0.633, 0.397]}
                scale={0.653}
              >
                <mesh
                  name="Object_4"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_4.geometry}
                  material={materials.Sword}
                />
              </group>
              <group name="rig_388">
                <group name="GLTF_created_0">
                  <primitive object={nodes.GLTF_created_0_rootJoint} />
                  <skinnedMesh
                    name="Object_9"
                    geometry={nodes.Object_9.geometry}
                    material={materials.Material}
                    skeleton={nodes.Object_9.skeleton}
                  />
                  <skinnedMesh
                    name="Object_10"
                    geometry={nodes.Object_10.geometry}
                    material={materials.material_0}
                    skeleton={nodes.Object_10.skeleton}
                  />
                  <group name="Cube001_387" />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/boy_warrior.glb');
