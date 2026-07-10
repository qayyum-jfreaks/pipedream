import whoisfreaks from "../../whoisfreaks.app.mjs";

export default {
    key: "whoisfreaks-ip-reputation-lookup",
    name: "IP Reputation Lookup",
    description: "The WhoisFreaks IP Reputation API scores any IPv4 or IPv6 address against real-time threat data and returns a composite threat score (0–100), VPN, proxy, Tor and bot classification, VPN and proxy provider names with confidence scores, district-level geolocation, ASN and ISP. JSON or XML in one call. Free tier: 500 credits, no card.",
    version: "0.0.4",
    annotations: {
        destructiveHint: false,
        openWorldHint: true,
        readOnlyHint: true,
    },
    type: "action",
    props: {
        whoisfreaks,
        ipAddress: {
            type: "string",
            label: "IP Address",
            description: "The IP address to lookup",

        },
    },
    async run({ $ }) {
        const response = await this.whoisfreaks.ipReputationLookup({
            $,
            params: {
                ip: this.ipAddress,

            },
        });
        console.log("Successfully fetched the IP reputation data: ", response)
        return response;
    },
};