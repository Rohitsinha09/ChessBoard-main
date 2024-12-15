import  { useRef } from 'react';
import { useGLTF} from '@react-three/drei';
import * as THREE from 'three';
import { GLTF as GLTFType} from 'three-stdlib'
import { GroupProps,useFrame } from '@react-three/fiber'
interface GLTFResult extends GLTFType {
  nodes: {
    _rootJoint: THREE.Object3D;
    Object_8: THREE.SkinnedMesh;
    Object_10: THREE.SkinnedMesh;
    Object_11: THREE.SkinnedMesh;
  };
  materials: {
    FX_M_CityAction_guinevere_skin03_hehua01: THREE.Material;
    Guinevere01_d3: THREE.Material;
    Guinevere_high3: THREE.Material;
  };
  animations: THREE.AnimationClip[];
}
interface ModelProps extends GroupProps {
    url: string;
  }
export function Heroine(props:ModelProps) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF(props.url) as unknown as GLTFResult;
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime);
    }
  });

  return (
    <group ref={group} {...props} dispose={null}
    position={[0,-3.5,0.0]}
    scale={[340,340,340]}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="hero_Guinevere_skin03_high_addfbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="hero_Guinevere_skin03_high_add">
                  <group name="Object_5">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_8"
                      geometry={nodes.Object_8.geometry}
                      material={materials.FX_M_CityAction_guinevere_skin03_hehua01}
                      skeleton={nodes.Object_8.skeleton}
                    />
                    <skinnedMesh
                      name="Object_10"
                      geometry={nodes.Object_10.geometry}
                      material={materials.Guinevere01_d3}
                      skeleton={nodes.Object_10.skeleton}
                    />
                    <skinnedMesh
                      name="Object_11"
                      geometry={nodes.Object_11.geometry}
                      material={materials.Guinevere_high3}
                      skeleton={nodes.Object_11.skeleton}
                    />
                    <group name="Object_7" position={[-0.658903, 0.955993, 0.035389]} />
                    <group name="Object_9" rotation={[-Math.PI / 2, 0, 0]} />
                    <group
                      name="Hero_Directional_light"
                      position={[0.052, 0, 0]}
                      rotation={[2.743729, 0.489117, -2.86984]}
                      scale={0.865385}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/hero_guinevere_lotus_lobby.glb');
