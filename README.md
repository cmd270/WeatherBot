### WeatherBot

A Simple bot with 2 commands.

### Config

Before run bot you need to make your own `config.json` like this:
```json
{
    "token" : "your-bot-token",
    "clientId" : "your-bot-clientid",
    "guildId" : "your-bot-guildId",
    "apikeyOWM" : "your-api-key-OpenWeatheMap"
}
```

### Usage

Run with
```bash
$ node .
```

Bot have only 2 commands:

`/forecast_weather [city]` - return forecast weather

`/current_weather [city]` - return current weather