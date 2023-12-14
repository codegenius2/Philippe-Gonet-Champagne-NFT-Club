-include .env

build:; forge build

deploy-sepolia:; forge script script/DeployClubCPG.s.sol:DeployClubCPG --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY) -vvvv
deploy-mumbai:; forge script script/DeployClubCPG.s.sol:DeployClubCPG --rpc-url $(MUMBAI_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify
verify-json:; forge verify-contract --show-standard-json-input 0x159b53bc313c7901C3Cd4b952bF4776a410b495A src/ClubCPG.sol:ClubCPG