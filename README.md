# 🚗 Ford VINculo

## Enrico Ricarte Rodrigues - RM558571

## Pedro Gaspar Fernandes Ferrari - RM554887

## Victor Freire Martins Siqueira - RM556191

---

## 📌 Sobre o Projeto

O **Ford VINculo** é um aplicativo mobile desenvolvido com foco no gerenciamento e experiência do cliente da Ford. O projeto foi criado como solução para o desafio proposto pela Ford, com o objetivo de centralizar funcionalidades importantes em um único aplicativo moderno, intuitivo e acessível.

O desafio escolhido pelo grupo teve como foco melhorar a experiência do cliente através de tecnologia mobile, trazendo praticidade no gerenciamento de veículos, informações, agendamentos, recompensas e suporte inteligente.

### 🎯 Objetivo do Desafio

Desenvolver uma solução mobile capaz de melhorar a interação do cliente com a Ford, oferecendo uma experiência mais moderna, organizada e eficiente.

### ❓ Por que escolhemos esse desafio?

O grupo escolheu este desafio por acreditar que a experiência do usuário é um dos pontos mais importantes atualmente para empresas do setor automotivo. A proposta permitiu unir desenvolvimento mobile, interface moderna e integração com inteligência artificial, além de trabalhar conceitos importantes de UX/UI e arquitetura de software.

---

# ⚙️ Funcionalidades Implementadas

✅ Tela de Boas-Vindas

✅ Sistema de Login

✅ Sistema de Cadastro

✅ Modo visitante

✅ Navegação entre telas

✅ Home principal do aplicativo

✅ Cards informativos

✅ Cadastro e visualização de veículos

✅ Lista de veículos da conta e veículos de demonstração

✅ Tela de Perfil do usuário

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

# ▶️ Como Rodar o Projeto

## 📋 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- Node.js
- npm
- Expo Go ou emulador Android
- Android Studio (opcional para emulador)
- Uma chave da Groq, caso queira utilizar a IA

---

## 📥 Clonando o Repositório

```bash
# Clonar repositório
git clone URL_DO_REPOSITORIO

# Entrar na pasta do projeto
cd fiap-mdi-projeto-ford
```

---

## 📦 Instalando Dependências

```bash
npm install --legacy-peer-deps
```

---

## ▶️ Executando o Projeto

```bash
npx expo start
```

Depois disso:

- Pressione `a` para abrir no Android Emulator
- Ou escaneie o QR Code utilizando o aplicativo Expo Go
- Pressione `r` para recarregar
- Pressione `Ctrl+C` para encerrar

### Configurando a IA

A integração atual utiliza a API da Groq para comparar veículos. Para usar localmente, crie um arquivo `.env` na raiz do projeto:

```env
EXPO_PUBLIC_GROQ_API_KEY=gsk_sua_chave_aqui
```

Não compartilhe a chave em commits, prints ou vídeos. O arquivo `.env` não deve ser versionado. Como o prefixo `EXPO_PUBLIC_` incorpora o valor ao bundle mobile, essa configuração serve apenas para a demonstração acadêmica. Em produção, a chamada deve passar por um backend que proteja a chave.

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

# 🛠️ Decisões Técnicas

## 💻 Stack Utilizada

### Front-end Mobile

- React Native
- Expo
- JavaScript

### Navegação

- Expo Router

### Persistência local

- AsyncStorage
- Dados separados por usuário e modo visitante

### Inteligência Artificial

- API Groq
- Modelo Llama para comparação de veículos
- Pontuação e recompensas integradas ao app

## 🧱 Estrutura do Projeto

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
```

O projeto foi organizado utilizando separação por telas, componentes, rotas, contextos e utilitários, facilitando manutenção e escalabilidade.

## 🔗 Integrações Realizadas

- Integração com a API de Inteligência Artificial da Groq
- Navegação dinâmica entre telas
- Fluxo local de autenticação
- Persistência local por usuário
- Organização de rotas utilizando Expo Router
- Agendamento e histórico de serviços
- Gamificação por pontos e recompensas

## 🏗️ Decisões de Arquitetura

Durante o desenvolvimento, o grupo optou por:

- Utilizar React Native com Expo para acelerar o desenvolvimento mobile
- Separar telas, componentes, contextos e utilitários para melhorar organização do código
- Utilizar navegação baseada em rotas para facilitar escalabilidade
- Criar uma interface moderna e intuitiva focada na experiência do usuário
- Integrar IA para tornar o aplicativo mais interativo e inteligente
- Manter os dados locais nesta primeira etapa do projeto
- Preparar a estrutura para uma futura API REST

---

## 🔐 Persistência, Segurança e Limitações

Nesta etapa, o app funciona sem backend Java. Os dados são persistidos localmente com `AsyncStorage`, separados por usuário quando aplicável. O modo visitante utiliza o escopo `guest`.

A autenticação atual é local e serve apenas para demonstração. Senhas não devem ser consideradas seguras em produção. Para a versão final, a autenticação e os dados deverão ser validados por uma API com hash de senha, JWT, HTTPS, controle de acesso e tratamento de erros.

A API Java/Spring Boot, JWT real, banco de dados, testes de integração, OpenAPI e demais serviços documentados serão adicionados em uma etapa posterior do projeto, caso o grupo deseje evoluir a solução para uma arquitetura completa orientada a serviços.

---

# 🚀 Próximos Passos

Com mais tempo de desenvolvimento, o grupo pretende implementar:

- Integração com banco de dados real
- Sistema completo de autenticação e autorização
- API REST Java/Spring Boot
- JWT com expiração e refresh token
- Agendamento conectado a concessionárias reais
- Notificações push
- Histórico de serviços persistido no servidor
- Chat em tempo real com suporte
- Melhorias na IA para recomendações personalizadas
- Testes automatizados e documentação OpenAPI
- Pipeline DevSecOps e monitoramento
- Publicação do aplicativo em lojas mobile, caso desejado

---

# 📄 Considerações Finais

Este projeto foi desenvolvido para fins acadêmicos, com foco na aplicação prática de conceitos de desenvolvimento mobile, experiência do usuário, arquitetura de software, inteligência artificial e integração de serviços.

O aplicativo prioriza uma experiência de uso simples para o cliente, conectada à gestão de veículos, manutenção, recompensas e suporte.

---

# 📱 Demonstração Visual

## 🖼️ Prints das Telas

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
