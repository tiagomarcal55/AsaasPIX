# PIX Asaas App

App para transferências PIX usando a API do Asaas, desenvolvido com HTML/CSS/JavaScript e Vercel Functions.

## 🚀 Deploy no Vercel

### 1. Preparar o Repositório

```bash
# Clone ou baixe os arquivos
# Faça upload para seu repositório GitHub
```

### 2. Conectar ao Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Conecte sua conta GitHub
3. Clique em "New Project"
4. Selecione seu repositório
5. Configure as variáveis de ambiente (opcional)

### 3. Configurar Variáveis de Ambiente (Opcional)

No painel do Vercel, adicione estas variáveis:

```
ASAAS_SANDBOX_URL=https://sandbox.asaas.com/api/v3
ASAAS_PRODUCTION_URL=https://www.asaas.com/api/v3
```

### 4. Deploy

O Vercel fará o deploy automaticamente. Sua URL será algo como:
```
https://seu-projeto.vercel.app
```

## 🔧 Como Funciona

### Arquitetura
```
Browser → Vercel Functions → API Asaas
```

### Arquivos Principais
- `index.html` - Interface do usuário
- `api/pix.js` - Function para transferências PIX
- `api/transfer-status.js` - Function para consultar status
- `vercel.json` - Configuração do Vercel

## 📱 Como Usar

1. **Configure sua API Key do Asaas**
   - Acesse o painel do Asaas
   - Gere uma API Key (sandbox ou produção)
   - Adicione no app em "Contas"

2. **Faça uma transferência PIX**
   - Selecione a conta
   - Digite a chave PIX (CPF, CNPJ, email, telefone ou EVP)
   - Informe o valor
   - Confirme a transferência

3. **Acompanhe no histórico**
   - Todas as transferências reais ficam registradas
   - Status atualizado conforme API do Asaas

## 🔒 Segurança

- ✅ API Keys criptografadas no browser
- ✅ Senha mestra para acesso
- ✅ Chamadas seguras via Vercel Functions
- ✅ Não expõe credenciais no frontend

## 🛠️ Desenvolvimento Local

```bash
# Instalar Vercel CLI
npm i -g vercel

# Executar localmente
vercel dev

# Acessar
http://localhost:3000
```

## 📚 API Endpoints

### POST /api/pix
Cria uma transferência PIX

```json
{
  "environment": "sandbox",
  "apiKey": "sua-api-key",
  "transferData": {
    "value": 10.50,
    "pixKey": "usuario@email.com",
    "keyType": "EMAIL",
    "description": "Pagamento teste"
  }
}
```

### GET /api/transfer-status
Consulta status de uma transferência

```
/api/transfer-status?transferId=pay_123&environment=sandbox&apiKey=sua-key
```

## 🎯 Funcionalidades

- ✅ Múltiplas contas Asaas
- ✅ Ambientes sandbox e produção
- ✅ Detecção automática de tipo de chave PIX
- ✅ Validação de CPF/CNPJ
- ✅ Formatação automática
- ✅ Histórico de transferências
- ✅ Tema claro/escuro
- ✅ Design Material 3
- ✅ Responsivo para mobile

## 📄 Licença

MIT License - Livre para uso pessoal e comercial.