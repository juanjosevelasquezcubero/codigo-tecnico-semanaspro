// const botaoCelsius = document.querySelector("#botao-celsius");
const botaoFahrenheit = document.querySelector("#botao-fahrenheit");
const cidadeSelect = document.querySelector("#cidade");
const selo = document.querySelector("#selo");
const titulo = document.querySelector("#titulo");
const temperatura = document.querySelector("#temperatura");
const condicao = document.querySelector("#condicao");
const sensacao = document.querySelector("#sensacao");
const umidade = document.querySelector("#umidade");
const vento = document.querySelector("#vento");

const idsPrevisao = [
  "temp-hoje",
  "temp-segunda",
  "temp-terca",
  "temp-quarta",
  "temp-quinta",
  "temp-sexta",
  "temp-sabado",
];

const cidades = [
  {
    value: "florianopolis",
    nome: "Florianópolis",
    selo: "Floripa",
    latitude: -27.5954,
    longitude: -48.548,
    temperatura: 23,
    condicao: "Parcialmente nublado",
    sensacao: 24,
    umidade: "61%",
    vento: "12 km/h",
    previsao: [
      { id: "temp-hoje", max: 26, min: 16, condicao: "Parcialmente nublado" },
      { id: "temp-segunda", max: 27, min: 17, condicao: "Predominantemente limpo" },
      { id: "temp-terca", max: 24, min: 16, condicao: "Nublado" },
      { id: "temp-quarta", max: 22, min: 15, condicao: "Chuva fraca" },
      { id: "temp-quinta", max: 25, min: 16, condicao: "Parcialmente nublado" },
      { id: "temp-sexta", max: 28, min: 17, condicao: "Céu limpo" },
      { id: "temp-sabado", max: 29, min: 18, condicao: "Predominantemente limpo" },
    ],
  },
  {
    value: "sao-paulo",
    nome: "São Paulo",
    selo: "SP",
    latitude: -23.5505,
    longitude: -46.6333,
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
    latitude: -22.9068,
    longitude: -43.1729,
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

let climaAtual;

function paraFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

function traduzirCondicao(codigo) {
  const condicoes = {
    0: "Céu limpo",
    1: "Predominantemente limpo",
    2: "Parcialmente nublado",
    3: "Nublado",
    45: "Neblina",
    48: "Neblina",
    51: "Chuvisco",
    53: "Chuvisco",
    55: "Chuvisco",
    61: "Chuva fraca",
    63: "Chuva",
    65: "Chuva forte",
    80: "Pancadas de chuva",
    81: "Pancadas de chuva",
    82: "Pancadas de chuva forte",
    95: "Trovoada",
    96: "Trovoada",
    99: "Trovoada",
  };

  return condicoes[codigo] || "Condição desconhecida";
}

function formatarData(iso) {
  const data = new Date(`${iso}T12:00:00`);
  return data.toLocaleDateString("pt-BR", { day: "numeric", month: "long" });
}

function nomeDoDia(iso, indice) {
  if (indice === 0) {
    return "Hoje";
  }

  const data = new Date(`${iso}T12:00:00`);
  const nome = data.toLocaleDateString("pt-BR", { weekday: "long" });
  return nome.charAt(0).toUpperCase() + nome.slice(1);
}

async function buscarTempo(cidade) {
  // 1. Monte a URL da Open-Meteo com cidade.latitude e cidade.longitude
  //    (a URL completa está no README)
  //
  // 2. try/catch:
  //    - const response = await fetch(url)
  //    - se !response.ok, throw new Error(`Erro HTTP: ${response.status}`)
  //    - const dados = await response.json()
  //    - return dados
  //    - no catch: console.error("Falhou:", erro)
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

    elemento.nextElementSibling.textContent = dia.condicao;
  });

  // Adapte esta função para receber também o JSON da API (clima).
  // Troque os números fixos da cidade pelos campos da Open-Meteo:
  //   cidade.condicao        → traduzirCondicao(clima.current.weather_code)
  //   cidade.umidade         → `${clima.current.relative_humidity_2m}%`
  //   cidade.vento           → `${Math.round(clima.current.wind_speed_10m)} km/h`
  //   cidade.temperatura     → Math.round(clima.current.temperature_2m)
  //   cidade.sensacao        → Math.round(clima.current.apparent_temperature)
  //   cidade.previsao        → idsPrevisao + clima.daily (time, weather_code, max e min)
  // Atualize também o <h3> e o <time> de cada card com nomeDoDia e formatarData.
}

async function carregarCidade(chaveCidade) {
  // 1. Encontre a cidade no array cidades
  // 2. climaAtual = await buscarTempo(cidade)
  // 3. Leia a unidade salva (ou "celsius")
  // 4. Se climaAtual existir, chame atualizarTela com a cidade, o clima e a unidade
}

botaoCelsius.addEventListener("click", () => {
  localStorage.setItem("unidadeTemperatura", "celsius");
  atualizarTela(cidadeSelect.value, "celsius");
  // Depois da API: use climaAtual e não busque de novo
});

botaoFahrenheit.addEventListener("click", () => {
  localStorage.setItem("unidadeTemperatura", "fahrenheit");
  atualizarTela(cidadeSelect.value, "fahrenheit");
  // Depois da API: use climaAtual e não busque de novo
});

cidadeSelect.addEventListener("change", () => {
  localStorage.setItem("cidade", cidadeSelect.value);
  const unidade = localStorage.getItem("unidadeTemperatura") || "celsius";
  atualizarTela(cidadeSelect.value, unidade);
  // Depois da API: chame carregarCidade(cidadeSelect.value)
});

const cidadeSalva = localStorage.getItem("cidade") || "florianopolis";
const unidadeSalva = localStorage.getItem("unidadeTemperatura") || "celsius";

cidadeSelect.value = cidadeSalva;
atualizarTela(cidadeSalva, unidadeSalva);
// Depois da API: chame carregarCidade(cidadeSalva)
