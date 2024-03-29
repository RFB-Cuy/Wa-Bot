import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

// stiker funtion
client.on("message", async (msg) => {
  if (msg.body.startsWith("/stiker") && msg.type === "image") {
    const media = await msg.downloadMedia();
    client.sendMessage(msg.from, media, {
      sendMediaAsSticker: true,
      stickerAuthor: "RFB",
      stickerName: "Random aja",
    });
  }
});

client.initialize();
