import request from "request";

function getAuth(clientID: string, clientSecret: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const tokenUrl = `https://id.twitch.tv/oauth2/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=client_credentials`;

        request.post(tokenUrl, (error, res, body) => {
            if (error) {
                console.error(`Error making Twitch API request: ${error}`);
                return reject(error);
            }

            if (res.statusCode !== 200) {
                console.error(
                    `Twitch API returned status code ${res.statusCode}`
                );
                return reject(
                    `Twitch API request failed with status code ${res.statusCode}`
                );
            }

            try {
                const responseJson = JSON.parse(body);
                if (responseJson.access_token) {
                    resolve(responseJson.access_token);
                } else {
                    reject(
                        "Twitch API response did not contain an access token"
                    );
                }
            } catch (e) {
                console.error(`Error parsing Twitch API response: ${e}`);
                reject(e);
            }
        });
    });
}

export default getAuth;
