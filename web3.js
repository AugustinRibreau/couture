const Web3 = require('web3');
const TruffleContract = require('@truffle/contract');

// Initialiser web3
let web3;
if (typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum);
    window.ethereum.enable();
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545")); // Fallback for local Ganache test network
}

// Récupérer le JSON du contrat compilé avec Truffle
const MaisonContractJson = require('./build/contracts/MaisonContract.json');

// Initialiser le contrat Truffle
const MaisonContract = TruffleContract(MaisonContractJson);
MaisonContract.setProvider(web3.currentProvider);

// Définition des fonctions pour interagir avec le contrat
async function mintMaison(tokenId) {
    const accounts = await web3.eth.getAccounts();
    const instance = await MaisonContract.deployed();
    await instance.mint(accounts[0], tokenId, { value: web3.utils.toWei('1', 'ether'), from: accounts[0] });
}

async function getMaisonOwner(tokenId) {
    const instance = await MaisonContract.deployed();
    const owner = await instance.ownerOf(tokenId);
    return owner;
}

async function getMaison(tokenId) {
    const instance = await MaisonContract.deployed();
    const maison = await instance.maisons(tokenId);
    return maison;
}

async function getAllMaisons() {
    const instance = await MaisonContract.deployed();
    const maisons = await instance.getAllMaisons();
    return maisons;
}

// Mettre à jour le metaverse lorsque de nouvelles maisons sont minted
MaisonContract.deployed().then(function(instance) {
    instance.Transfer({}, function(error, event) {
        if (error) console.error('Error on Transfer event:', error);
        else {
            // Mettre à jour le Metaverse
            // Vous aurez besoin de remplacer cette fonction par quelque chose qui met à jour réellement votre scène 3D
            updateMetaverse(event);
        }
    });
});