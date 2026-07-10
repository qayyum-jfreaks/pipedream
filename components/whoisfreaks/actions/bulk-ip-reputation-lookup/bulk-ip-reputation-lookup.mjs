import whoisfreaks from "../../whoisfreaks.app.mjs";

export default {
    key: "whoisfreaks-bulk-ip-reputation-lookup",
    name: "Bulk IP Reputation Lookup",
    description: "The WhoisFreaks Bulk IP Reputation API retrieves bulk IP reputation data in JSON, CSV or XML formats. Upload a file or use a URL, and instantly get a structured list of IP details including reputation score, blacklist status, and historical records. Supports 100 IPs per query. Free tier: 500 requests.",
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
            type: "string",
            label: "IP Addresses",
            description: "Enter IP addresses separated by commas",
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
            }
        });
        console.log("Successfully fetched the bulk IP reputation data: ", response)
        return response;
    },
};