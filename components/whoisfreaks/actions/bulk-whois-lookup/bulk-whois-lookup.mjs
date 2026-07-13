import whoisfreaks from "../../whoisfreaks.app.mjs";

export default {
    key: "whoisfreaks-bulk-whois-lookup",
    name: "Bulk Whois Lookup",
    description: "Retrieve WHOIS registration data (registrant, registrar, name servers, email, phone, address, ASN, history) for up to 100 domains in a single request. Accepts comma-separated domain names across 1000+ TLDs; returns JSON or XML output. Use this action for bulk domain research, lead enrichment, or portfolio audits. [See the documentation](https://whoisfreaks.com/documentation/bulk-whois-api",
    version: "0.0.4",
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
        },
        format: {
            propDefinition: [whoisfreaks, "format"],
        },
    },
    async run({ $ }) {
        const response = await this.whoisfreaks.bulkWhoisLookup({
            $,
            params: {
                format: this.format,
            },
            body: {
                domainNames: this.domainNames.split(",").map((domain) => domain.trim()),
            },
        });
        $.export("$summary", `Successfully fetched bulk WHOIS data for ${this.domainNames.split(",").length} domain(s)`);
        return response;
    },
};