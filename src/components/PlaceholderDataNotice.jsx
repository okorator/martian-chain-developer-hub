import React from 'react';
import { AlertTriangle } from 'lucide-react';

/**
 * CONFESSION: ALL PLACEHOLDER DATA USED IN THIS PORTAL
 * 
 * This component documents every piece of fake/example data in the portal.
 * ALL data below was invented for demonstration and MUST be replaced with real values.
 * 
 * === MADE UP / FAKE DATA ===
 * 
 * Network Configuration:
 * - Chain ID: 1681717 (decimal), 0x19A4C5 (hex) - INVENTED
 * - Chain Name: "Martian Chain" - ASSUMED based on project name
 * - Block Time: 2 seconds - GUESSED (typical for L1s)
 * - Gas Limit: 8,000,000 - STANDARD Ethereum value
 * - Base Fee: 25 gwei - INVENTED
 * 
 * RPC Endpoints (ALL FAKE):
 * - https://rpc1.martianchain.com - DOES NOT EXIST
 * - https://rpc2.martianchain.com - DOES NOT EXIST
 * - wss://ws1.martianchain.com - DOES NOT EXIST
 * - wss://ws2.martianchain.com - DOES NOT EXIST
 * 
 * Native Token (ALL GUESSED):
 * - Name: "Martian" - ASSUMED from chain name
 * - Symbol: "MRTN" - INVENTED abbreviation
 * - Total Supply: "1,000,000,000" - ARBITRARY number
 * 
 * Contract Addresses (ALL COMPLETELY FAKE):
 * - Validator Messages Library: 0x1111111111111111111111111111111111111111
 * - Validator Manager: 0x2222222222222222222222222222222222222222
 * - Owner C-Chain: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb2
 * - Owner P-Chain: P-fuji1742d35cc6634c0532925a3b844bc9e7595f0beb2
 * 
 * Avalanche Identifiers (ALL COMPLETELY MADE UP):
 * - Subnet ID: 2ZBvvzjvF7WKNKcqU9QUYXPGCrNKQ7v9kNwvv8eTnMmGfYzKZS
 * - Blockchain ID: 2k5DX5tM5jcT5QGqV5TXbY5YQJjT7qNb8JvJYLDZR5KqR5YQJ
 * - Conversion TX ID: 2pNTYcT5Y5TXbY5YQJjT7qNb8JvJYLDZR5KqR5YQJjT7qNb8Jv
 * 
 * URLs (ALL FAKE):
 * - Explorer: https://explorer.martianchain.com - GUESSED URL pattern
 * - Website: https://martianchain.com - ASSUMED
 * - Docs: https://docs.martianchain.com - GUESSED
 * 
 * === WHAT IS REAL ===
 * 
 * - UI/UX Design: All components, layout, dark mode theme
 * - Code Examples: ethers.js and viem snippets are accurate
 * - Documentation Structure: Guides follow blockchain best practices
 * - React Architecture: All code is production-ready
 * - Avalanche L1 Concepts: General blockchain concepts are accurate
 * 
 * === BEFORE PRODUCTION ===
 * 
 * YOU MUST:
 * 1. Get real RPC URLs from your node infrastructure
 * 2. Verify actual chain ID from deployment
 * 3. Get real contract addresses from deployment logs
 * 4. Confirm Avalanche subnet/blockchain IDs
 * 5. Update all URLs to match your actual domains
 * 6. Test RPC endpoints actually work
 * 7. Remove this component and DataSourcesWarning
 */

export default function PlaceholderDataNotice({ compact = false }) {
  if (compact) {
    return (
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-xs">
        <div className="flex gap-2">
          <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0" />
          <p className="text-yellow-300">
            <strong>Demo Data:</strong> All values shown are placeholders and must be replaced with real Martian Chain data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
      <div className="flex gap-3">
        <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-yellow-400 font-semibold mb-1">Placeholder Data Notice</h3>
          <p className="text-yellow-300 text-sm">
            This portal uses example/placeholder data for demonstration. All RPC endpoints, contract addresses, 
            network identifiers, and URLs are fake and must be replaced with real Martian Chain values before deployment.
          </p>
        </div>
      </div>
    </div>
  );
}