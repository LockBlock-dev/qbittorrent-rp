# qBittorrent Rich Presence

[![d-r-p](https://img.shields.io/github/package-json/dependency-version/LockBlock-dev/qbittorrent-rp/discord-rich-presence)](https://www.npmjs.com/package/discord-rich-presence) [![qb-api-v2](https://img.shields.io/github/package-json/dependency-version/LockBlock-dev/qbittorrent-rp/qbittorrent-api-v2)](https://www.npmjs.com/package/qbittorrent-api-v2)

[![GitHub stars](https://img.shields.io/github/stars/LockBlock-dev/qbittorrent-rp.svg)](https://github.com/LockBlock-dev/qbittorrent-rp/stargazers)

Discord Rich Presence for [qBittorrent](https://www.qbittorrent.org/)

![Rich Presence preview](/preview.jpg)

Note that you need QBittorrent already launched before starting the rich presence.

# Deprecation Notice

You should use [this fork](https://github.com/weebi/qbittorrent-rp) instead.

## How to use

• Download [NPM](https://www.npmjs.com/get-npm) and [NodeJS](https://nodejs.org)

• Download the project or clone it

• Go to the qbittorrent-rp folder and do `npm install`

• Go to your qBittorrent settings and activate **WEB UI**

• Set the ip, port, username and password

• Edit the config :

```js
host: {
    ip:"127.0.0.1",
    port:"4000"
},
//ip and port for the web API
user: "username",
//username for the web API
password: "password",
//password for the web API
showUpdateLogs: true,
//if you want to display the logs of the RP (when the presence is updated)
```

• Run it by doing `node index.js`

## Copyright

See the [license](/LICENSE).
