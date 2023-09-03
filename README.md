# Polaris bot

[Invite URL](https://discord.com/api/oauth2/authorize?client_id=1143545840842047650&permissions=1635120576630&scope=bot)

### Environment Variables

Create a `.env` file to store your secrets with the given format

```.env
# discord
DISCORD_CLIENT=<client-id>
DISCORD_TOKEN=<discord-auth-token>
# twitch
TWITCH_CLIENT_ID=<twitch-application-clientid>
TWITCH_SECRET=<twitch-application-secret>
```

### Twitch Auth Token:

`https://id.twitch.tv/oauth2/token?client_id=<client_id>&client_secret=<client_secret>&grant_type=client_credentials`

Response Format:

```json
{
    "access_token": "o5222gq9ner237ceww85swrd1k3rxy",
    "expires_in": 4907246,
    "token_type": "bearer"
}
```

### Channel Search:

`https://api.twitch.tv/helix/search/channels?query=greatlakesgirl`


Headers: 

```json
{
    "Client-Id": "<application-client-id>",
    "Authorization": "Bearer <auth-token>"
}
```
Response Format:

```json
{
    "data": [
        {...},
        {
            "broadcaster_language": "en",
            "broadcaster_login": "greatlakesgirl",
            "display_name": "GreatLakesGirl",
            "game_id": "27471",
            "game_name": "Minecraft",
            "id": "401148492",
            "is_live": false,
            "tag_ids": [],
            "tags": [
                "Ally",
                "SafeSpace",
                "English",
                "Michigan",
                "VaultHunters",
                "PolarisSMP",
                "Modded",
                "VHSMP",
                "PolarisUniverse",
                "VaultHuntersModpack"
            ],
            "thumbnail_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/0ec0f8a4-dc2a-4c94-8e39-e3c5acf86360-profile_image-300x300.png",
            "title": "We need infrastructure! Legs vs Lemon Vault Hunters Arcade RACE to 100! ft. @arrrrrlemon ~ !discord !merch !yt !polaris !arcadesetup !arcade",
            "started_at": ""
        },
        ...
    ],
    "pagination": {}
}
```