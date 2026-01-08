# 🦠 Projeto COVID-19 — Next.js

Este projeto foi desenvolvido como parte de um **teste técnico para processo seletivo**, com o objetivo de demonstrar organização de código, uso de **arquitetura limpa**, boas práticas de React/Next.js e integração com APIs externas.

É também o meu primeiro projeto utilizando Next.js, aplicado de forma prática e estruturada.


## 🎯 Objetivo do Projeto

Criar uma aplicação web que permita **consultar e simular dados da COVID-19**, tanto no Brasil quanto no mundo, além de possibilitar o **envio de dados simulados** por meio de um formulário.

Os dados são consumidos a partir da API pública:

[COVID-19 Brazil API](https://covid19-brazil-api-docs.vercel.app/)

---

## 🧱 Arquitetura e Organização

O projeto foi **refatorado com foco em Arquitetura Limpa**, priorizando:

* Separação de responsabilidades
* Reutilização de lógica via hooks customizados
* Componentes desacoplados de regras de negócio
* Código legível e fácil de manter

Principais conceitos aplicados:

* **Hooks customizados** (`useEnviarDados`, `useBrasilData`, etc.)
* Componentes de UI desacoplados da lógica
* Validações centralizadas
* Simulação de resposta de API para envio de dados

---

## 🧭 Estrutura de Páginas

### 🏠 Home

Página inicial da aplicação.

Apresenta três opções principais:

* **Brasil**
* **Mundo**
* **Enviar dados**

---

### 🇧🇷 Página Brasil

Permite consultar dados da COVID-19 **no Brasil**, escolhendo:

* Estado ou país (Brasil)
* Data específica

E recebe como retorno:

* Número de casos
* Número de mortes
* Número de casos suspeitos

Os dados são obtidos dinamicamente da API.

---

### 🌍 Página Mundo

Permite consultar dados da COVID-19 **por país**.

Retorna:

* Número de casos
* Número de mortes

---

### ✍️ Página Enviar Dados

Página de simulação de envio de dados para a API.

O usuário preenche um formulário com:

* Estado do Brasil
* Data
* Número de casos
* Número de casos confirmados
* Número de mortes
* Número de recuperados

#### ✔️ Validações

* Campos obrigatórios
* Data válida (entre 2019 e a data atual)

#### 📦 Simulação de Resposta da API

Após o envio:

* O usuário recebe uma **tela de confirmação**
* Os dados enviados são exibidos de forma legível
* É possível visualizar a **resposta em formato JSON**, simulando o retorno real da API

> O campo `refuses` da API foi mapeado como **recuperados**, por ser semanticamente o mais próximo dentro da estrutura disponível.

---

## 🧪 Tecnologias Utilizadas

* **Next.js** (App Router)
* **React**
* **TypeScript**
* **CSS Modules**
* **API pública COVID-19 Brazil**

---

## 🚀 Como Executar o Projeto

```bash
# Instalar dependências
npm install

# Rodar em ambiente de desenvolvimento
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

## 📌 Considerações Finais

Este projeto colaborou para o meu aprendizado de Next.js e React. Partindo do zero e assistindo algumas aulas pelo [Youtube](https://www.youtube.com/playlist?list=PLC3y8-rFHvwhIEc4I4YsRz5C7GOBnxSJY), além de tirar dúvidas com IAs, percebi uma grande evolução ao longo de 2 dias de desenvolvimento. Os pontos principais foram:

* Aprendizado e aplicação do Next.js + React do zero
* Organização de código baseada em boas práticas e arquitetura limpa
* Integração com APIs externas
* Criação de fluxos completos de consulta e envio de dados

Foi desenvolvido com foco em ser uma aplicação clara, de fácil manutenibilidade e voltada para a experiência do usuário.
