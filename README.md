# Auth Native

Um aplicativo de demonstração de autenticação em React Native, utilizando as melhores práticas de desenvolvimento e uma arquitetura moderna.

## 🚀 Tecnologias

- React Native
- TypeScript
- React Navigation
- Gluestack UI
- AsyncStorage
- Axios
- React Hook Form
- Zustand
- Zod

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- React Native CLI
- Android Studio (para desenvolvimento Android)
- Xcode (para desenvolvimento iOS - apenas macOS)

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/vgabrielcastro/AuthNative
cd AuthNative
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Instale as dependências do iOS (apenas macOS):

```bash
cd ios && pod install && cd ..
```

4. Inicie o servidor de desenvolvimento:

```bash
npm start
# ou
yarn start
```

5. Em outro terminal, inicie o json-server para simular a API:

```bash
npm run server
# ou
yarn server
```

6. Execute o aplicativo:

```bash
# Para Android
npm run android
# ou
yarn android

# Para iOS (apenas macOS)
npm run ios
# ou
yarn ios
```

## 🔍 Debug e Logs

Para visualizar os logs do aplicativo:

```bash
# Usando npm
npm run log-android  # Para Android
npm run log-ios     # Para iOS (apenas macOS)

# Usando yarn
yarn log-android    # Para Android
yarn log-ios        # Para iOS (apenas macOS)
```

Os logs incluem:

- Informações de autenticação
- Erros e exceções
- Estado da aplicação
- Interações do usuário
- Requisições à API

## 🎯 Funcionalidades

- **Autenticação**

  - Login com email e senha
  - Persistência de sessão
  - Logout
  - Validação de formulários

- **Tema**

  - Suporte a tema claro/escuro
  - Adaptação automática ao tema do sistema
  - Cores e estilos consistentes

- **Navegação**
  - Navegação entre telas
  - Proteção de rotas
  - Transições suaves

## 📱 Telas

### Login

- Formulário de login com validação
- Feedback visual de erros
- Persistência de dados

### Home

- Boas-vindas personalizadas
- Informações do usuário
- Botão de logout
- Informações sobre o tema

## 🔐 Credenciais de Teste

Para testar o aplicativo, use as seguintes credenciais:

```
Email: teste@teste.com
Senha: 123456
```

### Adicionando Novos Usuários

Você pode adicionar mais usuários editando o arquivo `db.json`. O formato para cada usuário deve ser:

```json
{
  "users": [
    {
      "id": "1",
      "name": "Nome do Usuário",
      "email": "email@exemplo.com",
      "password": "senha123"
    }
  ]
}
```

Para adicionar um novo usuário:

1. Abra o arquivo `db.json`
2. Adicione um novo objeto dentro do array `users`
3. Reinicie o servidor com `npm run server` ou `yarn server`

## 🏗️ Estrutura do Projeto

```
src/
  ├── components/     # Componentes reutilizáveis
  ├── contexts/       # Contextos (Auth, Theme)
  ├── routes/         # Configuração de navegação
  ├── screens/        # Telas do aplicativo
  ├── services/       # Serviços (API, Auth)
  ├── store/          # Gerenciamento de estado
  ├── theme/          # Configuração de tema
  └── types/          # Definições de tipos
```

## 📱 Código Nativo

O projeto inclui código nativo tanto para Android quanto para iOS, permitindo:

### Android

- Acesso a recursos nativos do dispositivo
- Configurações específicas do Android
- Permissões nativas
- Integração com serviços do Android

### iOS

- Configurações específicas do iOS
- Capacidades nativas do iOS
- Integração com serviços do iOS
- Configurações de segurança

Para acessar o código nativo:

- Android: `android/` - Contém o projeto Android Studio
- iOS: `ios/` - Contém o projeto Xcode

## 🔄 Fluxo de Autenticação

1. **Login**

   - Usuário insere credenciais
   - Validação dos campos
   - Chamada à API
   - Armazenamento do token
   - Redirecionamento para Home

2. **Persistência**

   - Verificação de token ao iniciar
   - Redirecionamento automático
   - Manutenção da sessão

3. **Logout**
   - Remoção do token
   - Limpeza do estado
   - Redirecionamento para Login

## 🎨 Tema

O aplicativo utiliza o Gluestack UI para estilização, oferecendo:

- Design system consistente
- Suporte a temas
- Componentes acessíveis
- Estilos responsivos

## 📦 Dependências Principais

- `@gluestack-ui/themed`: UI components
- `@react-navigation/native`: Navegação
- `@react-native-async-storage/async-storage`: Armazenamento local
- `axios`: Cliente HTTP
- `react-hook-form`: Gerenciamento de formulários
- `zod`: Validação de dados

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
