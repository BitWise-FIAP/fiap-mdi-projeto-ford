# 🚗 Ford VINculo

## 📌 Sobre o Projeto

O **Ford VINculo** é um aplicativo mobile desenvolvido com foco no gerenciamento e na experiência do cliente da Ford. O projeto foi criado como solução para o desafio proposto pela Ford, com o objetivo de centralizar funcionalidades importantes em um único aplicativo moderno, intuitivo e acessível.

O desafio escolhido pelo grupo teve como foco melhorar a experiência do cliente por meio de tecnologia mobile, trazendo praticidade no gerenciamento de veículos, informações, agendamentos, recompensas e suporte inteligente.

### 🎯 Objetivo do Desafio

Desenvolver uma solução mobile capaz de melhorar a interação do cliente com a Ford, oferecendo uma experiência mais moderna, organizada e eficiente.

### ❓ Por que escolhemos esse desafio?

O grupo escolheu esse desafio por acreditar que a experiência do usuário é um dos pontos mais importantes atualmente para empresas do setor automotivo. A proposta permitiu unir desenvolvimento mobile, interface moderna e integração com inteligência artificial, além de trabalhar conceitos importantes de UX/UI e arquitetura de software.

---

## ⚙️ Funcionalidades Implementadas

✅ Tela de boas-vindas
✅ Sistema de login
✅ Sistema de cadastro
✅ Modo visitante
✅ Navegação entre telas
✅ Home principal do aplicativo
✅ Cards informativos
✅ Cadastro e visualização de veículos
✅ Lista de veículos da conta e veículos de demonstração
✅ Tela de perfil do usuário
✅ Edição de dados do perfil
✅ Sistema de agendamento
✅ Histórico de serviços e agendamentos
✅ Recomendações de manutenção
✅ Pontuação e recompensas
✅ Integração com Inteligência Artificial via Groq
✅ Assistente IA para comparação de veículos
✅ Configurações de tema, notificações e localização
✅ Suporte e perguntas frequentes
✅ Interface responsiva e moderna
✅ Organização de imagens/screenshots para documentação

---

## 👨‍💻 Integrantes do Grupo

| Nome | RM |
| --- | --- |
| Enrico Ricarte Rodrigues | RM558571 |
| Pedro Gaspar Fernandes Ferrari | RM554887 |
| Victor Freire Martins Siqueira | RM556191 |

---

## ▶️ Como Rodar o Projeto

### 📋 Pré-requisitos

Antes de começar, será necessário ter instalado:

- Node.js;
- npm;
- Expo Go ou emulador Android;
- Android Studio, opcional para usar o emulador;
- uma chave da Groq, caso queira utilizar a IA.

### 📥 Clonando o Repositório

```bash
git clone URL_DO_REPOSITORIO
cd fiap-mdi-projeto-ford
```

### 📦 Instalando Dependências

```bash
npm install --legacy-peer-deps
```

### ▶️ Executando o Projeto

```bash
npx expo start
```

Depois disso:

- pressione `a` para abrir no emulador Android;
- ou escaneie o QR Code com o Expo Go;
- pressione `r` para recarregar;
- pressione `Ctrl+C` para encerrar.

### Configurando a IA

A integração atual utiliza a API da Groq para comparar veículos. Para usar localmente, crie um arquivo `.env` na raiz do projeto:

```env
EXPO_PUBLIC_GROQ_API_KEY=gsk_sua_chave_aqui
```

Não compartilhe a chave em commits, prints ou vídeos. O arquivo `.env` não deve ser versionado. Como o prefixo `EXPO_PUBLIC_` incorpora o valor ao bundle mobile, essa configuração é usada apenas para demonstração acadêmica. Em produção, a chamada deve passar por um backend que proteja a chave.

Para builds na nuvem, cadastre a variável no ambiente do EAS:

```powershell
npx eas-cli@latest env:create `
  --name EXPO_PUBLIC_GROQ_API_KEY `
  --value "SUA_CHAVE_GROQ" `
  --environment preview `
  --visibility sensitive
```

### Gerando o APK com Expo EAS Build

Primeiro, faça login:

```bash
npx eas-cli@latest login
```

Depois gere o APK de demonstração:

```bash
npx eas-cli@latest build --profile preview --platform android
```

O perfil `preview` está configurado para gerar um APK Android. Na primeira build, o EAS pode perguntar se deseja gerar um novo Android Keystore. Como este projeto não será publicado na Play Store, pode responder **yes** e deixar o EAS gerenciar as credenciais remotas.

Build de demonstração gerada:

[Build EAS do Ford VINculo](https://expo.dev/accounts/tonic123s-team/projects/ford-vinculo/builds/be450716-3622-437e-ae79-2213042355af)

---

## 🛠️ Decisões Técnicas

### 💻 Stack Utilizada

#### Front-end Mobile

- React Native;
- Expo;
- JavaScript.

#### Navegação

- Expo Router.

#### Persistência local

- AsyncStorage;
- dados separados por usuário e modo visitante.

#### Inteligência Artificial

- API Groq;
- modelo Llama para comparação de veículos;
- pontuação e recompensas integradas ao app.

### 🧱 Estrutura do Projeto

```text
app/
  (auth)/       login, cadastro e boas-vindas
  (tabs)/       Home, IA, serviços, veículo e perfil
src/
  context/      autenticação e tema
  utils/        armazenamento local por usuário
components/    componentes reutilizáveis
assets/        imagens, ícones e splash
screens/       screenshots usadas na documentação
storage/       dados de exemplo removidos do fluxo atual
```

A organização separa telas, componentes, contextos e utilitários para facilitar manutenção e escalabilidade.

### 🔗 Integrações Realizadas

- Integração com a API de Inteligência Artificial da Groq;
- navegação dinâmica entre telas;
- fluxo local de autenticação;
- persistência local por usuário;
- organização de rotas utilizando Expo Router;
- agendamento e histórico de serviços;
- gamificação por pontos e recompensas.

### 🏗️ Decisões de Arquitetura

Durante o desenvolvimento, o grupo optou por:

- utilizar React Native com Expo para acelerar o desenvolvimento mobile;
- separar telas, componentes, contextos e utilitários;
- utilizar navegação baseada em rotas;
- criar uma interface moderna e intuitiva focada na experiência do usuário;
- integrar IA para tornar o aplicativo mais interativo;
- manter os dados locais nesta primeira etapa do projeto;
- preparar a estrutura para uma futura API REST.

---

## 🔐 Persistência, Segurança e Limitações

Nesta etapa, o app funciona sem backend Java. Os dados são persistidos localmente com `AsyncStorage`, separados por usuário quando aplicável. O modo visitante utiliza o escopo `guest`.

A autenticação atual é local e serve apenas para demonstração. Senhas não devem ser consideradas seguras em produção. Para a versão final, a autenticação e os dados deverão ser validados por uma API com hash de senha, JWT, HTTPS, controle de acesso e tratamento de erros.

A API Java/Spring Boot, JWT real, banco de dados, testes de integração, OpenAPI e demais serviços documentados serão adicionados em uma etapa posterior do projeto, caso o grupo deseje evoluir a solução para uma arquitetura completa orientada a serviços.

---

## 🚀 Próximos Passos

Com mais tempo de desenvolvimento, o grupo pretende implementar:

- integração com banco de dados real;
- sistema completo de autenticação e autorização;
- API REST Java/Spring Boot;
- JWT com expiração e refresh token;
- agendamento conectado a concessionárias reais;
- notificações push;
- histórico de serviços persistido no servidor;
- chat em tempo real com suporte;
- melhorias na IA para recomendações personalizadas;
- testes automatizados e documentação OpenAPI;
- pipeline DevSecOps e monitoramento;
- publicação do aplicativo em lojas mobile, caso desejado.

---

## 📄 Considerações Finais

Este projeto foi desenvolvido para fins acadêmicos, com foco na aplicação prática de conceitos de desenvolvimento mobile, experiência do usuário, arquitetura de software, inteligência artificial e integração de serviços.

O aplicativo prioriza uma experiência de uso simples para o cliente, conectada à gestão de veículos, manutenção, recompensas e suporte.

---

## 📱 Demonstração Visual

As screenshots estão organizadas em duas colunas para facilitar a visualização. As imagens do projeto são verticais, com dimensões próximas de 400 × 900 pixels.

| Tela de Boas-Vindas | Tela de Login |
| :---: | :---: |
| <img src="./screens/Inicio.png" width="220" alt="Tela de Boas-Vindas"> | <img src="./screens/login.png" width="220" alt="Tela de Login"> |

| Tela de Cadastro | Home do Aplicativo |
| :---: | :---: |
| <img src="./screens/cadastro.png" width="220" alt="Tela de Cadastro"> | <img src="./screens/home.png" width="220" alt="Home do Aplicativo"> |

| Tela de Inteligência Artificial | Tela de Serviços |
| :---: | :---: |
| <img src="./screens/ia.png" width="220" alt="Tela de Inteligência Artificial"> | <img src="./screens/servicos.png" width="220" alt="Tela de Serviços"> |

| Tela de Cadastro de Veículo | Tela de Perfil |
| :---: | :---: |
| <img src="./screens/cadastrocarro.png" width="220" alt="Tela de Cadastro de Veículo"> | <img src="./screens/perfil.png" width="220" alt="Tela de Perfil"> |

| Demonstração em Vídeo/GIF | |
| :---: | :---: |
| <img src="./screens/gif-challenge.gif" width="220" alt="Demonstração do aplicativo"> | |
