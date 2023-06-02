const PlotComponent = ({
                           position,
                           size,
                           plotId,
                           plot,
                           setPlotName,
                           setPlotOwner,
                           setOwnershipStatus,
                           setPlotId
                       }) => {
    // Click handler function to update the state for the plot
    const handleOnClick = () => {
        setPlotName(plot.name)
        setPlotId(plotId)

        // Checking if the plot is owned
        if (plot.owner === '0x0000000000000000000000000000000000000000') {
            setPlotOwner('Free');
            setOwnershipStatus(false);
        } else {
            setPlotOwner(plot.owner);
            setOwnershipStatus(true);
        }
    }

    // Render a plot in the 3D scene
    return (
        <mesh position={position} onClick={handleOnClick}>
            <planeBufferGeometry attach="geometry" args={size} />
            <meshStandardMaterial color={"#397939"} metalness={0.5} roughness={0} />
        </mesh>
    );
}

export default PlotComponent;
