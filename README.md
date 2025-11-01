# Crowdfunding DApp

A decentralized crowdfunding application built with Solidity, Hardhat, Next.js, and ethers.js. This dApp allows users to create campaigns, contribute funds, add rewards, and manage withdrawals/refunds in a transparent, blockchain-based system.

## 🚀 Features

- **Campaign Management**: Create campaigns with custom goals, timelines, and metadata
- **Reward System**: Add tiered rewards to campaigns (Kickstarter-style)
- **Contributions**: Pledge ETH to campaigns with optional reward selection
- **Smart Withdrawals**: Campaign creators can withdraw funds when goals are met
- **Automatic Refunds**: Contributors can get refunds if campaigns fail
- **User Dashboard**: Track contributions, created campaigns, and eligible rewards
- **Real-time Updates**: Live progress bars, countdown timers, and status badges

## 🛠️ Tech Stack

### Smart Contracts
- **Solidity** ^0.8.20
- **Hardhat** ^2.10.0
- **OpenZeppelin** (ReentrancyGuard)

### Frontend
- **Next.js** 15.5.2 (App Router)
- **React** 19.1.0
- **TypeScript** ^5
- **Tailwind CSS** ^4.1.12
- **ethers.js** ^6.15.0
- **react-hot-toast** ^2.6.0

## 📋 Prerequisites

- **Node.js** >= 18.0.0
- **npm** or **yarn**
- **MetaMask** browser extension
- **Hardhat** (for local blockchain)

## 🏃 Running Locally

### 1. Clone the Repository

```bash
git clone <your-repo-url>
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

### 3. Start Local Blockchain

In the root directory, start Hardhat network:

```bash
npx hardhat node
```

This will:
- Start a local Ethereum node on `http://127.0.0.1:8545`
- Provide 20 test accounts with 10,000 ETH each
- Display the accounts and private keys in the terminal

Keep this terminal window open.

### 4. Deploy Smart Contract

In a **new terminal** window, deploy the contract to the local network:

```bash
npx hardhat run scripts/deploy.ts --network localhost
```

This will:
- Deploy the `Crowdfund.sol` contract
- Output the contract address
- Create/update `frontend/src/constants/deployments.localhost.json`

**Important**: Make sure the deployment file contains the contract address:
```json
{
  "Crowdfund": {
    "address": "0x...your-contract-address..."
  }
}
```

### 5. Configure MetaMask

1. Open MetaMask extension
2. Click the network dropdown (top center)
3. Select "Add Network" → "Add a network manually"
4. Enter the following:
   - **Network Name**: Hardhat Localhost
   - **RPC URL**: http://127.0.0.1:8545
   - **Chain ID**: 31337 (or 0x7A69)
   - **Currency Symbol**: ETH
   - **Block Explorer**: (leave empty)

5. Import test accounts:
   - From the Hardhat node terminal, copy private keys
   - In MetaMask: Settings → Security & Privacy → Reveal Seed Phrase (or use "Import Account")
   - Paste private keys to import test accounts

### 6. Start Frontend Development Server

In a **new terminal** window:

```bash
cd frontend
npm run dev
```

The app will be available at `http://localhost:3000`

### 7. Connect Wallet

1. Open `http://localhost:3000` in your browser
2. Click "Connect Wallet" in the top-right
3. Select your MetaMask account
4. Approve the connection

## 🧪 Testing Locally

### Testing Workflow

1. **Create a Campaign**:
   - Click "Create Campaign" in the sidebar
   - Set goal (e.g., 10 ETH)
   - Set start delay (e.g., 1 hour from now)
   - Set duration (e.g., 7 days)
   - Add metadata URI (project description or link)
   - Submit transaction

2. **Add Rewards** (as creator, before campaign starts):
   - Go to "My Campaigns"
   - Click "Add Reward" on your campaign
   - Add reward tiers (title, description, minimum contribution, quantity)
   - Save

3. **Contribute** (as different user):
   - Switch to another MetaMask account
   - Browse campaigns
   - Click on a campaign card
   - Enter contribution amount
   - Select a reward tier (if available)
   - Submit pledge

4. **Withdraw** (as creator, after campaign ends and goal met):
   - Switch back to creator account
   - View campaign details
   - Click "Withdraw Funds"

5. **Refund** (as contributor, if campaign fails):
   - View failed campaign
   - Click "Refund"

### Testing with Multiple Tabs

For comprehensive testing:
1. Open multiple browser tabs
2. Connect each tab to a different MetaMask account
3. Test creator and contributor workflows simultaneously

## 🚢 Deploying to Vercel

### Step 1: Prepare for Production

#### 1.1. Update Contract Address

For production, you need to deploy your contract to a testnet (e.g., Sepolia, Mumbai) or mainnet. Update `frontend/src/constants/deployments.localhost.json` with your production contract address, or create a new deployment file for the production network.

**Option A: Use existing localhost deployment** (for demo/testing only):
```json
{
  "Crowdfund": {
    "address": "0x...your-deployed-address..."
  }
}
```

**Option B: Create network-specific deployment file**:
Create `frontend/src/constants/deployments.sepolia.json` and update `web3.ts` to use it based on the network.

#### 1.2. Environment Variables (Optional)

Create `frontend/.env.local` if you need environment-specific config:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_NETWORK=sepolia
```

### Step 2: Build the Frontend

Test the production build locally:

```bash
cd frontend
npm run build
```

If the build succeeds, you're ready to deploy.

### Step 3: Deploy to Vercel

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
   - Set up and deploy? **Yes**
   - Which scope? (select your account)
   - Link to existing project? **No** (or Yes if updating)
   - Project name? (enter a name or press Enter)
   - Directory? `frontend` (or `.` if already in frontend)
   - Override settings? **No**

6. After deployment, Vercel will provide:
   - Preview URL
   - Production URL

#### Option B: Deploy via Vercel Dashboard

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Import Project in Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your repository

3. **Configure Project**:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build` (or leave default)
   - **Output Directory**: `.next` (or leave default)
   - **Install Command**: `npm install`

4. **Environment Variables** (if needed):
   - Add `NEXT_PUBLIC_CONTRACT_ADDRESS` (if using env vars)
   - Add any other environment variables

5. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Access your live URL

### Step 4: Post-Deployment Configuration

1. **Update Network Configuration**:
   - Ensure users can connect to the correct network (testnet/mainnet)
   - Update `web3.ts` if needed to support multiple networks

2. **Test the Live App**:
   - Connect MetaMask
   - Switch to the correct network
   - Test key features (create campaign, contribute, etc.)

3. **Share Your Portfolio**:
   - Use the Vercel-provided URL
   - Add to your portfolio/resume
   - Example: `https://crowd-funding-dapp.vercel.app`

## 📁 Project Structure

```
crowd-funding-DApp/
├── contracts/
│   └── Crowdfund.sol          # Main smart contract
├── scripts/
│   └── deploy.ts              # Deployment script
├── test/
│   └── Crowdfund.test.ts     # Contract tests
├── frontend/
│   ├── app/
│   │   ├── page.tsx          # Main page component
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   ├── src/
│   │   ├── components/
│   │   │   ├── WalletConnect.tsx
│   │   │   ├── CampaignCard.tsx
│   │   │   ├── CreateCampaignModal.tsx
│   │   │   ├── CampaignDetailModal.tsx
│   │   │   └── AddRewardModal.tsx
│   │   ├── lib/
│   │   │   └── web3.ts       # Web3 utilities
│   │   ├── constants/
│   │   │   ├── Crowdfund.json        # Contract ABI
│   │   │   └── deployments.localhost.json  # Contract address
│   │   └── types.ts          # TypeScript interfaces
│   ├── package.json
│   └── next.config.ts
├── hardhat.config.ts
└── package.json
```

## 🔧 Configuration

### Hardhat Configuration

The default Hardhat config supports local development. For testnet deployment, update `hardhat.config.ts`:

```typescript
networks: {
  sepolia: {
    url: process.env.SEPOLIA_RPC_URL,
    accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
  },
}
```

### Next.js Configuration

The frontend uses Next.js 15 with Turbopack. Configuration is in `frontend/next.config.ts`.

## 🐛 Troubleshooting

### Common Issues

1. **"Contract not available" error**:
   - Ensure Hardhat node is running
   - Verify contract is deployed
   - Check `deployments.localhost.json` has correct address

2. **MetaMask connection fails**:
   - Check network is set to localhost (Chain ID: 31337)
   - Ensure MetaMask is unlocked
   - Try refreshing the page

3. **Build errors on Vercel**:
   - Check Node.js version (should be >= 18)
   - Verify all dependencies are in `package.json`
   - Check build logs for specific errors

4. **Reward status not updating**:
   - Refresh the page after transactions
   - Check browser console for errors
   - Ensure `loadUserData()` is called after relevant transactions

## 📝 License

ISC

## 👨‍💻 Development

### Running Tests

```bash
npx hardhat test
```

### Compiling Contracts

```bash
npx hardhat compile
```

### Type Generation

TypeScript types are auto-generated by Hardhat in `typechain-types/`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or issues, please open an issue on GitHub.
