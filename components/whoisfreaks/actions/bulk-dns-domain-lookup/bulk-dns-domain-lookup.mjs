import whoisfreaks from "../../whoisfreaks.app.mjs";

export default {
    key: "whoisfreaks-bulk-dns-domain-lookup",
    name: "Bulk DNS Domain Lookup",
    description: "",
    version: "0.0.5",
    annotations: {
        destructiveHint: false,
        openWorldHint: true,
        readOnlyHint: true,
    },
    type: "action",
    props: {
        whoisfreaks,
        domainNames: {
            type: "string",
            label: "Domain Names",
            description: "Enter domain names separated by commas",
            optional: false,
        },
        ipAddresses: {
            type: "string",
            label: "IP Addresses",
            description: "Enter IP addresses separated by commas",
            optional: true,
        },
        format: {
            propDefinition: [whoisfreaks, "format"],
        },
    },
    async run({ $ }) {
        const response = await this.whoisfreaks.bulkDnsDomainLookup({
            $,
            params: {
                format: this.format,
                type: "all"
            },
            body: {
                domainNames: this.domainNames.split(",").map((domain) => domain.trim()),
                ipAddresses: this.ipAddresses.split(",").map((ip) => ip.trim()),
            }
        });
        console.log("Successfully fetched the bulk dns domain data: ", response)
        return response;
    },
};