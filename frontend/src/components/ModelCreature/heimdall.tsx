import  { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { GLTF as GLTFType} from 'three-stdlib'
import { GroupProps,useFrame } from '@react-three/fiber'
interface GLTFResult extends GLTFType {
  nodes: {
    _rootJoint: THREE.Object3D;
    Object_6: THREE.SkinnedMesh;
    Object_7: THREE.SkinnedMesh;
    Object_8: THREE.SkinnedMesh;
    Object_9: THREE.SkinnedMesh;
    Object_10: THREE.SkinnedMesh;
    Object_11: THREE.SkinnedMesh;
  };
  materials: {
    group_0: THREE.Material;
    group_1: THREE.Material;
    group_2: THREE.Material;
    group_3: THREE.Material;
    group_4: THREE.Material;
    group_5: THREE.Material;
  };
}
interface ModelProps extends GroupProps {
  url: string;
}
export function Heimdall(props: ModelProps) {
  const modelRef = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF(props.url) as unknown as GLTFResult;
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime);
    }
  });
  return (
    <group  ref={ modelRef} {...props} dispose={null}
    position={[0,-2.8,0.0]}
    scale={[7.5,7.5,7.5]}>
      <group scale={0.025}>
        <primitive object={nodes._rootJoint} />
        <skinnedMesh
          geometry={nodes.Object_6.geometry}
          material={materials.group_0}
          skeleton={nodes.Object_6.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_7.geometry}
          material={materials.group_1}
          skeleton={nodes.Object_7.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_8.geometry}
          material={materials.group_2}
          skeleton={nodes.Object_8.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_9.geometry}
          material={materials.group_3}
          skeleton={nodes.Object_9.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_10.geometry}
          material={materials.group_4}
          skeleton={nodes.Object_10.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_11.geometry}
          material={materials.group_5}
          skeleton={nodes.Object_11.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/heimdall.glb');
