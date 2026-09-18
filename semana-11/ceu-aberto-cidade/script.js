const botaoCelsius = document.querySelector("#botao-celsius");
const botaoFahrenheit = document.querySelector("#botao-fahrenheit");
const cidadeSelect = document.querySelector("#cidade");
const selo = document.querySelector("#selo");
const titulo = document.querySelector("#titulo");
const temperatura = document.querySelector("#temperatura");
const condicao = document.querySelector("#condicao");
const sensacao = document.querySelector("#sensacao");
const umidade = document.querySelector("#umidade");
const vento = document.querySelector("#vento");

const cidades = [
  {
    value: "florianopolis",
    nome: "Florianópolis",
    selo: "Floripa",
    temperatura: 23,
    condicao: "Parcialmente nublado",
    sensacao: 24,
    umidade: "61%",
    vento: "12 km/h",
    previsao: [
      { id: "temp-hoje", max: 26, min: 16, condicao: "Parcialmente nublado" },
      {
        id: "temp-segunda",
        max: 27,
        min: 17,
        condicao: "Predominantemente limpo",
      },
      { id: "temp-terca", max: 24, min: 16, condicao: "Nublado" },
      { id: "temp-quarta", max: 22, min: 15, condicao: "Chuva fraca" },
      { id: "temp-quinta", max: 25, min: 16, condicao: "Parcialmente nublado" },
      { id: "temp-sexta", max: 28, min: 17, condicao: "Céu limpo" },
      {
        id: "temp-sabado",
        max: 29,
        min: 18,
        condicao: "Predominantemente limpo",
      },
    ],
  },
  {
    value: "sao-paulo",
    nome: "São Paulo",
    selo: "SP",
    temperatura: 19,
    condicao: "Nublado",
    sensacao: 18,
    umidade: "78%",
    vento: "8 km/h",
    previsao: [
      { id: "temp-hoje", max: 21, min: 14, condicao: "Nublado" },
      { id: "temp-segunda", max: 22, min: 15, condicao: "Chuva fraca" },
      { id: "temp-terca", max: 20, min: 14, condicao: "Chuva" },
      { id: "temp-quarta", max: 18, min: 13, condicao: "Nublado" },
      { id: "temp-quinta", max: 23, min: 15, condicao: "Parcialmente nublado" },
      { id: "temp-sexta", max: 25, min: 16, condicao: "Céu limpo" },
      { id: "temp-sabado", max: 24, min: 16, condicao: "Parcialmente nublado" },
    ],
  },
  {
    value: "rio-de-janeiro",
    nome: "Rio de Janeiro",
    selo: "Rio",
    temperatura: 27,
    condicao: "Céu limpo",
    sensacao: 28,
    umidade: "55%",
    vento: "14 km/h",
    previsao: [
      { id: "temp-hoje", max: 29, min: 21, condicao: "Céu limpo" },
      { id: "temp-segunda", max: 30, min: 22, condicao: "Céu limpo" },
      { id: "temp-terca", max: 28, min: 21, condicao: "Parcialmente nublado" },
      { id: "temp-quarta", max: 26, min: 20, condicao: "Chuva fraca" },
      { id: "temp-quinta", max: 27, min: 21, condicao: "Parcialmente nublado" },
      { id: "temp-sexta", max: 31, min: 22, condicao: "Céu limpo" },
      { id: "temp-sabado", max: 32, min: 23, condicao: "Céu limpo" },
    ],
  },
];

function paraFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

function atualizarTela(chaveCidade, unidade) {
  const cidade = cidades.find((item) => item.value === chaveCidade);

  selo.textContent = cidade.selo;
  titulo.textContent = `Tempo em ${cidade.nome} hoje`;
  condicao.textContent = cidade.condicao;
  umidade.textContent = cidade.umidade;
  vento.textContent = cidade.vento;

  if (unidade === "fahrenheit") {
    temperatura.textContent = `${paraFahrenheit(cidade.temperatura)} °F`;
    sensacao.textContent = `${paraFahrenheit(cidade.sensacao)} °F`;
    botaoCelsius.classList.remove("ativa");
    botaoFahrenheit.classList.add("ativa");
  } else {
    temperatura.textContent = `${cidade.temperatura} °C`;
    sensacao.textContent = `${cidade.sensacao} °C`;
    botaoFahrenheit.classList.remove("ativa");
    botaoCelsius.classList.add("ativa");
  }

  cidade.previsao.forEach((dia) => {
    const elemento = document.querySelector(`#${dia.id}`);

    if (unidade === "fahrenheit") {
      elemento.textContent = `${paraFahrenheit(dia.max)}° / ${paraFahrenheit(dia.min)}°`;
    } else {
      elemento.textContent = `${dia.max}° / ${dia.min}°`;
    }
  });
}

botaoCelsius.addEventListener("click", () => {
  localStorage.setItem("unidadeTemperatura", "celsius");
  atualizarTela(cidadeSelect.value, "celsius");
});

botaoFahrenheit.addEventListener("click", () => {
  localStorage.setItem("unidadeTemperatura", "fahrenheit");
  atualizarTela(cidadeSelect.value, "fahrenheit");
});

cidadeSelect.addEventListener("change", () => {
  localStorage.setItem("cidade", cidadeSelect.value);

  // Salve cidadeSelect.value no localStorage, na chave "cidade"
  // Leia a unidade salva (ou use "celsius")
  // Chame atualizarTela com a cidade escolhida e a unidade
  const unidadeSalva = localStorage.getItem("unidadeTemperatura") || "celsius";
  atualizarTela(cidadeSelect.value, unidadeSalva);
});

// Ao abrir a página:
// - leia a cidade salva (ou use "florianopolis")
// - leia a unidade salva (ou use "celsius")
// - coloque a cidade salva no select (cidadeSelect.value = ...)
// - chame atualizarTela com os dois valores
const unidadeSalva = localStorage.getItem("unidadeTemperatura") || "celsius";
const cidadeSalva = localStorage.getItem("cidade") || "florianopolis";

cidadeSelect.value = cidadeSalva;
atualizarTela(cidadeSalva, unidadeSalva);
