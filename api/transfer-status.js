// Vercel Function para consultar status de transferências PIX
export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only GET requests are accepted'
    });
  }

  try {
    const { transferId, environment, apiKey } = req.query;

    // Validação dos parâmetros
    if (!transferId || !environment || !apiKey) {
      return res.status(400).json({
        error: 'Missing required parameters',
        message: 'transferId, environment, and apiKey are required'
      });
    }

    // Determinar URL base
    const baseUrl = environment === 'sandbox' 
      ? process.env.ASAAS_SANDBOX_URL || 'https://sandbox.asaas.com/api/v3'
      : process.env.ASAAS_PRODUCTION_URL || 'https://www.asaas.com/api/v3';

    console.log('Consultando status:', {
      url: `${baseUrl}/transfers/${transferId}`,
      environment
    });

    // Fazer chamada para API do Asaas
    const asaasResponse = await fetch(`${baseUrl}/transfers/${transferId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'access_token': apiKey
      }
    });

    const responseData = await asaasResponse.json();

    console.log('Status da transferência:', {
      status: asaasResponse.status,
      data: responseData
    });

    // Retornar resposta do Asaas
    return res.status(asaasResponse.status).json({
      ok: asaasResponse.ok,
      status: asaasResponse.status,
      data: responseData,
      errors: responseData.errors || []
    });

  } catch (error) {
    console.error('Erro ao consultar status:', error);
    
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}