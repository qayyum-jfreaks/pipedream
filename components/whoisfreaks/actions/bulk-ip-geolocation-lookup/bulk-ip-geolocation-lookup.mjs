import whoisfreaks from "../../whoisfreaks.app.mjs";

export default {
    key: "whoisfreaks-bulk-ip-geolocation-lookup",
    name: "Bulk IP Geolocation Lookup",
    description: "Retrieve geolocation details (country, city, ASN, ISP, coordinates) for up to 100 IP addresses in a single request. Accepts comma-separated IPv4 or IPv6 addresses and returns JSON or XML output. Use this action for bulk network analysis, fraud detection, or audience geo-enrichment. [See the documentation](https://whoisfreaks.com/products/bulk-ip-geolocation-api)",
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
        const response = await this.whoisfreaks.bulkIpGeolocationLookup({
            $,
            params: {
                format: this.format,
            },
            body: {
                ips: this.ipAddresses.split(",").map((ip) => ip.trim()),
            },
        });
        $.export("$summary", `Successfully fetched bulk IP geolocation data for ${this.ipAddresses.split(",").length} IP(s)`);
        return response;
    },
};