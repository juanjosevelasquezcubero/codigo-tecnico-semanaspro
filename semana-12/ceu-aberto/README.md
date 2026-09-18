# Céu Aberto — primeiro pacote com npm

O site já está pronto: clima real, °C / °F, última cidade e geolocalização. O `script.js` é o gabarito da semana 11.

Agora este projeto vira um pacote npm. Vocês vão instalar o `dayjs` **local** e usar ele nas datas da previsão.

## O que fazer

1. Nesta pasta, crie o `package.json`. O nome do projeto deve ser **ceu-aberto**:

```bash
npm init -y
```

Abra o `package.json` e confira se `"name"` está `"ceu-aberto"`. Se não estiver, arrume.

2. Instale o `dayjs` só neste projeto:

```bash
npm install dayjs
```

3. No `index.html`, descomente os dois `<script>` do `dayjs` (eles leem o arquivo dentro de `node_modules`).

Abra o `index.html` no Live Server, como nas semanas anteriores.

## Pronto quando

- O `package.json` se chama `ceu-aberto`.
- O `dayjs` está em `dependencies` (não foi instalado com `-g`).
