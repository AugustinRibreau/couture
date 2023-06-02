import './App.css';
import Web3 from 'web3';
import { Suspense, useState, useEffect } from 'react';
import Terrain from './abis/Terrain.json';
import Ground from './components/Ground';
import Plot from './components/Plot';
import House from './components/House';
import { Sky, MapControls } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { Canvas } from '@react-three/fiber';

function App() {

	const [web3, setWeb3] = useState(null)
	const [account, setAccount] = useState(null)
	const [terrainContract, setTerrainContract] = useState(null)
	const [cost, setCost] = useState(0)
	const [houses, setHouses] = useState(null)
	const [terrainId, setTerrainId] = useState(null)
	const [terrainName, setTerrainName] = useState(null)
	const [terrainOwner, setTerrainOwner] = useState(null)
	const [hasOwner, setHasOwner] = useState(false)
	const textConnexion = account ? account : "Connexion au wallet"

  	useEffect(() => {
		loadBlockchainData()
	}, [account])

  const loadBlockchainData = async () => {
		if (typeof window.ethereum !== 'undefined') {
			const web3 = new Web3(window.ethereum)
			setWeb3(web3)

			const accounts = await web3.eth.getAccounts()

			if (accounts.length > 0) {
				setAccount(accounts[0])
			}

			const networkId = await web3.eth.net.getId()

			const terrain = new web3.eth.Contract(Terrain.abi, Terrain.networks[networkId].address)
			setTerrainContract(terrain)

			const cost = await terrain.methods.cost().call()
			setCost(web3.utils.fromWei(cost.toString(), 'ether'))

			const houses = await terrain.methods.getHouses().call()
			setHouses(houses)

			// Event listeners...
			window.ethereum.on('accountsChanged', function (accounts) {
				setAccount(accounts[0])
			})

			window.ethereum.on('chainChanged', (chainId) => {
				window.location.reload();
			})
		}
	}

	const web3Handler = async () => {
		if (web3) {
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			setAccount(accounts[0])
		}
	}

  const buyHandler = async (_id) => {
		try {
			await terrainContract.methods.mint(_id).send({ from: account, value: '1000000000000000000' })

			const houses = await terrainContract.methods.getHouses().call()
			setHouses(houses)

			setTerrainName(houses[_id - 1].name)
			setTerrainOwner(houses[_id - 1].owner)
			setHasOwner(true)
		} catch (error) {
			window.alert('Error occurred when buying')
		}
	}

  return (
    <div>
			<button onClick={web3Handler} className="btn--connexion">{ textConnexion }</button>
			<Canvas camera={{ position: [0, 0, 30], up: [0, 0, 1], far: 10000 }}>
				<Suspense fallback={null}>
					<Sky distance={450000} sunPosition={[1, 10, 0]} inclination={0} azimuth={0.25} />

					<ambientLight intensity={0.5} />

					<Physics>
						{houses && houses.map((house, index) => {
							if (house.owner === '0x0000000000000000000000000000000000000000') {
								return (
									<Plot
										key={index}
										position={[house.posX, house.posY, 0.1]}
										size={[house.sizeX, house.sizeY]}
										plotId={index + 1}
										plot={house}
										setPlotName={setTerrainName}
										setPlotOwner={setTerrainOwner}
										setOwnershipStatus={setHasOwner}
										setPlotId={setTerrainId}
									/>
								)
							} else {
								return (
									<House
										key={index}
										position={[house.posX, house.posY, 0.1]}
										size={[house.sizeX, house.sizeY, house.sizeZ]}
										houseId={index + 1}
										house={house}
										setHouseName={setTerrainName}
										setHouseOwner={setTerrainOwner}
										setOwnershipStatus={setHasOwner}
										setHouseId={setTerrainId}
									/>
								)
							}
						})}
					</Physics>

					<Ground />
				</Suspense>
				<MapControls />
			</Canvas>

			{terrainId && (
				<div id="modal">
					<h1 className="title">{terrainName}</h1>

					<div className="content">
						<div>
							<p className="content--title">ID :</p>
							<p className="content--text">{terrainId}</p>
						</div>

						<div>
							<p className="content--title">Owner :</p>
							<p className="content--text">{terrainOwner}</p>
						</div>

						{!hasOwner && (
							<div>
								<p className="content--title">Cost :</p>
								<p className="content--text">{`${cost} ETH`}</p>
							</div>
						)}
					</div>

					{!hasOwner && (
						<button className="button" onClick={() => buyHandler(terrainId)}>Acheter</button>
					)}
				</div>
			)}
		</div>
  );
}

export default App;
