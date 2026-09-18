# Exercício 4 — Clima real com Open-Meteo (Céu Aberto)

O `script.js` já traz a resolução da Etapa 2 (cidade, °C / °F e `localStorage`). **Não altere o HTML nem o CSS.**

Troque os números fixos pelo clima real da [Open-Meteo](https://open-meteo.com/). Não precisa de chave.

Cada cidade no array já tem `latitude` e `longitude`. A unidade e a última cidade continuam no `localStorage`.

## URL

```js
const url = `https://api.open-meteo.com/v1/forecast?latitude=${cidade.latitude}&longitude=${cidade.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=America/Sao_Paulo&forecast_days=7`;
```

A API devolve Celsius. `traduzirCondicao`, `formatarData` e `nomeDoDia` já estão no `script.js`.

## Pronto quando

- Os números da tela vêm da Open-Meteo.
- Trocar a cidade busca o clima de novo.
- Clicar em °C / °F converte **sem** um novo `fetch`.
- F5 mantém a última cidade e a última unidade.
- Enquanto a API responde, a tela mostra **Carregando...**
- **Usar minha localização** pede a posição no navegador e escolhe a cidade mais próxima.
