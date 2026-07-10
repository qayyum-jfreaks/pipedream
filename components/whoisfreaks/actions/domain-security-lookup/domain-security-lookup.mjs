import whoisfreaks from "../../whoisfreaks.app.mjs";

export default {
    key: "whoisfreaks-domain-security-lookup",
    name: "Domain Security Lookup",
    description: "It's for domain security like if a domain is being used in any sort of malware or phishing campaign.",
    version: "0.0.4",
    annotations: {
        destructiveHint: false,
        openWorldHint: true,
        readOnlyHint: true,
    },
    type: "action",
    props: {
        whoisfreaks,
        domainName: {
            propDefinition: [whoisfreaks, "domainName"],
        },
        format: {
            propDefinition: [whoisfreaks, "format"],
        }
    },
    async run({ $ }) {
        const response = await this.whoisfreaks.domainSecurityLookup({
            $,
            params: {
                domainName: this.domainName,
                format: this.format,
            },
        });
        console.log("Successfully fetched the domain security data: ", response)
        return response;
    },
};
