export default async function checkRpcHealth(payload) {
  const { urls } = payload;
  
  if (!urls || !Array.isArray(urls)) {
    return { error: 'urls array is required' };
  }

  const results = await Promise.all(
    urls.map(async (url) => {
      const start = Date.now();
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_blockNumber',
            params: [],
            id: 1
          }),
          signal: AbortSignal.timeout(10000)
        });
        
        const latency = Date.now() - start;
        
        if (!response.ok) {
          return {
            url,
            status: 'offline',
            latency,
            error: `HTTP ${response.status}`
          };
        }
        
        const data = await response.json();
        const blockNumber = data.result ? parseInt(data.result, 16) : null;
        
        return {
          url,
          status: 'online',
          latency,
          blockNumber
        };
      } catch (error) {
        return {
          url,
          status: 'offline',
          latency: Date.now() - start,
          error: error.message
        };
      }
    })
  );

  return { results };
}