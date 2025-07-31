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

    // Validar se API Key não está vazia
    if (!apiKey.trim()) {
      return res.status(400).json({
        error: 'Invalid API Key',
        message: 'API Key não pode estar vazia'
      });
    }

    // Determinar URL base
    const baseUrl = environment === 'sandbox' 
      ? process.env.ASAAS_SANDBOX_URL || 'https://sandbox.asaas.com/api/v3'
      : process.env.ASAAS_PRODUCTION_URL || 'https://www.asaas.com/api/v3';

    // Validar valor mínimo
    if (transferData.value < 1) {
      return res.status(400).json({
        error: 'Invalid value',
        message: 'Valor mínimo para PIX é R$ 1,00'
      });
    }

    // Formatar chave PIX se for telefone
    let formattedPixKey = transferData.pixKey;
    if (transferData.keyType === 'PHONE') {
      // Remove caracteres especiais
      const cleanPhone = transferData.pixKey.replace(/\D/g, '');
      // Adiciona +55 se não tiver
      if (!cleanPhone.startsWith('55')) {
        formattedPixKey = `+55${cleanPhone}`;
      } else {
        formattedPixKey = `+${cleanPhone}`;
      }
    }

    // Preparar dados para envio ao Asaas (formato correto da API)
    const requestBody = {
      value: transferData.value,
      pixAddressKey: formattedPixKey,
      pixAddressKeyType: transferData.keyType,
      scheduleDate: null // Campo obrigatório para transferência imediata
    };

    // Adicionar descrição se fornecida
    if (transferData.description && transferData.description.trim()) {
      requestBody.description = transferData.description.trim();
    }

    console.log('=== DEBUG VERCEL FUNCTION ===');
    console.log('Dados recebidos:', { environment, apiKey: apiKey ? 'PRESENTE' : 'AUSENTE', transferData });
    console.log('URL Asaas:', `${baseUrl}/transfers`);
    console.log('Body para Asaas:', requestBody);
    console.log('Headers:', {
      'Content-Type': 'application/json',
      'access_token': apiKey ? 'PRESENTE' : 'AUSENTE'
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

    console.log('=== RESPOSTA ASAAS ===');
    console.log('Status:', asaasResponse.status);
    console.log('OK:', asaasResponse.ok);
    console.log('Data completa:', JSON.stringify(responseData, null, 2));
    
    // Log específico dos erros
    if (responseData.errors && responseData.errors.length > 0) {
      console.log('=== ERROS DETALHADOS ===');
      responseData.errors.forEach((error, index) => {
        console.log(`Erro ${index + 1}:`, JSON.stringify(error, null, 2));
      });
    }

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
