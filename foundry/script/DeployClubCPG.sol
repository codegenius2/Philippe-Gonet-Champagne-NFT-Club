// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import "../src/ClubCPG.sol";

// import {HelperConfig} from "./HelperConfig.s.sol";

contract DeployClubCPG is Script {
    string _name = "test";
    string _symbol = "test";
    string _uri = "https://uri.com";
    uint8 _maxWallet = 3;
    uint256 _maxSupply = 300;
    uint256 _price = 1 * 10 ** 6;
    address _usdcAddress = 0xFEca406dA9727A25E71e732F9961F680059eF1F9;

    function run() external returns (ClubCPG) {
        vm.startBroadcast();
        ClubCPG clubCPG = new ClubCPG(
            _name,
            _symbol,
            _uri,
            _maxWallet,
            _maxSupply,
            _price,
            _usdcAddress
        );
        vm.stopBroadcast();
        return clubCPG;
    }
}
