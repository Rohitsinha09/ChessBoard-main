import  { useRef } from 'react';
import {  useGLTF} from '@react-three/drei';
import { GroupProps, useFrame } from '@react-three/fiber';
import { GLTF } from 'three-stdlib';
import { Mesh, Material } from 'three';
import * as THREE from 'three';


type GLTFResult = GLTF & {
  nodes: {
    defaultMaterial: Mesh;
    defaultMaterial_1: Mesh;
    defaultMaterial_2: Mesh;
    defaultMaterial_3: Mesh;
    defaultMaterial_4: Mesh;
    defaultMaterial_5: Mesh;
    defaultMaterial_6: Mesh;
    defaultMaterial_7: Mesh;
    defaultMaterial_8: Mesh;
    defaultMaterial_9: Mesh;
    defaultMaterial_10: Mesh;
    defaultMaterial_11: Mesh;
    defaultMaterial_12: Mesh;
    defaultMaterial_13: Mesh;
    defaultMaterial_14: Mesh;
  };
  materials: {
    Chess: Material;
  };
};

interface ModelProps extends GroupProps {
  url: string;
}

export function Chess(props: ModelProps) {
  const modelRef = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF(props.url) as GLTFResult;
 
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime);
    }
  });

  return (
    <group
      {...props}
      dispose={null}
      rotation={[0.3, 0, -0.05]}
      position={[0, -0.05, 0]}
      ref={modelRef}
      scale={[0.11, 0.11, 0.11]}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial.geometry}
            material={materials.Chess}
            position={[-12.533, 7.162, 17.199]}
            rotation={[-Math.PI / 2, 0, -2.745]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_1.geometry}
            material={materials.Chess}
            position={[-2.486, 9.012, 17.529]}
            rotation={[-Math.PI / 2, 0, Math.PI]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_2.geometry}
            material={materials.Chess}
            position={[2.584, 9.131, 17.585]}
            rotation={[-Math.PI / 2, 0, 2.87]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_3.geometry}
            material={materials.Chess}
            position={[-17.503, 7.053, 17.675]}
            rotation={[-Math.PI / 2, 0, -0.106]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_4.geometry}
            material={materials.Chess}
            position={[-7.576, 7.896, 17.599]}
            rotation={[-Math.PI / 2, 0, -3.041]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_5.geometry}
            material={materials.Chess}
            position={[17.612, 6.474, 12.838]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_6.geometry}
            material={materials.Chess}
            position={[7.548, 7.896, -2.444]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_7.geometry}
            material={materials.Chess}
            position={[-17.503, 7.053, -17.491]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_8.geometry}
            material={materials.Chess}
            position={[7.353, 7.162, -6.978]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_9.geometry}
            material={materials.Chess}
            position={[-2.433, 6.474, -2.385]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_10.geometry}
            material={materials.Chess}
            position={[2.479, 9.131, -17.529]}
            rotation={[-Math.PI / 2, 0, 2.93]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_11.geometry}
            material={materials.Chess}
            position={[-2.381, 9.012, -17.585]}
            rotation={[-Math.PI / 2, 0, Math.PI]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_12.geometry}
            material={materials.Chess}
            position={[0, 4.557, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_13.geometry}
            material={materials.Chess}
            position={[0, 4.557, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_14.geometry}
            material={materials.Chess}
            position={[0, 3.303, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/wooden_chess.glb');
