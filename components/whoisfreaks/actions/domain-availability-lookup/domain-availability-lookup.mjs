import whoisfreaks from "../../whoisfreaks.app.mjs";

export default {
  key: "whoisfreaks-domain-availability-lookup",
  name: "Domain Availability Lookup",
  description:
    "Check if a domain name is available for registration. [See the documentation](https://whoisfreaks.com/products/domain-availability-api)",
  version: "0.0.1",
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
    },
  },
  async run({ $ }) {
    const response = await this.whoisfreaks.domainAvailabilityLookup({
      $,
      params: {
        domain: this.domainName,
        format: this.format,
        sug: false,
      },
    });
    $.export("$summary", `Successfully performed domain availability lookup for ${this.domainName}`);
    return response;
  },
};
