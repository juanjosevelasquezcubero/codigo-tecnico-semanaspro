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
const botaoLocalizacao = document.querySelector("#botao-localizacao");
const statusMessage = document.querySelector("#status");

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
  },
  {
    value: "sao-paulo",
    nome: "São Paulo",
    selo: "SP",
    latitude: -23.5505,
    longitude: -46.6333,
  },
  {
    value: "rio-de-janeiro",
    nome: "Rio de Janeiro",
    selo: "Rio",
    latitude: -22.9068,
    longitude: -43.1729,
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

// iso = data da API, tipo "2026-09-14". indice = posição na previsão (0, 1, 2...).
function nomeDoDia(iso, indice) {
  // O primeiro card é sempre "Hoje", não o nome da semana.
  if (indice === 0) {
    return "Hoje";
  }

  // T12:00:00 trava o horário no meio do dia. Sem isso, o fuso pode virar a data para ontem.
  const data = new Date(`${iso}T12:00:00`);
  // weekday: "long" → "segunda-feira" em português (minúsculo).
  const nome = data.toLocaleDateString("pt-BR", { weekday: "long" });
  // Primeira letra maiúscula: "Segunda-feira".
  return nome.charAt(0).toUpperCase() + nome.slice(1);
}

async function buscarTempo(cidade) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${cidade.latitude}&longitude=${cidade.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=America/Sao_Paulo&forecast_days=7`;
  try {
    const response = await fetch(url);

    if (response.ok === false) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const dados = await response.json();
    console.log(dados);

    return dados;
  } catch (err) {
    console.log(err);
  }
}

function mostrarStatus(texto) {
  statusMessage.textContent = texto;
}

function distanciaAte(cidade, latitude, longitude) {
  //Quanto maio numero, mais distante está
  return (
    Math.abs(cidade.latitude - latitude) +
    Math.abs(cidade.longitude - longitude)
  );
}

function cidadeMaisProxima(latitude, longitude) {
  let maisProxima = cidades[0];

  for (let i = 1; i < cidades.length; i++) {
    const cidade = cidades[i];

    if (
      distanciaAte(cidade, latitude, longitude) <
      distanciaAte(maisProxima, latitude, longitude)
    ) {
      maisProxima = cidade;
    }
  }

  return maisProxima;
}

function usarMinhaLocalizacao() {
  if (!navigator.geolocation) {
    mostrarStatus("Seu navegador não tem geolocalização.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const cidade = cidadeMaisProxima(
        position.coords.latitude,
        position.coords.longitude,
      );

      cidadeSelect.value = cidade.value;
      localStorage.setItem("cidade", cidade.value);
      carregarCidade(cidade.value);
    },
    (error) => {
      console.error(`Erro ${error.code}: ${error.message}`);
    },
    { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
  );
}

async function carregarCidade(chaveCidade) {
  const cidade = cidades.find((item) => item.value === chaveCidade);
  const unidade = localStorage.getItem("unidadeTemperatura") || "celsius";

  mostrarStatus("Carregando...");

  climaAtual = await buscarTempo(cidade);

  mostrarStatus("");

  atualizarTela(cidade, climaAtual, unidade);
}

function atualizarTela(cidade, clima, unidade) {
  selo.textContent = cidade.selo;
  titulo.textContent = `Tempo em ${cidade.nome} hoje`;

  const temperaturaAgora = Math.round(clima.current.temperature_2m);
  const sensacaoTermica = Math.round(clima.current.apparent_temperature);

  umidade.textContent = `${clima.current.relative_humidity_2m}%`;
  vento.textContent = `${Math.round(clima.current.wind_speed_10m)} km/h`;

  condicao.textContent = traduzirCondicao(clima.current.weather_code);

  if (unidade === "fahrenheit") {
    temperatura.textContent = `${paraFahrenheit(temperaturaAgora)} °F`;
    sensacao.textContent = `${paraFahrenheit(sensacaoTermica)} °F`;
    botaoCelsius.classList.remove("ativa");
    botaoFahrenheit.classList.add("ativa");
  } else {
    temperatura.textContent = `${temperaturaAgora} °C`;
    sensacao.textContent = `${sensacaoTermica} °C`;
    botaoFahrenheit.classList.remove("ativa");
    botaoCelsius.classList.add("ativa");
  }

  idsPrevisao.forEach((el, indice) => {
    const elemento = document.querySelector(`#${el}`);
    const max = Math.round(clima.daily.temperature_2m_max[indice]);
    const min = Math.round(clima.daily.temperature_2m_min[indice]);

    if (unidade === "fahrenheit") {
      elemento.textContent = `${paraFahrenheit(max)} °F / ${paraFahrenheit(min)}°F`;
    } else {
      elemento.textContent = `${max}° / ${min}°`;
    }
  });
}

botaoCelsius.addEventListener("click", () => {
  localStorage.setItem("unidadeTemperatura", "celsius");
  const cidade = cidades.find((item) => item.value === cidadeSelect.value);
  atualizarTela(cidade, climaAtual, "celsius");
  // Depois da API: use climaAtual e não busque de novo
});

botaoFahrenheit.addEventListener("click", () => {
  localStorage.setItem("unidadeTemperatura", "fahrenheit");
  const cidade = cidades.find((item) => item.value === cidadeSelect.value);
  atualizarTela(cidade, climaAtual, "fahrenheit");
  // Depois da API: use climaAtual e não busque de novo
});

cidadeSelect.addEventListener("change", () => {
  localStorage.setItem("cidade", cidadeSelect.value);
  const unidade = localStorage.getItem("unidadeTemperatura") || "celsius";
  carregarCidade(cidadeSelect.value);
});

botaoLocalizacao.addEventListener("click", () => {
  usarMinhaLocalizacao();
});

const cidadeSalva = localStorage.getItem("cidade") || "florianopolis";
const unidadeSalva = localStorage.getItem("unidadeTemperatura") || "celsius";

// cidadeSelect.value = cidadeSalva;
// atualizarTela(cidadeSalva, unidadeSalva);
// Depois da API: chame carregarCidade(cidadeSalva)
cidadeSelect.value = cidadeSalva;
carregarCidade(cidadeSalva);
