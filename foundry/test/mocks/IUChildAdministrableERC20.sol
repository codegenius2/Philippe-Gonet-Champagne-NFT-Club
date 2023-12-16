// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

interface Interface {
    type AuthorizationState is uint8;

    event Approval(address indexed owner, address indexed spender, uint256 value);
    event AuthorizationCanceled(address indexed authorizer, bytes32 indexed nonce);
    event AuthorizationUsed(address indexed authorizer, bytes32 indexed nonce);
    event Blacklisted(address indexed account);
    event MetaTransactionExecuted(address userAddress, address payable relayerAddress, bytes functionSignature);
    event Pause();
    event RescuerChanged(address indexed newRescuer);
    event RoleAdminChanged(bytes32 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole);
    event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender);
    event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event UnBlacklisted(address indexed account);
    event Unpause();

    function APPROVE_WITH_AUTHORIZATION_TYPEHASH() external view returns (bytes32);
    function BLACKLISTER_ROLE() external view returns (bytes32);
    function CANCEL_AUTHORIZATION_TYPEHASH() external view returns (bytes32);
    function DECREASE_ALLOWANCE_WITH_AUTHORIZATION_TYPEHASH() external view returns (bytes32);
    function DEFAULT_ADMIN_ROLE() external view returns (bytes32);
    function DEPOSITOR_ROLE() external view returns (bytes32);
    function DOMAIN_SEPARATOR() external view returns (bytes32);
    function EIP712_VERSION() external view returns (string memory);
    function INCREASE_ALLOWANCE_WITH_AUTHORIZATION_TYPEHASH() external view returns (bytes32);
    function META_TRANSACTION_TYPEHASH() external view returns (bytes32);
    function PAUSER_ROLE() external view returns (bytes32);
    function PERMIT_TYPEHASH() external view returns (bytes32);
    function RESCUER_ROLE() external view returns (bytes32);
    function TRANSFER_WITH_AUTHORIZATION_TYPEHASH() external view returns (bytes32);
    function WITHDRAW_WITH_AUTHORIZATION_TYPEHASH() external view returns (bytes32);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function approveWithAuthorization(
        address owner,
        address spender,
        uint256 value,
        uint256 validAfter,
        uint256 validBefore,
        bytes32 nonce,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;
    function authorizationState(address authorizer, bytes32 nonce) external view returns (AuthorizationState);
    function balanceOf(address account) external view returns (uint256);
    function blacklist(address account) external;
    function blacklisters() external view returns (address[] memory);
    function cancelAuthorization(address authorizer, bytes32 nonce, uint8 v, bytes32 r, bytes32 s) external;
    function decimals() external view returns (uint8);
    function decreaseAllowance(address spender, uint256 subtractedValue) external returns (bool);
    function decreaseAllowanceWithAuthorization(
        address owner,
        address spender,
        uint256 decrement,
        uint256 validAfter,
        uint256 validBefore,
        bytes32 nonce,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;
    function deposit(address user, bytes memory depositData) external;
    function executeMetaTransaction(
        address userAddress,
        bytes memory functionSignature,
        bytes32 sigR,
        bytes32 sigS,
        uint8 sigV
    ) external payable returns (bytes memory);
    function getRoleAdmin(bytes32 role) external view returns (bytes32);
    function getRoleMember(bytes32 role, uint256 index) external view returns (address);
    function getRoleMemberCount(bytes32 role) external view returns (uint256);
    function grantRole(bytes32 role, address account) external;
    function hasRole(bytes32 role, address account) external view returns (bool);
    function increaseAllowance(address spender, uint256 addedValue) external returns (bool);
    function increaseAllowanceWithAuthorization(
        address owner,
        address spender,
        uint256 increment,
        uint256 validAfter,
        uint256 validBefore,
        bytes32 nonce,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;
    function initialize(string memory newName, string memory newSymbol, uint8 newDecimals, address childChainManager)
        external;
    function initialized() external view returns (bool);
    function isBlacklisted(address account) external view returns (bool);
    function name() external view returns (string memory);
    function nonces(address owner) external view returns (uint256);
    function pause() external;
    function paused() external view returns (bool);
    function pausers() external view returns (address[] memory);
    function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)
        external;
    function renounceRole(bytes32 role, address account) external;
    function rescueERC20(address tokenContract, address to, uint256 amount) external;
    function rescuers() external view returns (address[] memory);
    function revokeRole(bytes32 role, address account) external;
    function symbol() external view returns (string memory);
    function totalSupply() external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transferWithAuthorization(
        address from,
        address to,
        uint256 value,
        uint256 validAfter,
        uint256 validBefore,
        bytes32 nonce,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;
    function unBlacklist(address account) external;
    function unpause() external;
    function updateMetadata(string memory newName, string memory newSymbol) external;
    function withdraw(uint256 amount) external;
    function withdrawWithAuthorization(
        address owner,
        uint256 value,
        uint256 validAfter,
        uint256 validBefore,
        bytes32 nonce,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;
}
