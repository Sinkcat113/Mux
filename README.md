# Installing

```sh
npm i
```

(You may also want to install the vscode svelte extension if you plan on modifying Mux)


# Configure the environment variables

At the root of the project create a `.env` file.

This file will contain server-side parameters for the app. Your ENV should look like the following:

```env
API_KEY="<Your JellyFin API Key>"
USER_ID="<Your JellyFin UserID>"
ADDRESS="<https://your.jellyfin.instance>"
COLLECTION="<Collection ID for where your albums are stored>"
```

(I plan on switching to in-app authentication instead of this at some point. This project just started out with me using the API key initially.)

The `COLLECTION` parameter may be confusing. This is just to point to where your actual albums are so like you have albums but above that is your library. This points to the library at which your albums are located.

# Running Mux

After your environment is configured and installed you should be able to run Mux with:

```sh
npm run dev
```