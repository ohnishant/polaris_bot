import request from "request";

interface TwitchChannelInfo {
    broadcaster_language: string;
    broadcaster_login: string;
    display_name: string;
    game_id: string;
    game_name: string;
    id: string;
    is_live: boolean;
    tag_ids: string[];
    tags: string[];
    thumbnail_url: string;
    title: string;
    started_at: string;
}

async function getStreams(
    channelName: string,
    clientID: string,
    auth: string
): Promise<TwitchChannelInfo | boolean> {
    return new Promise((resolve, reject) => {
        const url = `https://api.twitch.tv/helix/search/channels?query=${channelName}`;

        // authkey from getAuth
        var headers = {
            "Client-Id": clientID,
            "Authorization": `Bearer ${auth}`,
        };

        request.get(url, { headers: headers }, (error, res, body) => {
            if (error) {
                console.error(
                    `Error making Twitch API request for Channels: ${error}`
                );
                return reject(error);
            }

            if (res.statusCode !== 200) {
                console.error(
                    `Twitch API[Channels] returned status code ${res.statusCode}`
                );
                return reject(
                    `Twitch API request failed with status code ${res.statusCode}`
                );
            }

            try {
                // Api returns an array of objects of all the channels that are similar to the query
                // Refer README
                const channels: TwitchChannelInfo[] = JSON.parse(body).data;

                let channelExists: boolean = false;

                channels.forEach((channel) => {
                    if (
                        channel.broadcaster_login.toLowerCase() ===
                        channelName.toLowerCase()
                    ) {
                        channelExists = true;
                        resolve(channel);
                    }
                });

                if (!channelExists) {
                    resolve(false);
                }
            } catch (e) {
                console.error(
                    `Error parsing Twitch API[Channel] response: ${e}`
                );
                reject(e);
            }
        });
    });
}
