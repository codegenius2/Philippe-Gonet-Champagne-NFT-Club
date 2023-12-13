// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import "erc721a/contracts/extensions/ERC721AQueryable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";

//           JJJJJJJJJJJWWWWWWWW                           WWWWWWWW       CCCCCCCCCCCCC
//           J:::::::::JW::::::W                           W::::::W    CCC::::::::::::C
//           J:::::::::JW::::::W                           W::::::W   CC:::::::::::::::C
//           JJ:::::::JJW::::::W                           W::::::W  C:::::CCCCCCCC::::C
//             J:::::J   W:::::W           WWWWW           W:::::W  C:::::C       CCCCCC   ooooooooooo   rrrrr   rrrrrrrrr   ppppp   ppppppppp
//             J:::::J    W:::::W         W:::::W         W:::::W  C:::::C               oo:::::::::::oo r::::rrr:::::::::r  p::::ppp:::::::::p
//             J:::::J     W:::::W       W:::::::W       W:::::W   C:::::C              o:::::::::::::::or:::::::::::::::::r p:::::::::::::::::p
//             J:::::j      W:::::W     W:::::::::W     W:::::W    C:::::C              o:::::ooooo:::::orr::::::rrrrr::::::rpp::::::ppppp::::::p
//             J:::::J       W:::::W   W:::::W:::::W   W:::::W     C:::::C              o::::o     o::::o r:::::r     r:::::r p:::::p     p:::::p
// JJJJJJJ     J:::::J        W:::::W W:::::W W:::::W W:::::W      C:::::C              o::::o     o::::o r:::::r     rrrrrrr p:::::p     p:::::p
// J:::::J     J:::::J         W:::::W:::::W   W:::::W:::::W       C:::::C              o::::o     o::::o r:::::r             p:::::p     p:::::p
// J::::::J   J::::::J          W:::::::::W     W:::::::::W         C:::::C       CCCCCCo::::o     o::::o r:::::r             p:::::p    p::::::p
// J:::::::JJJ:::::::J           W:::::::W       W:::::::W           C:::::CCCCCCCC::::Co:::::ooooo:::::o r:::::r             p:::::ppppp:::::::p
//  JJ:::::::::::::JJ             W:::::W         W:::::W             CC:::::::::::::::Co:::::::::::::::o r:::::r             p::::::::::::::::p
//    JJ:::::::::JJ                W:::W           W:::W                CCC::::::::::::C oo:::::::::::oo  r:::::r             p::::::::::::::pp
//                                                                         CCCCCCCCCCCCC   ooooooooooo    rrrrrrr             p::::::pppppppp
//                                                                                                                            p:::::p
//                                                                                                                            p:::::p
//                                                                                                                           p:::::::p
//                                                                                                                           p:::::::p
//                                                                                                                           p:::::::p
//                                                                                                                           ppppppppp

/// @author JWMatheo - JW Corp - https://jwcorp.io

/// @title Membership NFT of Champagne Philippe Gonet Club
/// @notice You can use this contract to mint membership NFT and join the Champagne Philippe Gonet Club. https://www.champagne-philippe-gonet.com/homepage/
/// @dev ERC721A USDC mint based contract
/// @custom:thanks Thanks to our partner Metalyde
contract ClubCPG is ERC721AQueryable, Ownable, ReentrancyGuard {
    // ================================================================
    // │                         IMMUTABLE                            │
    // ================================================================

    // USDC address on contract deployed chain
    IERC20 private immutable i_usdcAddress;

    // ================================================================
    // │                          STORAGE                             │
    // ================================================================

    // Maximum supply
    uint256 private s_maxSupply;

    // Price in USDC. 6 decimals
    uint256 private s_price;

    // URI to metadata
    string private s_uri;

    // Maximum NFT held per wallet. Also maximum amount mint per wallet.
    uint8 private s_maxWallet;

    // Maximum NFT mint for partner
    uint8 private s_mintPartnershipCount;

    // ================================================================
    // │                          CONSTANT                            │
    // ================================================================

    // Maximum NFT amount dedicated to partnership
    uint8 private constant MAX_PARTNERSHIP_MINT = 5; // Should be replaced

    // Wallet to receive NFTs mint for partnership
    address private constant PARTNERSHIP_ADDRESS = address(0); // Should be replaced

    // Wallet to receive USDC from mint function
    address private constant RECEIPT_ADDRESS = address(1); // Should be replaced

    // ================================================================
    // │                          MAPPING                             │
    // ================================================================

    // Store the number of Nft received from the mint function an given address
    mapping(address => uint8) private s_addressToNumberOfTokenReceivedFromMint;

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
    // │                           ERROR                              │
    // ================================================================

    // Triggered when trying to mint to 0 or dead addresses.
    error ClubCPG__ShouldBeAValidAddress();

    // Triggered when trying to mint for 0 quantity
    error ClubCPG__ShouldBeAValidQuantity();

    // Triggered when trying to mint and max supply is reached or will be reached if the quantity of NFT asked is minted
    error ClubCPG__MaxSupplyReachedOrTooMuchNftsAsked();

    // Triggered when trying to mint and cannot multiply quantity asked by price
    error ClubCPG__CannotComputeTotalPrice();

    // Triggered when trying to mint but msg.sender doesn't approve enough USDC
    error ClubCPG__NotEnoughUSDCAllowed();

    // Triggered when trying to mint but msg.sender doesn't have enough USDC
    error ClubCPG__NotEnoughUSDCInBalance();

    // Triggered when trying to mint but cannot transfer user's USDC to the contract
    error ClubCPG__CannotTransferUsdcToContract();

    // Triggered when trying to mint but cannot transfer contract's USDC to the USDC receipt address
    error ClubCPG__CannotTransferUsdcToReceiptAddress();

    // Triggered when trying to mint but the `_to` address already received `s_maxWallet` number of NFTs from the mint function
    error ClubCPG__MaxNftMintedReachedForReceiptAddress();

    // Triggered when trying to mint but the `to` address already own `s_maxWallet` number of NFTs
    error ClubCPG__MaxNftReachedForReceiptAddress();

    // Triggered when trying to mint from the partnership function and max supply is reached or will be reached if the quantity of NFT asked is minted
    error ClubCPG__MaxPartnershipMintReachedOrTooMuchNftsAsked();

    // Triggered when trying to set a new supply below the current number of nft already minted
    error ClubCPG__CannotSetMaxSupplyBelowCurrentNumberOfNftMinted();

    // Triggered when trying to set a new maximum supply to the current maximum supply value
    error ClubCPG__CannotSetMaxSupplyToSameAmount();

    // Triggered when trying to set a new URI to the current URI value
    error ClubCPG__CannotSetUriToSameUri();

    // Triggered when trying to set a new price to the current price value
    error ClubCPG__CannotSetPriceToSamePrice();

    // ================================================================
    // │                        CONSTRUCTOR                           │
    // ================================================================

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _uri,
        uint8 _maxWallet,
        uint256 _maxSupply,
        uint256 _price,
        address _usdcAddress
    ) ERC721A(_name, _symbol) Ownable(msg.sender) {
        s_uri = _uri;
        i_usdcAddress = IERC20(_usdcAddress);
        s_maxSupply = _maxSupply;
        s_price = _price;
        s_maxWallet = _maxWallet;
    }

    // ================================================================
    // │                      PRICE OPERATIONS                        │
    // ================================================================

    /**
     * @notice Get the current price to buy one nft
     * @dev Return the current price to buy one nft
     * @return s_price
     */
    function getCurrentPrice() external view returns (uint256) {
        return s_price;
    }

    /**
     * @notice Set the current price to buy one nft
     * @dev Set the current price to buy one nft. Only the current `owner` can call this function
     * @param _newPrice The new price in USDC. USDC have 6 decimals
     * @custom:revert Please refer to the corresponding custom error documentation
     */
    function setPrice(uint256 _newPrice) external onlyOwner {
        if (_newPrice == s_price) revert ClubCPG__CannotSetPriceToSamePrice();
        s_price = _newPrice;

        emit ClubCPG__SetNewPrice(_newPrice);
    }

    // ================================================================
    // │                      SUPPLY OPERATIONS                       │
    // ================================================================

    /**
     * @notice Get the maximum number of membership NFT
     * @dev Return the maximum supply of the collection
     * @return s_maxSupply
     */
    function getCurrentMaxSupply() external view returns (uint256) {
        return s_maxSupply;
    }

    /**
     * @notice Set the maximum number of membership NFT
     * @dev Set the maximum supply of the collection. Only the current `owner` can call this function
     * @param _newMaxSupply The new maximum supply of the NFT collection.
     * @custom:revert Please refer to the corresponding custom error documentation
     */
    function setMaxSupply(uint256 _newMaxSupply) external onlyOwner {
        if (_newMaxSupply < _totalMinted())
            revert ClubCPG__CannotSetMaxSupplyBelowCurrentNumberOfNftMinted();
        if (_newMaxSupply == s_maxSupply)
            revert ClubCPG__CannotSetMaxSupplyToSameAmount();
        s_maxSupply = _newMaxSupply;

        emit ClubCPG__SetNewMaxSupply(_newMaxSupply);
    }

    // ================================================================
    // │                      MINT OPERATIONS                         │
    // ================================================================

    /**
     * @notice Allow you to mint the membership NFT
     * @dev Mint and transfer token to the `_to` address.
     * Implement the nonReetrant modifier form OZ to avoid reentrancy attack
     * Transfer usdc to the receipt address `RECEIPT_ADDRESS`
     * @param _to The address that will receive the NFT
     * @param _quantity The number of NFT that will be mint
     * @custom:revert Please refer to the corresponding custom error documentation
     */
    function mint(address _to, uint8 _quantity) external nonReentrant {
        if (_to == address(0)) revert ClubCPG__ShouldBeAValidAddress();
        if (_to == address(0x000000000000000000000000000000000000dEaD))
            revert ClubCPG__ShouldBeAValidAddress();
        if (_quantity == 0) revert ClubCPG__ShouldBeAValidQuantity();
        if (_quantity + _totalMinted() > s_maxSupply)
            revert ClubCPG__MaxSupplyReachedOrTooMuchNftsAsked();
        if (
            _quantity + s_addressToNumberOfTokenReceivedFromMint[_to] >
            s_maxWallet
        ) revert ClubCPG__MaxNftMintedReachedForReceiptAddress();
        // if (_quantity + balanceOf(_to) > s_maxWallet)
        //     revert ClubCPG__MaxNftReachedForReceiptAddress();
        (bool status, uint256 totalPrice) = Math.tryMul(s_price, _quantity);
        if (status == false) revert ClubCPG__CannotComputeTotalPrice();
        if (i_usdcAddress.allowance(msg.sender, address(this)) < totalPrice)
            revert ClubCPG__NotEnoughUSDCAllowed();
        if (i_usdcAddress.balanceOf(msg.sender) < totalPrice)
            revert ClubCPG__NotEnoughUSDCInBalance();

        s_addressToNumberOfTokenReceivedFromMint[_to] += _quantity;

        bool success = i_usdcAddress.transferFrom(
            msg.sender,
            address(this),
            totalPrice
        );
        if (success) revert ClubCPG__CannotTransferUsdcToContract();

        bool success2 = i_usdcAddress.transfer(RECEIPT_ADDRESS, totalPrice);
        if (success2) revert ClubCPG__CannotTransferUsdcToReceiptAddress();
        _mint(_to, _quantity);

        emit ClubCPG__Mint(
            msg.sender,
            _to,
            totalPrice,
            _quantity,
            _totalMinted()
        );
    }

    /**
     * @notice Allow the owner of the contract to mint the membership NFT dedicated to the partner
     * @dev Mint NFT for partnership. Only the current `owner` can call this function
     * @param _quantity The number of NFT that will be mint
     * @custom:revert Please refer to the corresponding custom error documentation
     */
    function mintPartnership(uint8 _quantity) external onlyOwner {
        if (_quantity + _totalMinted() > s_maxSupply)
            revert ClubCPG__MaxSupplyReachedOrTooMuchNftsAsked();
        if (s_mintPartnershipCount + _quantity > MAX_PARTNERSHIP_MINT)
            revert ClubCPG__MaxPartnershipMintReachedOrTooMuchNftsAsked();
        unchecked {
            s_mintPartnershipCount += _quantity;
        }
        _mint(PARTNERSHIP_ADDRESS, _quantity);

        emit ClubCPG__Mint(
            msg.sender,
            PARTNERSHIP_ADDRESS,
            0,
            _quantity,
            _totalMinted()
        );
    }

    // ================================================================
    // │                     TRANSFER OPERATIONS                      │
    // ================================================================

    /**
     * @dev Overrinding the ERC721A _beforeTokenTransfers function. Add a check
     * @custom:revert Please refer to the corresponding custom error documentation
     * @inheritdoc ERC721A
     */
    function _beforeTokenTransfers(
        address from,
        address to,
        uint256 startTokenId,
        uint256 quantity
    ) internal override {
        if (quantity + balanceOf(to) > s_maxWallet)
            revert ClubCPG__MaxNftReachedForReceiptAddress();
    }

    // ================================================================
    // │                       URI OPERATIONS                         │
    // ================================================================

    /**
     * @notice Allow the owner of the contract to set the metadata for the membership NFT
     * @dev Set URI of the NFT. Only the current `owner` can call this function
     * @param _newUri The new URI that point to the metadata
     * @custom:revert Please refer to the corresponding custom error documentation
     */
    function setUri(string memory _newUri) external onlyOwner {
        if (
            keccak256(abi.encodePacked(_newUri)) ==
            keccak256(abi.encodePacked(s_uri))
        ) revert ClubCPG__CannotSetUriToSameUri();
        s_uri = _newUri;

        emit ClubCPG__SetNewUri(_newUri);
    }

    /**
     * @notice Get the Metadata for a give NFT
     * @dev Returns the Uniform Resource Identifier (URI) for `tokenId` token.
     * @param tokenId The NFT Id to check metadata
     * @return s_uri
     * @custom:revert Please refer to the corresponding custom error documentation
     */
    function tokenURI(
        uint256 tokenId
    ) public view virtual override(ERC721A, IERC721A) returns (string memory) {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();

        return string(abi.encodePacked(s_uri));
    }
}
