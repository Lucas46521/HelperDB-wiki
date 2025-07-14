
# Helper.db Documentation

Documentação completa para Helper.db - Um poderoso pacote auxiliar de banco de dados.

## 🚀 Deploy

Este projeto está configurado para deploy automático no Vercel através do GitHub Actions.

### Configuração do Deploy

1. **Fork/Clone este repositório**
2. **Configure os secrets no GitHub:**
   - `VERCEL_TOKEN`: Token de API do Vercel
   - `VERCEL_ORG_ID`: ID da organização no Vercel
   - `VERCEL_PROJECT_ID`: ID do projeto no Vercel

3. **Como obter os valores:**
   ```bash
   # Instale a Vercel CLI
   npm i -g vercel
   
   # Faça login
   vercel login
   
   # Link o projeto
   vercel link
   
   # Os IDs serão salvos em .vercel/project.json
   ```

4. **Push para main/master** - O deploy será automático!

## 🛠️ Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 📁 Estrutura

```
src/
├── components/          # Componentes React
├── content/docs/        # Documentação em MDX
├── lib/                 # Utilitários
└── styles/              # Estilos customizados
```

## 🎨 Tecnologias

- **Astro** + **Starlight** - Framework de documentação
- **React** - Componentes interativos
- **Tailwind CSS** - Estilização
- **MDX** - Documentação com componentes
- **Vercel** - Deploy e hospedagem

## 📝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request
