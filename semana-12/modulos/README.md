# Exercício — CommonJS para ESM

Este exercício é **só Node**, no terminal. Não é o site do Céu Aberto.

O `slug.js` **exporta** `criarSlug`. O `index.js` **chama** essa função com `require`. Vocês vão instalar, rodar e passar os dois arquivos para **ESM**.

## O que fazer

1. Nesta pasta:

```bash
npm install
node index.js
```

Deve aparecer: `commonjs-para-esm`

2. Passe para ESM:

- `require` vira `import`
- `module.exports` vira `export`
- no `package.json`, coloque `"type": "module"`

3. Rode de novo:

```bash
node index.js
```

A saída tem que ser a mesma.

## Pronto quando

- `node index.js` funciona com `import` / `export`.
- O `package.json` tem `"type": "module"`.
