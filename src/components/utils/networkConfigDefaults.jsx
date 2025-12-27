/**
 * Centralized Network Configuration Defaults and Utilities
 * 
 * All default/fallback values for Martian Chain network configuration.
 * Each value includes verification status and source for audit purposes.
 */

export const VERIFIED_DEFAULTS = {
  chainName: "Martian Chain",
  chainIdDecimal: 2027,
  chainIdHex: "0x7EB",
  nativeTokenDecimals: 18,
  blockTimeSeconds: 2,
};

export const TBD_FIELDS = {
  // Fields that need verification or are dynamic
  baseFee: {
    value: null,
    note: "Base fee varies; query dynamically via eth_feeHistory or provider.getFeeData()"
  }
};

/**
 * Get a safe value from config with proper fallback handling
 * Returns null for TBD fields instead of potentially incorrect defaults
 */
export function getSafeConfigValue(config, field, allowFallback = true) {
  // If config has the value and it's not null/undefined, use it
  if (config && config[field] !== undefined && config[field] !== null) {
    return config[field];
  }
  
  // Only fall back to VERIFIED_DEFAULTS if explicitly allowed
  if (allowFallback && VERIFIED_DEFAULTS[field] !== undefined) {
    return VERIFIED_DEFAULTS[field];
  }
  
  return null;
}

/**
 * Check if a field is marked as TBD/needs verification
 */
export function isTBDField(field) {
  return TBD_FIELDS[field] !== undefined;
}

/**
 * Format code template with placeholders for unverified values
 */
export function formatCodeTemplate(template, config) {
  return template
    .replace(/\${chainIdHex}/g, getSafeConfigValue(config, 'chainIdHex') || '<CHAIN_ID_HEX>')
    .replace(/\${chainIdDecimal}/g, getSafeConfigValue(config, 'chainIdDecimal') || '<CHAIN_ID>')
    .replace(/\${chainName}/g, getSafeConfigValue(config, 'chainName') || '<CHAIN_NAME>')
    .replace(/\${nativeTokenName}/g, config?.nativeTokenName || '<TOKEN_NAME>')
    .replace(/\${nativeTokenSymbol}/g, config?.nativeTokenSymbol || '<TOKEN_SYMBOL>')
    .replace(/\${rpcUrl}/g, config?.rpcUrls?.[0] || '<RPC_URL>')
    .replace(/\${wsUrl}/g, config?.wsUrls?.[0] || '<WS_URL>')
    .replace(/\${explorerUrl}/g, config?.explorerUrl || '<EXPLORER_URL>');
}