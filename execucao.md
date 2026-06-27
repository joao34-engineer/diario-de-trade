# Roteiro de Execução: Webapp Day Trade Log (WDO)

Este documento descreve o passo a passo para o desenvolvimento manual do projeto. Vamos seguir este roteiro de forma interativa pelo chat, parte por parte.

---

## 📋 Sumário dos Passos

### 🔹 Passo 1: Estruturação Semântica do HTML (`index.html`)
- **Parte 1.1:** Cabeçalho do HTML, importação de fontes externas, folha de estilo externa e script principal.
- **Parte 1.2:** Menu de navegação inferior (estilo abas de aplicativo de celular).
- **Parte 1.3:** Seção da **Aba 1: Novo Registro** (Formulário completo com campos de dados e seletores rápidos de tags).
- **Parte 1.4:** Seção da **Aba 2: Histórico** (Contêiner para listar os logs em formato de cards e botão de exclusão).
- **Parte 1.5:** Seção da **Aba 3: Estatísticas & Gráficos** (Área para renderização dos gráficos do Chart.js).
- **Parte 1.6:** Seção da **Aba 4: Configurações** (Importação e Exportação do arquivo JSON de backup).

---

### 🔹 Passo 2: Estilização do Design System & Layout (`style.css`)
- **Parte 2.1:** Configuração de variáveis globais CSS (cores escuras premium, gradientes, sombras e fontes).
- **Parte 2.2:** Reset de estilos e estilização do `body` com fundo dinâmico de trading.
- **Parte 2.3:** Estilização da navegação (abas do celular no rodapé ou no topo da tela).
- **Parte 2.4:** Estilização dos elementos do formulário (inputs de texto, seletores numéricos e botões de tags).
- **Parte 2.5:** Estilização dos cards de histórico (efeitos hover, badges de ganho/perda de pontos).
- **Parte 2.6:** Ajustes de responsividade com Media Queries para computadores (transformando o menu inferior em barra lateral/superior e exibindo o conteúdo em colunas aproveitando o espaço).

---

### 🔹 Passo 3: Comportamento das Abas e Captura de Dados (`index.js`)
- **Parte 3.1:** Lógica de navegação entre as telas (mudar a classe ativa e alternar a visualização das seções).
- **Parte 3.2:** Captura das seleções de tags dinâmicas no formulário (efeito de "botão pressionado" ao clicar nas tags).
- **Parte 3.3:** Manipulador de envio do formulário (coleta de dados e validações iniciais).

---

### 🔹 Passo 4: Persistência no LocalStorage (`index.js`)
- **Parte 4.1:** Funções auxiliares para salvar e recuperar a lista de trades do `localStorage`.
- **Parte 4.2:** Função para renderizar os cards de histórico dinamicamente a partir dos dados do `localStorage`.
- **Parte 4.3:** Lógica para excluir um registro específico e atualizar a tela.

---

### 🔹 Passo 5: Geração de Gráficos e Padrões com Chart.js (`index.js`)
- **Parte 5.1:** Importação segura do Chart.js e inicialização dos elementos de tela (`<canvas>`).
- **Parte 5.2:** Tratamento dos dados brutos (calcular taxa de acerto por região de preço e correlações).
- **Parte 5.3:** Criação do **Gráfico 1: Taxa de Acerto por Região** (Bar / Line Chart).
- **Parte 5.4:** Criação do **Gráfico 2: Combinação Vencedora** (Gráfico relacionando as tags mais lucrativas).

---

### 🔹 Passo 6: Importação e Exportação de Backup JSON (`index.js`)
- **Parte 6.1:** Função para exportar os dados do localStorage gerando um download de arquivo `.json`.
- **Parte 6.2:** Função para ler o arquivo enviado, validar o formato e carregar no `localStorage`.


---

### 🔹 Passo 7: Formulário de Contato com Validação (`index.html` & `index.js`)
- **Parte 7.1:** Criação de uma nova aba/tela de "Contato" no HTML com campos de Nome, E-mail e Mensagem, estilizada no CSS.
- **Parte 7.2:** Validação customizada no JS (impedir envio se houver campos vazios, validação de formato de e-mail usando expressões regulares e mensagens de erro amigáveis na tela).

---

### 🔹 Passo 8: Otimização de SEO Básico e Acessibilidade (`index.html`)
- **Parte 8.1:** Inclusão de Meta Tags estruturais (description, keywords, autores) e Open Graph para compartilhamento social no `<head>`.
- **Parte 8.2:** Organização da hierarquia de títulos (garantindo um `<h1>` principal) e inclusão de descrições acessíveis (`alt` e `aria-label`) nas imagens e botões.

---

## 🚀 Como vamos trabalhar:
1. No chat, eu irei te apresentar o código e a explicação detalhada do **Passo 1: Parte 1.1**.
2. Você digita ou ajusta o código manualmente no seu VS Code.
3. Você testa no navegador.
4. Quando estiver pronto, você responde:
   - *"Dúvida no ponto X..."* (para conversarmos sobre o código) ou,
   - *"Tudo certo, vamos para a próxima parte!"* (para prosseguir).

