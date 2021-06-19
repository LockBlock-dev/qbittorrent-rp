const qbit = require("qbittorrent-api-v2")

const config = require("./config")

const client = require("discord-rich-presence")("855773421698940969")

const bytesToSize = (bytes) => {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return '0 B'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    if (i === 0) return `${bytes} ${sizes[i]}`
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}

const averageRatio = (torrents) => {
    var ratio = 0
    var c = 0

    for (var t in torrents) {
        ratio += torrents[t].ratio
        c += 1
    }

    return (ratio/c).toFixed(2)
}

const discordRPC = async () => {

    const api = await qbit.connect(`http://${config.host.ip}:${config.host.port}`, config.user, config.password)

    var torrents, speeds, version

    client.on("connected", async () => {

        console.log("Connected to Discord !")

        startTimestamp = new Date()
        torrents = await api.torrents()
        speeds = await api.transferInfo()
        version = await api.appVersion()
        ratio = averageRatio(torrents)

        client.updatePresence({
            details: `${torrents.length} active torrents | Average ratio: ${ratio}`,
            state: `UP: ${bytesToSize(speeds.up_info_speed)}/s | DOWN: ${bytesToSize(speeds.dl_info_speed)}/s`,
            startTimestamp,
            largeImageKey: "qbittorrent-logo",
            largeImageText: `qBittorrent ${version}`
        })

        setInterval(async () => {

            torrents = await api.torrents()
            speeds = await api.transferInfo()
            version = await api.appVersion()
            ratio = averageRatio(torrents)

            client.updatePresence({
                details: `${torrents.length} active torrents | Average ratio: ${ratio}`,
                state: `UP: ${bytesToSize(speeds.up_info_speed)} | DOWN: ${bytesToSize(speeds.dl_info_speed)}`,
                startTimestamp,
                largeImageKey: "qbittorrent-logo",
                largeImageText: `qBittorrent ${version}`,
            })

            console.log("Presence Updated !")

        }, 10000)

    })

    process.on("unhandledRejection", console.error)
}

discordRPC()