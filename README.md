# Crowdfunding DApp

A decentralized crowdfunding application built with Solidity, Hardhat, Next.js, and ethers.js. This DApp allows users to create campaigns, contribute funds, add rewards, and manage withdrawals/refunds in a transparent, blockchain-based system.

**Live Application**: [https://crowdfundiing-dapp.vercel.app/](https://crowdfundiing-dapp.vercel.app/)

**Repository**: [https://github.com/AlexKalll/crowd-funding-DApp](https://github.com/AlexKalll/crowd-funding-DApp)

## Features

### Core Functionality

- **Campaign Management**: Create campaigns with custom goals, timelines, and metadata URIs
- **Reward System**: Add tiered rewards to campaigns with minimum contribution requirements and limited quantities
- **Contributions**: Pledge ETH to campaigns with optional reward selection
- **Smart Withdrawals**: Campaign creators can withdraw funds when goals are met and campaigns have ended
- **Automatic Refunds**: Contributors can get refunds if campaigns fail to reach their goals
- **Guest Mode**: Browse campaigns and view project details without connecting a wallet
- **Sample Campaigns**: Pre-loaded sample campaigns for demonstration purposes

### User Experience

- **Wallet Integration**: Seamless MetaMask connection with automatic network detection
- **User Dashboard**: Track contributions, created campaigns, and eligible rewards
- **My Contributions**: View all campaigns you've contributed to with contribution amounts
- **My Campaigns**: Manage campaigns you've created with quick access to rewards and statistics
- **My Rewards**: Track reward eligibility, claimed status, and missed rewards
- **Real-time Updates**: Live progress bars, countdown timers, and status badges
- **Error Handling**: Comprehensive error handling with user-friendly messages for insufficient funds, transaction failures, and network issues
- **Balance Validation**: Pre-transaction balance checks to prevent failed transactions

### Technical Features

- **Multi-network Support**: Automatic contract address detection for Sepolia testnet and localhost
- **Type Safety**: Full TypeScript coverage throughout the application
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Toast Notifications**: User-friendly feedback for all transactions and errors
- **Loading States**: Smooth loading indicators throughout the application

## Tech Stack

### Smart Contracts

- Solidity 0.8.28
- Hardhat 2.10.0
- OpenZeppelin (ReentrancyGuard)

### Frontend

- Next.js 15.5.2 (App Router)
- React 19.1.0
- TypeScript 5
- Tailwind CSS 4.1.12
- ethers.js 6.15.0
- react-hot-toast 2.6.0

## Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- MetaMask browser extension
- Hardhat (for local blockchain development)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/AlexKalll/crowd-funding-DApp.git
cd crowd-funding-DApp
```

### 2. Install Dependencies

Install root dependencies (for Hardhat):

```bash
npm install
```

Install frontend dependencies:

```bash
cd frontend
npm install
cd ..
```

## Local Development

### 1. Start Local Blockchain

In the root directory, start the Hardhat network:

```bash
npx hardhat node
```

This will:
- Start a local Ethereum node on `http://127.0.0.1:8545`
- Provide 20 test accounts with 10,000 ETH each
- Display the accounts and private keys in the terminal

Keep this terminal window open.

### 2. Deploy Smart Contract

In a new terminal window, deploy the contract to the local network:

```bash
npx hardhat run scripts/deploy.ts --network localhost
```

This will:
- Deploy the `Crowdfund.sol` contract
- Output the contract address
- Create or update `frontend/src/constants/deployments.localhost.json`

Verify the deployment file contains the contract address:

```json
{
  "Crowdfund": {
    "address": "0x...your-contract-address..."
  }
}
```

### 3. Configure MetaMask

1. Open MetaMask extension
2. Click the network dropdown (top center)
3. Select "Add Network" → "Add a network manually"
4. Enter the following:
   - Network Name: Hardhat Localhost
   - RPC URL: http://127.0.0.1:8545
   - Chain ID: 31337
   - Currency Symbol: ETH
   - Block Explorer: (leave empty)

5. Import test accounts:
   - From the Hardhat node terminal, copy private keys
   - In MetaMask: Settings → Security & Privacy → Import Account
   - Paste private keys to import test accounts

### 4. Start Frontend Development Server

In a new terminal window:

```bash
cd frontend
npm run dev
```

The app will be available at `http://localhost:3000`

### 5. Connect Wallet

1. Open `http://localhost:3000` in your browser
2. Click "Connect MetaMask" in the top-right corner
3. Select your MetaMask account
4. Approve the connection

Alternatively, click "Continue as Guest" to browse campaigns without connecting a wallet.

## Testing Workflow

### 1. Create a Campaign

1. Connect your wallet
2. Click "Create Campaign" in the sidebar
3. Fill in the form:
   - Goal: e.g., 10 ETH
   - Start Time: e.g., 1 hour from now
   - End Time: e.g., 7 days from start time
   - Metadata URI: Project description or link
4. Submit the transaction

### 2. Add Rewards

1. Go to "My Campaigns" in the sidebar
2. Click on your campaign
3. Click "Add Reward" button
4. Fill in reward details:
   - Title: e.g., "Early Bird Special"
   - Description: e.g., "Get exclusive access"
   - Minimum Contribution: e.g., 0.5 ETH
   - Quantity Available: e.g., 10
5. Save the reward

Note: Rewards can only be added before the campaign starts.

### 3. Contribute to Campaigns

1. Switch to another MetaMask account (or use a different account)
2. Browse campaigns in the "Browse Campaigns" tab
3. Click on a campaign card to view details
4. Enter contribution amount
5. Select a reward tier (if available)
6. Submit the pledge

### 4. Withdraw Funds

1. Wait for campaign to end
2. Ensure campaign goal was met
3. Switch to creator account
4. View campaign details
5. Click "Withdraw Funds"

### 5. Request Refund

1. Find a campaign that failed to reach its goal
2. Ensure the campaign has ended
3. View campaign details
4. Click "Request Refund"

## Deployment

### Deploy Contract to Testnet

1. Create a `.env` file in the root directory:

```
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=your_private_key_here # the metamask account private key which have a sepolia eth 
```

2. Deploy to Sepolia:

```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

The deployment script will automatically save the contract address to `frontend/src/constants/deployments.sepolia.json`.

### Deploy Frontend to Vercel

#### Option A: Deploy via Vercel CLI

1. Install Vercel CLI:

```bash
npm install -g vercel
```

2. Login to Vercel:

```bash
vercel login
```

3. Navigate to frontend directory:

```bash
cd frontend
```

4. Deploy:

```bash
vercel
```

5. Follow the prompts:
   - Set up and deploy? Yes
   - Which scope? (select your account)
   - Link to existing project? No (or Yes if updating)
   - Project name? (enter a name or press Enter)
   - Directory? `frontend` (or `.` if already in frontend)
   - Override settings? No

#### Option B: Deploy via Vercel Dashboard

1. Push to GitHub:

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

2. Import Project in Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your repository

3. Configure Project:
   - Root Directory: `frontend`
   - Framework Preset: Next.js
   - Build Command: `npm run build` (or leave default)
   - Output Directory: `.next` (or leave default)
   - Install Command: `npm install`

4. Deploy:
   - Click "Deploy"
   - Wait for build to complete
   - Access your live URL

## Docker Deployment

### Using Docker (Optional)

Docker allows you to run the application in a container, making it easy to deploy anywhere.

#### Build Docker Image

```bash
docker build -t crowdfunding-dapp .
```

#### Run Docker Container

```bash
docker run -p 3000:3000 crowdfunding-dapp
```

The app will be available at `http://localhost:3000`

#### Using Docker Compose

For easier management:

```bash
docker-compose up
```

This will build and run the frontend container automatically.

Note: For local development, you still need to run Hardhat node separately as it's not included in the Docker setup.

## GitHub Actions CI/CD

The project includes GitHub Actions workflows that automatically:

1. **Test Smart Contracts** (`.github/workflows/ci.yml`):
   - Runs on every push and pull request
   - Compiles contracts
   - Runs test suite
   - Ensures code quality

2. **Lint and Build Frontend** (`.github/workflows/ci.yml`):
   - Runs on every push and pull request
   - Checks code style with ESLint
   - Verifies the frontend builds successfully

3. **Deploy Contract** (`.github/workflows/deploy-contract.yml`):
   - Manual workflow for deploying to Sepolia
   - Requires GitHub Secrets to be set up:
     - `SEPOLIA_RPC_URL`: Your Sepolia RPC endpoint
     - `PRIVATE_KEY`: Your deployment account private key

### Setting Up GitHub Secrets

To use the deployment workflow:

1. Go to your GitHub repository
2. Click Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add:
   - Name: `SEPOLIA_RPC_URL`, Value: Your Sepolia RPC URL
   - Name: `PRIVATE_KEY`, Value: Your private key (with Sepolia ETH)

5. Go to Actions tab → Deploy Contract to Sepolia → Run workflow

## Project Structure

```
crowd-funding-DApp/
├── contracts/
│   └── Crowdfund.sol              # Main smart contract
├── scripts/
│   └── deploy.ts                   # Deployment script
├── test/
│   └── Crowdfund.test.ts          # Contract tests
├── frontend/
│   ├── app/
│   │   ├── page.tsx               # Main page component
│   │   ├── layout.tsx             # Root layout
│   │   └── globals.css            # Global styles
│   ├── src/
│   │   ├── components/
│   │   │   ├── WalletConnect.tsx
│   │   │   ├── CampaignCard.tsx
│   │   │   ├── CreateCampaignModal.tsx
│   │   │   ├── CampaignDetailModal.tsx
│   │   │   └── AddRewardModal.tsx
│   │   ├── lib/
│   │   │   └── web3.ts            # Web3 utilities
│   │   ├── utils/
│   │   │   ├── errorHandler.ts    # Error handling utilities
│   │   │   └── userMapping.ts     # User name mapping
│   │   ├── constants/
│   │   │   ├── Crowdfund.json     # Contract ABI
│   │   │   ├── deployments.localhost.json
│   │   │   ├── deployments.sepolia.json
│   │   │   └── sampleCampaigns.ts
│   │   └── types.ts               # TypeScript interfaces
│   ├── package.json
│   └── next.config.ts
├── .github/
│   └── workflows/
│       ├── ci.yml                 # CI workflow
│       └── deploy-contract.yml    # Deployment workflow
├── hardhat.config.ts
├── Dockerfile                     # Docker configuration
├── docker-compose.yml            # Docker Compose configuration
├── package.json
└── README.md
```

## Configuration

### Hardhat Configuration

The `hardhat.config.ts` supports multiple networks:

- `localhost`: Local development network (Chain ID: 31337)
- `sepolia`: Sepolia testnet (Chain ID: 11155111)
- `mumbai`: Polygon Mumbai testnet (Chain ID: 80001)

To configure testnet deployment, create a `.env` file with:

```
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
MUMBAI_RPC_URL=https://polygon-mumbai.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=your_private_key_here
```

### Network Detection

The frontend automatically detects the connected network and uses the appropriate contract address:

- Sepolia testnet: Uses `deployments.sepolia.json`
- Localhost/Hardhat: Uses `deployments.localhost.json`

## Error Handling

The application includes comprehensive error handling for common blockchain transaction errors:

- **Insufficient Funds**: Detailed messages showing required amount, current balance, and shortfall
- **Transaction Rejection**: Clear notification when user rejects transaction
- **Network Errors**: Helpful messages for connection issues
- **Gas Estimation Failures**: Pre-flight checks to catch errors before submission
- **Contract Reverts**: User-friendly messages for campaign-specific errors (inactive, not creator, etc.)

All errors are displayed with actionable feedback and extended toast durations for better readability.

## Scripts

### Smart Contract Development

```bash
# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to localhost
npx hardhat run scripts/deploy.ts --network localhost

# Deploy to Sepolia
npx hardhat run scripts/deploy.ts --network sepolia
```

### Frontend Development

```bash
# Start development server
cd frontend
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Troubleshooting

### Common Issues

**"Contract not available" error**
- Ensure Hardhat node is running
- Verify contract is deployed
- Check deployment JSON file has correct address
- Ensure you're connected to the correct network in MetaMask

**MetaMask connection fails**
- Check network is set to localhost (Chain ID: 31337) for local development
- Ensure MetaMask is unlocked
- Try refreshing the page
- Check browser console for errors

**Insufficient funds error**
- Verify you have enough ETH in your wallet
- Remember you need ETH for both the transaction amount and gas fees
- For testnets, use a faucet to get test ETH

**Build errors on Vercel**
- Check Node.js version (should be >= 18)
- Verify all dependencies are in `package.json`
- Check build logs for specific errors
- Ensure TypeScript/ESLint errors are resolved before pushing

**Transaction fails silently**
- Check browser console for error messages
- Verify network connection
- Ensure contract address is correct for the network
- Check MetaMask transaction history

**Reward status not updating**
- Refresh the page after transactions
- Check browser console for errors
- Ensure network connection is stable
- Verify the transaction was confirmed on the blockchain

**Docker build fails**
- Ensure Docker is installed and running
- Check that Node.js version in Dockerfile matches your local version
- Verify all dependencies are correctly listed in package.json
- Check Docker logs for specific error messages

**GitHub Actions fails**
- Ensure all tests pass locally first
- Check that your code follows linting rules
- Verify all dependencies are in package.json
- Check Actions tab for detailed error logs

## License

ISC

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

## Support

For questions, issues, or feature requests, please open an issue on [GitHub](https://github.com/AlexKalll/crowd-funding-DApp/issues).
