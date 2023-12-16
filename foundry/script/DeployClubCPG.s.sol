// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import "../src/ClubCPG.sol";

// import {HelperConfig} from "./HelperConfig.s.sol";

contract DeployClubCPG is Script {
    string _name = "test";
    string _symbol = "test";
    string _uri =
        "https://fuchsia-capable-roundworm-590.mypinata.cloud/ipfs/QmVNN7rd4DnmedcWFttENGpoNtnrFWFouPjcG1VVHqHcFn";
    uint8 _maxWallet = 4;
    uint256 _maxSupply = 200;
    uint256 _price = 320 * 10 ** 6;
    address _usdcAddress = 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174;

    function run() external returns (ClubCPG) {
        vm.startBroadcast();
        ClubCPG clubCPG = new ClubCPG(_name, _symbol, _uri, _maxWallet, _maxSupply, _price, _usdcAddress);
        vm.stopBroadcast();
        return clubCPG;
    }
}
