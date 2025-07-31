# 🚀 Deploy Rápido - PIX Asaas App

## 1. Upload para GitHub

```bash
# Criar repositório no GitHub
# Fazer upload de todos os arquivos:
# - index.html
# - api/pix.js
# - api/transfer-status.js
# - vercel.json
# - package.json
# - README.md
```

## 2. Deploy no Vercel

### Opção A: Via Interface Web
1. Acesse [vercel.com](https://vercel.com)
2. Clique "New Project"
3. Conecte seu GitHub
4. Selecione o repositório
5. Clique "Deploy"

### Opção B: Via CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

## 3. Configurar Variáveis (Opcional)

No painel do Vercel → Settings → Environment Variables:

```
ASAAS_SANDBOX_URL = https://sandbox.asaas.com/api/v3
ASAAS_PRODUCTION_URL = https://www.asaas.com/api/v3
```

## 4. Testar

1. Acesse sua URL do Vercel
2. Configure uma API Key do Asaas
3. Faça um PIX de teste
4. Verifique no painel do Asaas se apareceu

## ✅ Pronto!

Seu app PIX Asaas está funcionando com API real! 🎉

---

### 🔧 Troubleshooting

**Erro 500 na API?**
- Verifique se a API Key está correta
- Confirme se está usando o ambiente certo (sandbox/produção)

**PIX não aparece no Asaas?**
- Verifique os logs da Vercel Function
- Confirme se os dados estão corretos

**Erro de CORS?**
- Não deveria acontecer com Vercel Functions
- Verifique se está acessando via HTTPS