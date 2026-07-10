import whoisfreaks from "../../whoisfreaks.app.mjs";

export default {
  key: "whoisfreaks-sub-domain-lookup",
  name: "Subdomain Lookup",
  description:
    "The WhoisFreaks Subdomain Finder API gives you passive access to 6.3B+ indexed hostnames. Use it as a subdomain scanner, subdomain checker, or enumeration tool - returning active, inactive, and historical records in seconds. 500 free credits to start.",
  version: "0.0.4",
  annotations: {
    destructiveHint: false,
    readOnlyHint: true,
    openWorldHint: true,
  },
  type: "action",
  props: {
    whoisfreaks,
    domainName: {
      propDefinition: [whoisfreaks, "domainName"],
    },
    format: {
      propDefinition: [whoisfreaks, "format"],
    },
  },
  async run({ $ }) {
    const response = await this.whoisfreaks.subDomainLookup({
      $,
      params: {
        domain: this.domainName,
        format: this.format,
        page: 1,
      },
    });
    console.log("Successfully fetched the subdomain data: ", response)
    return response;
  },
};
