// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Test, console} from "forge-std/Test.sol";
import {ClubCPG} from "../src/ClubCPG.sol";
import {DeployClubCPG} from "../script/DeployClubCPG.s.sol";
import "erc721a/contracts/extensions/ERC721AQueryable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";
import {Interface} from "./mocks/IUChildAdministrableERC20.sol";

contract ClubCPGTest is Test {
    // ================================================================
    // │                         Assumptions                          │
    // ================================================================

    // nonReentrant modifier
    // Math.tryMul

    // ================================================================
    // │                           EVENT                              │
    // ================================================================

    // Triggered when a new price is set
    event ClubCPG__SetNewPrice(uint256 indexed newPrice);

    // Triggered when a new maximum supply is set
    event ClubCPG__SetNewMaxSupply(uint256 indexed newMaxSupply);

    // Triggered when a mint from function succeed
    event ClubCPG__Mint(
        address indexed from,
        address indexed to,
        uint256 indexed totalPrice,
        uint8 quantity,
        uint256 currentIndex
    );

    // Triggered when a new URI is set
    event ClubCPG__SetNewUri(string newUri);
    // ================================================================
    // │                      Contract Parameter                      │
    // ================================================================

    string _name = "test";
    string _symbol = "test";
    string _uri =
        "https://fuchsia-capable-roundworm-590.mypinata.cloud/ipfs/QmVNN7rd4DnmedcWFttENGpoNtnrFWFouPjcG1VVHqHcFn";
    uint8 _maxWallet = 4;
    uint256 _maxSupply = 200;
    uint256 _price = 320 * 10 ** 6;
    address _usdcAddressMumbai = 0xFEca406dA9727A25E71e732F9961F680059eF1F9;
    //  0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174;

    // ================================================================
    // │                          UTILS                               │
    // ================================================================

    address USER = makeAddr("user");
    address USER2 = makeAddr("user2");
    address constant ZERO_ADDRESS = address(0);
    address constant DEAD_ADDRESS = 0x000000000000000000000000000000000000dEaD;
    uint256 constant STARTING_BALANCE = 10 ether;
    
    uint256 usdcBalance = 9999000000;

    Interface usdcPolygonAddress =
        Interface(0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174);
    address usdcAdminContract = 0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa;

    address constant PARTNERSHIP_ADDRESS = 0x7D535f5b19594c8366f0e39CEf0142133408BA63;
    ClubCPG clubCPG;

    // ================================================================
    // │                          SETUP                               │
    // ================================================================

    function setUp() external {
        DeployClubCPG deploy = new DeployClubCPG();
        clubCPG = deploy.run();
        vm.deal(USER, STARTING_BALANCE);

        bytes memory encodedBalance = abi.encode(usdcBalance);
        vm.prank(usdcAdminContract);
        usdcPolygonAddress.deposit(USER, encodedBalance);
        vm.prank(usdcAdminContract);
        usdcPolygonAddress.deposit(USER2, encodedBalance);
    }

    // ================================================================
    // │                      PRICE OPERATIONS                        │
    // ================================================================

    function testFail_ClubCPG_GetCurrentPrice() public view {
        uint256 price = clubCPG.getCurrentPrice();
        assert(price == _price + 1);
    }

    function test_ClubCPG_GetCurrentPrice() public view {
        uint256 price = clubCPG.getCurrentPrice();
        assert(price == _price);
    }

    function test_ClubCPG_RevertWhenNotOwnerTryToSetNewPrice() public {
        uint256 newPrice = 2 * 10 ** 6;
        vm.prank(USER);
        vm.expectRevert(
            abi.encodeWithSelector(
                Ownable.OwnableUnauthorizedAccount.selector,
                USER
            )
        );
        clubCPG.setPrice(newPrice);
    }

    function test_ClubCPG_RevertWhenOwnerTryToSetNewPriceToSamePrice() public {
        vm.prank(msg.sender);
        vm.expectRevert(ClubCPG.ClubCPG__CannotSetPriceToSamePrice.selector);
        clubCPG.setPrice(_price);
    }

    function test_ClubCPG_OwnerSetNewPrice() public {
        uint256 price = clubCPG.getCurrentPrice();
        uint256 newPrice = 2 * 10 ** 6;
        vm.prank(msg.sender);
        clubCPG.setPrice(newPrice);
        uint256 newPriceFromContract = clubCPG.getCurrentPrice();
        assert(price != newPriceFromContract);
        assert(newPrice == newPriceFromContract);
    }

    function test_ClubCPG_EmitSetNewPriceEventWhenOwnerSetNewPrice() public {
        uint256 newPrice = 2 * 10 ** 6;
        vm.expectEmit(true, false, false, false);
        emit ClubCPG__SetNewPrice(newPrice);

        vm.prank(msg.sender);
        clubCPG.setPrice(newPrice);
    }

    // ================================================================
    // │                      SUPPLY OPERATIONS                       │
    // ================================================================

    function testFail_ClubCPG_GetCurrentMaxSupply() public view {
        uint256 maxSupply = clubCPG.getCurrentMaxSupply();
        assert(maxSupply == _maxSupply + 1);
    }

    function test_ClubCPG_GetCurrentMaxSupply() public view {
        uint256 maxSupply = clubCPG.getCurrentMaxSupply();
        assert(maxSupply == _maxSupply);
    }

    function test_ClubCPG_RevertWhenNotOwnerTryToSetNewMaxSupply() public {
        uint256 newMaxSupply = 400;
        vm.prank(USER);
        vm.expectRevert(
            abi.encodeWithSelector(
                Ownable.OwnableUnauthorizedAccount.selector,
                USER
            )
        );
        clubCPG.setMaxSupply(newMaxSupply);
    }

    function test_ClubCPG_RevertWhenOwnerTryToSetNewMaxSupplyBelowCurrentTokenSupply()
        public
    {
        uint8 amountMinted = 2;
        vm.startPrank(USER);
        usdcPolygonAddress.approve(address(clubCPG), usdcBalance);
        clubCPG.mint(USER, amountMinted);
        vm.stopPrank();

        vm.prank(msg.sender);
        vm.expectRevert(
            ClubCPG
                .ClubCPG__CannotSetMaxSupplyBelowCurrentNumberOfNftMinted
                .selector
        );
        clubCPG.setMaxSupply(uint256(amountMinted - 1));
    }

    function test_ClubCPG_RevertWhenOwnerTryToSetNewMaxSupplyToSameMaxSupply()
        public
    {
        vm.prank(msg.sender);
        vm.expectRevert(
            ClubCPG.ClubCPG__CannotSetMaxSupplyToSameAmount.selector
        );
        clubCPG.setMaxSupply(_maxSupply);
    }

    function test_ClubCPG_OwnerSetNewMaxSupply() public {
        uint256 maxSupply = clubCPG.getCurrentMaxSupply();
        uint256 newMaxSupply = 400;
        vm.prank(msg.sender);
        clubCPG.setMaxSupply(newMaxSupply);
        uint256 newMaxSupplyFromContract = clubCPG.getCurrentMaxSupply();
        assert(maxSupply != newMaxSupplyFromContract);
        assert(newMaxSupply == newMaxSupplyFromContract);
    }

    function test_ClubCPG_EmitSetNewMaxSupplyEventWhenOwnerSetNewMaxSupply()
        public
    {
        uint256 newMaxSupply = 400;
        vm.expectEmit(true, false, false, false);
        emit ClubCPG__SetNewMaxSupply(newMaxSupply);

        vm.prank(msg.sender);
        clubCPG.setMaxSupply(newMaxSupply);
    }

    // ================================================================
    // │                      MINT OPERATIONS                         │
    // ================================================================

    function test_ClubCPG_RevertWhenUserTryToMintTo0Address() public {
        vm.prank(USER);
        vm.expectRevert(ClubCPG.ClubCPG__ShouldBeAValidAddress.selector);
        clubCPG.mint(ZERO_ADDRESS, 1);
    }

    function test_ClubCPG_RevertWhenUserTryToMintToDeadAddress() public {
        vm.prank(USER);
        vm.expectRevert(ClubCPG.ClubCPG__ShouldBeAValidAddress.selector);
        clubCPG.mint(DEAD_ADDRESS, 1);
    }

    function test_ClubCPG_RevertWhenUserTryToMint0Quantity() public {
        vm.prank(USER);
        vm.expectRevert(ClubCPG.ClubCPG__ShouldBeAValidQuantity.selector);
        clubCPG.mint(USER, 0);
    }

    function test_ClubCPG_RevertWhenUserTryToMintAndExceedMaxSupply() public {
        vm.prank(msg.sender);
        clubCPG.setMaxSupply(2);
        vm.prank(USER);
        vm.expectRevert(
            ClubCPG.ClubCPG__MaxSupplyReachedOrTooMuchNftsAsked.selector
        );
        clubCPG.mint(USER, 3);
    }

    function test_ClubCPG_RevertWhenUserTryToMintToHisAddressAndReachedMaxWalletNft()
        public
    {
        vm.prank(USER);
        vm.expectRevert(
            ClubCPG.ClubCPG__MaxNftMintedReachedForReceiptAddress.selector
        );
        clubCPG.mint(USER, _maxWallet + 1);
    }

    function test_ClubCPG_RevertWhenUserTryToMintbutNotEnoughAllowance()
        public
    {
        vm.prank(USER);
        vm.expectRevert(ClubCPG.ClubCPG__NotEnoughUSDCAllowed.selector);
        clubCPG.mint(USER, 1);
    }

    function test_ClubCPG_RevertWhenUserTryToMintbutNotEnoughBalance() public {
        vm.startPrank(USER);
        usdcPolygonAddress.approve(address(clubCPG), usdcBalance);
        usdcPolygonAddress.transfer(address(1), usdcBalance);
        vm.expectRevert(ClubCPG.ClubCPG__NotEnoughUSDCInBalance.selector);
        clubCPG.mint(USER, 1);
        vm.stopPrank();
    }

    function test_ClubCPG_UserMint() public {
        vm.startPrank(USER);
        usdcPolygonAddress.approve(address(clubCPG), usdcBalance);
        clubCPG.mint(USER, 1);
        vm.stopPrank();
    }

    function test_ClubCPG_EmitMintEventWhenUserMint() public {
        vm.startPrank(USER);
        usdcPolygonAddress.approve(address(clubCPG), usdcBalance);
        vm.expectEmit(true, true, true, true);
        emit ClubCPG__Mint(USER, USER, _price, 1, 1);
        clubCPG.mint(USER, 1);
        vm.stopPrank();
    }

    function test_ClubCPG_UserMintAndUpdateAddressToNumberOfTokenReceivedFromMintMapping()
        public
    {
        vm.startPrank(USER);
        usdcPolygonAddress.approve(address(clubCPG), usdcBalance);
        clubCPG.mint(USER, 1);

        uint8 receiptTokenCount = clubCPG
            .s_addressToNumberOfTokenReceivedFromMint(USER);
        vm.stopPrank();
        assert(receiptTokenCount == 1);
    }

    function test_ClubCPG_RevertWhenNotOwnerTryToMintPartnership() public {
        uint8 quantity = 2;
        vm.prank(USER);
        vm.expectRevert(
            abi.encodeWithSelector(
                Ownable.OwnableUnauthorizedAccount.selector,
                USER
            )
        );
        clubCPG.mintPartnership(quantity);
    }

    function test_ClubCPG_RevertWhenOwnerTryToMintPartnershipAndMaxTokenExceedMaxSupply() public {
        vm.prank(msg.sender);
        clubCPG.setMaxSupply(2);
        uint8 quantity = 3;
        vm.prank(msg.sender);
        vm.expectRevert(ClubCPG.ClubCPG__MaxSupplyReachedOrTooMuchNftsAsked.selector);
        clubCPG.mintPartnership(quantity);
    }

    function test_ClubCPG_RevertWhenOwnerTryToMintPartnershipAndMaxTokenExceedMaxPartnership() public {
        uint8 quantity = 6;
        vm.prank(msg.sender);
        vm.expectRevert(ClubCPG.ClubCPG__MaxPartnershipMintReachedOrTooMuchNftsAsked.selector);
        clubCPG.mintPartnership(quantity);
    }


    function test_ClubCPG_RevertWhenOwnerTryToMintPartnershipAndMaxTokenExceedMaxPartnershipIn2Tx() public {
        uint8 quantity = 3;
        vm.prank(msg.sender);
        clubCPG.mintPartnership(quantity);
        vm.prank(msg.sender);
        vm.expectRevert(ClubCPG.ClubCPG__MaxPartnershipMintReachedOrTooMuchNftsAsked.selector);
        clubCPG.mintPartnership(quantity);
    }

    function test_ClubCPG_EmitMintEventWhenOwnerMintPartnership() public {
        uint8 quantity = 5;
        
        vm.expectEmit(true, true, true, true);
        emit ClubCPG__Mint(msg.sender, PARTNERSHIP_ADDRESS, 0, quantity, 5);

        vm.prank(msg.sender);
        clubCPG.mintPartnership(quantity);
    }

    function test_ClubCPG_OwnerMintPartnership() public {
        uint8 quantity = 5;
        vm.prank(msg.sender);
        clubCPG.mintPartnership(quantity);
        uint256 balance = clubCPG.balanceOf(PARTNERSHIP_ADDRESS);
        assert(balance == quantity);
    }

    function test_ClubCPG_PartnershipAddressMintDispatchToken() public {
        uint8 quantity = 5;
        vm.prank(msg.sender);
        clubCPG.mintPartnership(quantity);
        vm.startPrank(PARTNERSHIP_ADDRESS);
        clubCPG.transferFrom(PARTNERSHIP_ADDRESS, USER, 0);
        clubCPG.transferFrom(PARTNERSHIP_ADDRESS, USER, 1);
        clubCPG.transferFrom(PARTNERSHIP_ADDRESS, USER, 2);
        clubCPG.transferFrom(PARTNERSHIP_ADDRESS, USER, 3);
        clubCPG.transferFrom(PARTNERSHIP_ADDRESS, USER2, 4);
        vm.stopPrank();
        uint256 partnershipAddressBalance = clubCPG.balanceOf(PARTNERSHIP_ADDRESS);
        uint256 UserBalance = clubCPG.balanceOf(USER);
        uint256 User2Balance = clubCPG.balanceOf(USER2);

        assert(partnershipAddressBalance == 0);
        assert(UserBalance == 4);
        assert(User2Balance == 1);
    }

    // ================================================================
    // │                     TRANSFER OPERATIONS                      │
    // ================================================================

    function test_ClubCPG_RevertWhenTransferTokenButReceiptAddressAlreadyHaveMaxToken()
        public
    {
        vm.startPrank(USER);
        usdcPolygonAddress.approve(address(clubCPG), usdcBalance);
        clubCPG.mint(USER, _maxWallet);
        vm.stopPrank();
        vm.startPrank(USER2);
        usdcPolygonAddress.approve(address(clubCPG), usdcBalance);
        clubCPG.mint(USER2, 1);
        vm.expectRevert(ClubCPG.ClubCPG__MaxNftReachedForReceiptAddress.selector);
        // As USER2 mint 1 token, _maxWallet represent the last token minted. (_startTokenId is 0)
        clubCPG.transferFrom(USER2, USER, _maxWallet);
        vm.stopPrank();
    }

    function test_ClubCPG_TransferToken() public {
        vm.startPrank(USER);
        usdcPolygonAddress.approve(address(clubCPG), usdcBalance);
        clubCPG.mint(USER, 1);
        clubCPG.transferFrom(USER, USER2, 0);
        vm.stopPrank();
        uint256 User1balance = clubCPG.balanceOf(USER);
        uint256 User2balance = clubCPG.balanceOf(USER2);
        assert(User1balance == 0);
        assert(User2balance == 1);
    }

    // ================================================================
    // │                       URI OPERATIONS                         │
    // ================================================================

    function test_ClubCPG_RevertWhenNotOwnerTryToSetNewUri() public {
        string memory newUri = "https://newuri.com/";
        vm.prank(USER);
        vm.expectRevert(
            abi.encodeWithSelector(
                Ownable.OwnableUnauthorizedAccount.selector,
                USER
            )
        );
        clubCPG.setUri(newUri);
    }

    function test_ClubCPG_RevertWhenOwnerTryToSetNewUriToSameUri() public {
        vm.prank(msg.sender);
        vm.expectRevert(ClubCPG.ClubCPG__CannotSetUriToSameUri.selector);
        clubCPG.setUri(_uri);
    }

    function test_ClubCPG_OwnerSetNewUri() public {
        vm.startPrank(USER);
        usdcPolygonAddress.approve(address(clubCPG), usdcBalance);
        clubCPG.mint(USER, 1);
        vm.stopPrank();
        string memory uri = clubCPG.tokenURI(0);
        string memory newUri = "https://newuri.com/";
        vm.prank(msg.sender);
        clubCPG.setUri(newUri);
        string memory newUriFromContract = clubCPG.tokenURI(0);
        assert(
            keccak256(abi.encodePacked(uri)) !=
                keccak256(abi.encodePacked(newUriFromContract))
        );
        assert(
            keccak256(abi.encodePacked(newUri)) ==
                keccak256(abi.encodePacked(newUriFromContract))
        );
    }

    function test_ClubCPG_EmitSetNewUriEventWhenOwnerSetNewUri() public {
        string memory newUri = "https://newuri.com/";
        vm.expectEmit(true, false, false, false);
        emit ClubCPG__SetNewUri(newUri);

        vm.prank(msg.sender);
        clubCPG.setUri(newUri);
    }

    function test_ClubCPG_RevertWhenUserTryToGetUriForNonExistentToken()
        public
    {
        vm.expectRevert(IERC721A.URIQueryForNonexistentToken.selector);
        clubCPG.tokenURI(0);
    }

    function test_ClubCPG_GetUri() public {
        vm.startPrank(USER);
        usdcPolygonAddress.approve(address(clubCPG), usdcBalance);
        clubCPG.mint(USER, 1);
        vm.stopPrank();
        string memory uri = clubCPG.tokenURI(0);
        assert(
            keccak256(abi.encodePacked(uri)) ==
                keccak256(abi.encodePacked(_uri))
        );
    }
}
