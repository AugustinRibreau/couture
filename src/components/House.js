import React from "react";
import {useGLTF} from "@react-three/drei";

// Import Assets
import _HouseModel from '../assets/house.gltf';

// This component is used to represent a house on a terrain in a 3D scene
const HouseComponent = ({
                            position,
                            size,
                            houseId,
                            house,
                            setHouseName,
                            setHouseOwner,
                            setOwnershipStatus,
                            setHouseId
                        }) => {
    const {nodes, materials} = useGLTF(_HouseModel);

    // Click handler function to update the state for the plot
    const handleOnClick = () => {
        setHouseName(house.name)
        setHouseId(houseId)

        // Checking if the plot is owned
        if (house.owner === '0x0000000000000000000000000000000000000000') {
            setHouseOwner('Free');
            setOwnershipStatus(false);
        } else {
            setHouseOwner(houseId.owner);
            setOwnershipStatus(true);
        }
    }

    // Adjust the house position and rotation in the scene
    nodes.House_13.up.y = 0;
    nodes.House_13.parent.rotation.x = 50;

    // Render the house model in the 3D scene
    return (
        <mesh
            castShadow
            receiveShadow
            onClick={handleOnClick}
            geometry={nodes.House_13.geometry}
            material={materials["House 1"]}
            rotation={[Math.PI / 2, 0, 0]}
            position={[position[0], position[1], -1]}
            scale={[0.1, 0.1, 0.1]}
        >
        </mesh>
    );
}

export default HouseComponent;
