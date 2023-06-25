# vue-intranet-ts2

Projet de classe pour une WebApp Vue.js 3 (avec TypeScript)

## IDE et extensions recommandées

[VSCode](https://code.visualstudio.com/) +

- **Tooling** :
  [npm Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense) +  [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense) +  [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) +  [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

- **Vue + TS support** :
  [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) +  [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) +  [Vue VSCode Snippets](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets)
  
- **Misc** :
  [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) +
  [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)

(⚠️ Désactiver l'extension _Vetur_ si déjà installée !)

## Démarrage du projet

### Installation

Installer les dépendances du projet Vite :

```sh
npm install
```

Installer les dépendances du serveur d'API :

```sh
cd tools/server
npm install
cd -
```

### Lancement

Ouvrir un serveur de développement avec Compilation + Hot-reload :

```sh
npm run dev
```

Ouvrir un serveur d'API :

```sh
npm run server
```

### Compilation

Effectuer un type-checking, compile et minifie les fichiers source pour la production dans le dossier `/dist`

```sh
npm run build
```
