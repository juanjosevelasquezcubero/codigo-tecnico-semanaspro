const formulario = document.querySelector("#formulario");
const campoNome = document.querySelector("#nome");
const statusMensagem = document.querySelector("#status");
const sprite = document.querySelector("#sprite");
const titulo = document.querySelector("#titulo");

async function buscarPokemon(nome) {
  // Monte a URL com o nome. Ache o endereço na documentação da PokéAPI.
  // Teste no navegador antes de usar no fetch.
  // 1. fetch(url)
  // 2. se response.ok === false, mostre "Não achei esse Pokémon." e pare
  // 3. dados = await response.json()
  // 4. console.log(dados)
  // 5. titulo.textContent = o nome que veio na API
  // 6. sprite.src = a imagem de frente que veio na API
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const nome = campoNome.value.trim().toLowerCase();

  // Chame buscarPokemon(nome)
});
