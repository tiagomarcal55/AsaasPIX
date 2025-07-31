// Vercel Function para transferências PIX via Asaas
export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are accepted'
    });
  }

  try {
    const { environment, apiKey, transferData } = req.body;

    // Validação dos dados recebidos
    if (!environment || !apiKey || !transferData) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'environment, apiKey, and transferData are required'
      });
    }

    // Determinar URL base
    const baseUrl = environment === 'sandbox' 
      ? process.env.ASAAS_SANDBOX_URL || 'https://sandbox.asaas.com/api/v3'
      : process.env.ASAAS_PRODUCTION_URL || 'https://www.asaas.com/api/v3';

    // Preparar dados para envio ao Asaas
    const requestBody = {
      value: transferData.value,
      pixAddressKey: transferData.pixKey,
      pixAddressKeyType: transferData.keyType
    };

    // Adicionar descrição se fornecida
    if (transferData.description && transferData.description.trim()) {
      requestBody.description = transferData.description.trim();
    }

    console.log('Enviando para Asaas:', {
      url: `${baseUrl}/transfers`,
      environment,
      body: requestBody
    });

    // Fazer chamada para API do Asaas
    const asaasResponse = await fetch(`${baseUrl}/transfers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': apiKey
      },
      body: JSON.stringify(requestBody)
    });

    const responseData = await asaasResponse.json();

    console.log('Resposta Asaas:', {
      status: asaasResponse.status,
      ok: asaasResponse.ok,
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
    console.error('Erro na função Vercel:', error);
    
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
