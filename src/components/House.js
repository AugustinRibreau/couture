import * as THREE from 'three';
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

// Import Assets
// import ClearWood from '../assets/clearWood.png';
// import DarkWood from '../assets/darkWood.jpg';
import _House from '../assets/house.gltf';

const House = ({ position, size, terrainId, terrain, setTerrainName, setTerrainOwner, setHasOwner, setTerrainId }) => {
    // const [surface, color] = useLoader(TextureLoader, [DarkWood, ClearWood])
    const { nodes, materials } = useGLTF(_House);
    const clickHandler = () => {
        setTerrainName(terrain.name)
        setTerrainId(terrainId)

        if (terrain.owner === '0x0000000000000000000000000000000000000000') {
            setTerrainOwner('Libre')
            setHasOwner(false)
        } else {
            setTerrainOwner(terrainId.owner)
            setHasOwner(true)
        }
    }

    nodes.House_13.up.y = 0;
    nodes.House_13.parent.rotation.x = 50;

    return (
        <mesh
            castShadow
            receiveShadow
            onClick={clickHandler}
            geometry={nodes.House_13.geometry}
            material={materials["House 1"]}
            rotation={[Math.PI / 2, 0, 0]}
            position={[position[0], position[1], -1]}
            scale={[0.1, 0.1, 0.1]}
        >
        </mesh>
    );
}

export default House;
