# 📁 Setup GitHub - PIX Asaas App

## Arquivos para Upload

Certifique-se de que todos estes arquivos estão no seu repositório GitHub:

### ✅ Arquivos Obrigatórios
```
📁 seu-repositorio/
├── 📄 index.html              # Interface principal
├── 📁 api/
│   ├── 📄 pix.js             # Vercel Function para PIX
│   └── 📄 transfer-status.js  # Vercel Function para status
├── 📄 vercel.json            # Configuração Vercel
├── 📄 package.json           # Dependências
├── 📄 README.md              # Documentação
├── 📄 .gitignore             # Arquivos ignorados
└── 📄 .env.example           # Exemplo de variáveis
```

### 📋 Opcional (mas recomendado)
```
├── 📄 DEPLOY.md              # Instruções de deploy
└── 📄 GITHUB_SETUP.md        # Este arquivo
```

## 🚀 Passos para GitHub

### 1. Criar Repositório
1. Acesse [github.com](https://github.com)
2. Clique "New repository"
3. Nome: `pix-asaas-app` (ou outro nome)
4. Marque "Public" ou "Private"
5. NÃO marque "Add README" (já temos um)
6. Clique "Create repository"

### 2. Upload dos Arquivos
**Opção A: Via Interface Web**
1. Na página do repositório, clique "uploading an existing file"
2. Arraste todos os arquivos listados acima
3. Commit message: "Initial commit - PIX Asaas App"
4. Clique "Commit changes"

**Opção B: Via Git CLI**
```bash
git init
git add .
git commit -m "Initial commit - PIX Asaas App"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/pix-asaas-app.git
git push -u origin main
```

### 3. Verificar Upload
Confirme que todos os arquivos estão no repositório:
- ✅ `index.html` na raiz
- ✅ Pasta `api/` com os 2 arquivos JS
- ✅ `vercel.json` na raiz
- ✅ `package.json` na raiz

## ➡️ Próximo Passo

Após o upload no GitHub, siga as instruções do arquivo `DEPLOY.md` para fazer o deploy no Vercel.

## 🔗 Links Úteis

- [GitHub](https://github.com)
- [Vercel](https://vercel.com)
- [Documentação Vercel Functions](https://vercel.com/docs/functions)
- [API Asaas](https://docs.asaas.com)