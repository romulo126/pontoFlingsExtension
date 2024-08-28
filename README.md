
# Ponto Flings

**Ponto Flings** é uma extensão do Chrome projetada para facilitar o acesso e a visualização de informações relacionadas ao sistema de ponto da **Pontomais** diretamente no navegador. Com uma interface simples e intuitiva, a extensão permite que você gerencie e acompanhe o seu tempo de trabalho de forma prática e eficiente.

## Funcionalidades

- **Login Simplificado**: Realize o login na Pontomais diretamente pela extensão, mantendo seu token de autenticação seguro.
- **Visualização do Tempo de Trabalho**: Acompanhe em tempo real o tempo trabalhado, atualizado a cada segundo.
- **Controle de Ponto do Dia**: Veja o status do seu ponto para o dia, incluindo horários de entrada, saída e intervalos.
- **Interação com a API da Pontomais**: A extensão faz requisições diretamente à API da Pontomais para obter e exibir dados relevantes ao usuário.
- **Suporte a Múltiplos Sites**: Utilize a extensão em diferentes sites com suporte a `<all_urls>`, garantindo que as informações de ponto estejam sempre acessíveis.

## Como Instalar

1. Baixe o repositório ou o arquivo ZIP e extraia o conteúdo.
2. No Chrome, vá até `chrome://extensions/`.
3. Ative o "Modo do desenvolvedor" no canto superior direito.
4. Clique em "Carregar sem compactação" e selecione a pasta do projeto extraída.
5. A extensão aparecerá na sua barra de ferramentas com o ícone configurado.

## Como Usar

1. **Login**: Ao abrir a extensão pela primeira vez, você será solicitado a fazer login usando suas credenciais da Pontomais.
2. **Gerenciamento de Ponto**: Após o login, você poderá visualizar o tempo de trabalho acumulado e as marcações de ponto diretamente na interface da extensão.
3. **Atualizações em Tempo Real**: Acompanhe o tempo trabalhado em segundos, que é atualizado automaticamente.

## Requisitos

- **Navegador**: Google Chrome ou qualquer navegador baseado em Chromium.
- **Conta na Pontomais**: É necessário ter uma conta ativa na Pontomais para utilizar todas as funcionalidades da extensão.

## Estrutura do Projeto

- **popup.html**: Interface principal da extensão.
- **pontoMais/login.js**: Script responsável pelo processo de login e manipulação de tokens.
- **pontoMais/workTime.js**: Gerenciamento do tempo trabalhado, com atualização em tempo real.
- **pontoMais/ponto.js**: Controle das marcações de ponto diárias.
- **pontoMais/pointOfTheDay.js**: Exibição do ponto atual do dia.
- **rules.json**: Regras para o `declarativeNetRequest`.
- **icon.webp**: Ícone da extensão.

## Contribuições

Contribuições são bem-vindas! Se você encontrar bugs ou tiver sugestões de melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Projeto Expiração
[Projeto que expirou a extenção] (https://github.com/MaicomMR/ponto-flings/tree/main)