// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MetaverseNFT is ERC721, Ownable {
    struct Maison {
        uint256 id;
        address owner;
    }

    Maison[] public maisons;
    uint256 public maxSupply;
    uint256 public totalSupply;
    uint256 public cost;

    constructor(uint256 _maxSupply, uint256 _cost) ERC721("MetaverseNFT", "MTVNFT") {
        maxSupply = _maxSupply;
        cost = _cost;
    }

    function mint() public payable {
        require(totalSupply < maxSupply, "Maximum supply reached");
        require(msg.value >= cost, "Insufficient ETH sent");

        Maison memory nouvelleMaison = Maison({
            id: totalSupply,
            owner: msg.sender
        });

        maisons.push(nouvelleMaison);
        _safeMint(msg.sender, totalSupply);

        totalSupply++;
    }

    function _safeMint(address to, uint256 tokenId) internal override(ERC721) {
        super._safeMint(to, tokenId);
    }
}