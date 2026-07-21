import whoisfreaks from "../../whoisfreaks.app.mjs";

export default {
    key: "whoisfreaks-bulk-dns-domain-lookup",
    name: "Bulk DNS Domain Lookup",
    description: "Retrieve DNS records (A, AAAA, MX, NS, CNAME, TXT, PTR, SPF, DKIM, DMARC, SRV, SOA) for up to 100 domains or IP addresses in a single request. Use this action for bulk DNS auditing, infrastructure mapping, or automated monitoring. Accepts comma-separated domain names and optional IP addresses; returns JSON or XML output. [See the documentation](https://whoisfreaks.com/documentation/dns-checker-api#bulk-domain-lookup)",
    version: "0.0.1",
    annotations: {
        destructiveHint: false,
        openWorldHint: true,
        readOnlyHint: true,
    },
    type: "action",
    props: {
        whoisfreaks,
        domainNames: {
            propDefinition: [whoisfreaks, "domainNames"],
            optional: false,
        },
        ipAddresses: {
            propDefinition: [whoisfreaks, "ipAddresses"],
        },
        format: {
            propDefinition: [whoisfreaks, "format"],
        },
    },
    async run({ $ }) {
        const domainNames = this.whoisfreaks._parseArray(this.domainNames);
        const ipAddresses = this.ipAddresses
            ? this.whoisfreaks._parseArray(this.ipAddresses)
            : undefined;

        const response = await this.whoisfreaks.bulkDnsDomainLookup({
            $,
            params: {
                format: this.format,
                type: "all",
            },
            body: {
                domainNames,
                ipAddresses,
            },
        });
        $.export("$summary", `Successfully fetched bulk DNS data for ${domainNames.length} domain(s)`);
        return response;
    },
};