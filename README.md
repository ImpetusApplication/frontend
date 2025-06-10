# Frontend do App Impetus 

Este repositório é destinado ao frontend da aplicação Impetus, um app focado em atividades físicas, alimentação e hábitos saudáveis. 


## Requisitos

- Node.js 18 ou superior


## Instalação

1. Clone esse repositório

   ```bash
   git clone https://github.com/ImpetusApplication/frontend
   ```

2. Instale as dependências 

   ```bash
   npm install
   ```

3. Inicie a aplicação 

   ```bash
   npm start
   ```

## Estrutura

- `app/` - Nessa pasta estão os arquivos principais do projeto;
   - `(tabs)/` - pasta destinada às telas do aplicativo;
      - `index.tsx` - arquivo da página de login;
      - `signUp.tsx` - arquivo da página de cadastro;
      - `forgotPassword.tsx` - arquivo da página para redefinição da senha;
      - `telaInicial.tsx` - arquivo da página inicial(home) do aplicativo;
- `components/` - pasta destinada aos componentes utilizados nas telas
   - `ui/` - pasta para componentes relacionados a interface de usuário;
      - `IconInput.jsx` - componente de input de texto com um icone;
      - `Post.tsx` - componente de postagem de treino no aplicativo;
