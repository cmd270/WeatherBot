const {SlashCommandBuilder} = require('discord.js');
const axios = require('axios');
const fs = require('node:fs');
const {apikeyOWM} = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('forecast_weather')
    .setDescription('Предоставляет информацию о погоде на 3 дня. Информация разбита на каждые 3 часа в сутки.')
    .addStringOption(option =>
        option.setName('city')
       .setDescription('Город, погоду в котором вы хотите узнать.')),
    async execute(interaction){
        const city = interaction.options.getString('city');
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apikeyOWM}`)
        .then((response) => {
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${response.data[0].lat.toString()}&lon=${response.data[0].lon.toString()}&appid=${apikeyOWM}&lang=ru&units=metric&cnt=24`)
            .then(async (resp) => {
                let result = `**${city}**,  *широта ${response.data[0].lat.toString()} долгота ${response.data[0].lon.toString()}* :map:\n`;
                
                resp.data.list.forEach((element,counter) => {
                    result += `${counter+1}. \`${element.dt_txt}\` ${element.weather[0].description}, температура от \`${element.main.temp_min} °C\` до \`${element.main.temp_max} °C\`\n`;
                });

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