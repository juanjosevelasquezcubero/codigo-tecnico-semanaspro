# Exercício — Pokédex

O HTML e o CSS já estão prontos. Complete o `script.js`.

A tela precisa mostrar o **nome** e a **imagem** do Pokémon que a pessoa digitou.

A API é a [PokéAPI](https://pokeapi.co/). A documentação está no site. **Não tem URL pronta neste enunciado** — vocês precisam achar o endereço que devolve **um** Pokémon pelo nome.

## Como investigar

1. Abra a [documentação](https://pokeapi.co/docs/v2).
2. Ache o recurso certo. Teste a URL **no navegador** (cole na barra de endereço). Tem que aparecer um JSON.
3. No JSON, procure o nome e a imagem de frente (`Ctrl+F` ajuda).
4. Só depois escreva o `fetch`.

Se a URL estiver errada, o navegador (e o `fetch`) não vão trazer o Pokémon.

## O que fazer

1. No `submit`, use `preventDefault()` e leia o nome do input.
2. Faça `fetch` da URL que você encontrou. Se `response.ok === false`, mostre **Não achei esse Pokémon.**
3. `console.log(dados)` — abra o DevTools (F12) e olhe o objeto.
4. Coloque o nome em `#titulo` e a imagem em `#sprite`.

## Pronto quando

- Buscar `pikachu` mostra o nome e a imagem.
- Buscar `asdfgh` mostra a mensagem de erro.
- O objeto aparece no Console.
