const {SlashCommandBuilder} = require('discord.js');
const axios = require('axios');
const fs = require('node:fs');
const {apikeyOWM} = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('current_weather')
    .setDescription('Предоставляет информацию о текущей погоде.')
    .addStringOption(option =>
        option.setName('city')
       .setDescription('Город, погоду в котором вы хотите узнать.')),
    async execute(interaction){
        const city = interaction.options.getString('city');
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apikeyOWM}`)
        .then((response) => {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat.toString()}&lon=${response.data[0].lon.toString()}&appid=${apikeyOWM}&lang=ru&units=metric`)
            .then(async (resp) => {
                const result = 
                `**${city}**, широта *${response.data[0].lat.toString()} долгота ${response.data[0].lon.toString()}* :map: 
**${resp.data.weather[0].description}**
1. Температура: **${resp.data.main.temp}** °C :thermometer:
2. Ощущается как: **${resp.data.main.feels_like}** °C :thought_balloon:
3. Давление: **${resp.data.main.pressure}** Па :anger:
4. Влажность: **${resp.data.main.humidity}** г/м³ :bubbles:
5. Скорость ветра: **${resp.data.wind.speed}** м/c :wind_blowing_face:`;
                await interaction.reply(result);
            })
            .catch (async () => {
                await interaction.reply(`Ошибка! Проверьте правильность ввода данных и повторите попытку.`);
            });
        })
        .catch(async () => {
            await interaction.reply(`Ошибка! Проверьте правильность ввода данных и повторите попытку.`);
        });
    },
};