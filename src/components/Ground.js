const Ground = () => {
    return (
        <mesh position={[0, 0, 0]}>
            <planeBufferGeometry attach="geometry" args={[50, 50]} />
            <meshStandardMaterial color={"#94c994"} />
        </mesh>
    );
}

export default Ground;
