import whoisfreaks from "../../whoisfreaks.app.mjs";

export default {
  key: "whoisfreaks-ip-geolocation-lookup",
  name: "IP Geolocation Lookup",
  description:
    "Retrieve geolocation details about an IP address. [See the documentation](https://whoisfreaks.com/products/ip-geolocation-api)",
  version: "0.0.4",

  annotations: {
    destructiveHint: false,
    openWorldHint: true,
    readOnlyHint: true,
  },
  type: "action",
  props: {
    whoisfreaks,
    ip: {
      type: "string",
      label: "IP Address",
      description: "The IP address to look up",
    },
  },

  async run({ $ }) {
    const response = await this.whoisfreaks.ipGeolocationLookup({
      ip: this.ip,
    });
    console.log("Response from IP Geolocation Lookup:", response);
    return response;
  },
};
