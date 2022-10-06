const qbit = require("qbittorrent-api-v2");
const discord = require("discord-rpc");

const config = require("./config.js");
const clientId = "1027715138750513164";
const startTimestamp = new Date();

const bytesToSize = (bytes) => {
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 B";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]}`;
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
};

const averageRatio = (torrents) => {
    var ratio = 0;
    var c = 0;
    for (var t in torrents) {
        ratio += torrents[t].ratio;
        c += 1;
    }
    return (ratio / c).toFixed(2);
};

const rpc = new discord.Client({ transport: "ipc" });

const discordPRC = async () => {
    const api = await qbit.connect(`http://${config.host.ip}:${config.host.port}`, config.user, config.password);
    let torrents = await api.torrents();
    let speeds = await api.transferInfo();
    let version = await api.appVersion();

    rpc.setActivity({
        details: `${torrents.length} active torrents | Average ratio: ${averageRatio(torrents)}`,
        state: `↑: ${bytesToSize(speeds.up_info_speed)}/s | ↓: ${bytesToSize(speeds.dl_info_speed)}/s`,
        startTimestamp,
        largeImageKey: "qbittorrent-logo",
        largeImageText: `qBittorrent ${version}`,
    });
};

rpc.on("connected", () => {
    console.log("Connected to Discord!");
    discordPRC();
    setInterval(() => discordPRC(), 10000);
});

process.on("unhandledRejection", console.error);

rpc.login({ clientId });
