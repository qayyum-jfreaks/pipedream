import whoisfreaks from "../../whoisfreaks.app.mjs";

export default {
    key: "whoisfreaks-bulk-whois-lookup",
    name: "Bulk Whois Lookup",
    description: "The WhoisFreaks Bulk Lookup API retrieves bulk domain registration data in JSON, CSV or XML formats. Upload a file or use a URL, and instantly get a structured list of domain details including registrant, registrar, IP, ASN, name servers, email, phone, address, and historical records. Supports 100 domains per query with 1000+ TLDs. Free tier: 500 requests.",
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
            type: "string",
            label: "Domain Names",
            description: "Enter domain names separated by commas",
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
            }
        });
        console.log("Successfully fetched the bulk whois data: ", response)
        return response;
    },
};