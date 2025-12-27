import React from 'react';
import { Code, Zap, Globe, Shield, Box, Layers } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-4">About This Portal</h1>
        <p className="text-xl text-slate-400 mb-12">
          A comprehensive developer documentation and tools platform for Martian Chain
        </p>

        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">Overview</h2>
          <p className="text-slate-300 mb-4">
            This portal provides developers with everything needed to build on Martian Chain - 
            a high-performance EVM-compatible Layer 1 blockchain built on Avalanche Subnet infrastructure.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <StatCard label="Chain ID" value="2027 (0x7EB)" />
            <StatCard label="Block Time" value="2 seconds" />
            <StatCard label="Native Token" value="EROL" />
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Key Features</h2>
          
          <div className="space-y-4">
            <FeatureCard
              icon={Code}
              title="Comprehensive Documentation"
              items={[
                "Quick start guide for deploying your first smart contract",
                "One-click MetaMask setup and manual configuration",
                "RPC & WebSocket endpoint documentation",
                "Ready-to-use code examples (ethers.js, viem, curl)",
                "Event listening and transaction sending guides"
              ]}
            />

            <FeatureCard
              icon={Zap}
              title="Developer Tools"
              items={[
                "RPC Health Checker with browser and server modes",
                "Real-time latency tracking and block height verification",
                "Network Registry with all chain constants",
                "Configuration export for SDK integration",
                "Auto-refresh monitoring capabilities"
              ]}
            />

            <FeatureCard
              icon={Globe}
              title="Network Information"
              items={[
                "Chain information and native token details",
                "System contract addresses",
                "RPC/WebSocket endpoints",
                "Owner addresses and identifiers",
                "Block explorer integration"
              ]}
            />

            <FeatureCard
              icon={Shield}
              title="Data Integrity"
              items={[
                "Centralized configuration management",
                "No hardcoded fallback values",
                "Clear verification status for all fields",
                "Dynamic updates without code deployment",
                "Server-side RPC validation"
              ]}
            />

            <FeatureCard
              icon={Box}
              title="Code Examples Philosophy"
              items={[
                "Clear placeholder marking (e.g., <RPC_URL>)",
                "Multiple library support (ethers.js, viem, curl)",
                "Dynamic population from configuration",
                "Proper secrets management warnings",
                "Production-ready patterns"
              ]}
            />

            <FeatureCard
              icon={Layers}
              title="Architecture Highlights"
              items={[
                "React 18 with React Query for state management",
                "Tailwind CSS + shadcn/ui components",
                "Base44 Backend-as-a-Service integration",
                "Responsive mobile-first design",
                "Server-side functions for health checks"
              ]}
            />
          </div>
        </section>

        {/* RPC Health Checker */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">RPC Health Checker Architecture</h2>
          <p className="text-slate-300 mb-4">
            The health checker provides two testing modes to address different scenarios:
          </p>
          
          <div className="space-y-4">
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">Browser Mode</h3>
              <ul className="text-slate-300 text-sm space-y-2">
                <li>• Tests if endpoints are reachable from a web browser</li>
                <li>• Identifies CORS issues and browser-specific restrictions</li>
                <li>• Useful for debugging frontend integration problems</li>
                <li>• Shows 403 errors when endpoints block browser requests</li>
              </ul>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Server Mode</h3>
              <ul className="text-slate-300 text-sm space-y-2">
                <li>• Tests endpoints from Base44 backend servers</li>
                <li>• Bypasses browser restrictions to test true infrastructure health</li>
                <li>• Provides accurate results for server-to-server connectivity</li>
                <li>• Eliminates false negatives from CORS policies</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">Tech Stack</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-orange-400 mb-3">Frontend</h3>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• React 18 - Modern UI library</li>
                <li>• React Query - Server state management</li>
                <li>• React Router - Client-side routing</li>
                <li>• Tailwind CSS - Utility-first styling</li>
                <li>• shadcn/ui - High-quality components</li>
                <li>• Lucide React - Icon system</li>
                <li>• Framer Motion - Animations</li>
              </ul>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-orange-400 mb-3">Backend Integration</h3>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• Base44 Platform - BaaS infrastructure</li>
                <li>• Entity/database management</li>
                <li>• Backend functions for RPC checks</li>
                <li>• Authentication & user management</li>
                <li>• Real-time data synchronization</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Visual Design */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">Visual Design</h2>
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
            <p className="text-slate-300 mb-4">
              Dark mode optimized for developers with gradient accents matching Martian Chain branding.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="h-16 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 mb-2"></div>
                <p className="text-sm text-slate-400">Cyan - RPC/Technical</p>
              </div>
              <div className="text-center">
                <div className="h-16 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 mb-2"></div>
                <p className="text-sm text-slate-400">Purple - Documentation</p>
              </div>
              <div className="text-center">
                <div className="h-16 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 mb-2"></div>
                <p className="text-sm text-slate-400">Orange - Actions/CTAs</p>
              </div>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">Security Considerations</h2>
          <ul className="text-slate-300 space-y-2">
            <li>• No private keys stored or transmitted</li>
            <li>• External links open in new tabs</li>
            <li>• MetaMask integration uses standard window.ethereum API</li>
            <li>• Configuration export contains only public network data</li>
            <li>• Clear warnings about secrets management in code examples</li>
          </ul>
        </section>

        {/* Built With */}
        <section className="text-center py-8 border-t border-slate-800">
          <p className="text-slate-500 text-sm mb-2">Built with Base44</p>
          <p className="text-slate-400 text-xs">
            High-performance web apps powered by React + Backend-as-a-Service
          </p>
        </section>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 text-center">
      <p className="text-slate-400 text-sm mb-1">{label}</p>
      <p className="text-white font-semibold">{value}</p>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, items }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 flex items-center justify-center flex-shrink-0">
          <Icon className="h-5 w-5 text-cyan-400" />
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <ul className="text-slate-300 text-sm space-y-2 ml-13">
        {items.map((item, i) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}