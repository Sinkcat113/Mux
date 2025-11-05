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

# Running Mux

After your environment is configured and installed you should be able to run Mux with:

```sh
npm run dev
```