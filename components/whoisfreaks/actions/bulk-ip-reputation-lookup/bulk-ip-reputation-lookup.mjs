import whoisfreaks from "../../whoisfreaks.app.mjs";

export default {
    key: "whoisfreaks-bulk-ip-reputation-lookup",
    name: "Bulk IP Reputation Lookup",
    description: "Score up to 100 IPv4 or IPv6 addresses against real-time threat data in a single request. Returns composite threat score, VPN/proxy/Tor/bot classification, blacklist status, and ASN/ISP details for each IP. Accepts comma-separated IP addresses; returns JSON or XML output. [See the documentation](https://whoisfreaks.com/documentation/ip-security-api#bulk-security-lookup)",
    version: "0.0.4",
    annotations: {
        destructiveHint: false,
        openWorldHint: true,
        readOnlyHint: true,
    },
    type: "action",
    props: {
        whoisfreaks,
        ipAddresses: {
            propDefinition: [whoisfreaks, "ipAddresses"],
            optional: false,
        },
        format: {
            propDefinition: [whoisfreaks, "format"],
        },
    },
    async run({ $ }) {
        const response = await this.whoisfreaks.bulkIpReputationLookup({
            $,
            params: {
                format: this.format,
            },
            body: {
                ips: this.ipAddresses.split(",").map((ip) => ip.trim()),
            },
        });
        $.export("$summary", `Successfully fetched bulk IP reputation data for ${this.ipAddresses.split(",").length} IP(s)`);
        return response;
    },
};