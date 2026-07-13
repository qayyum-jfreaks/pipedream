import whoisfreaks from "../../whoisfreaks.app.mjs";

export default {
  key: "whoisfreaks-ssl-lookup",
  name: "SSL Lookup",
  description:
    "Retrieve details about a domain's SSL certificate. [See the documentation](https://whoisfreaks.com/documentation/ssl-certificate-api)",
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
    },
  },
  async run({ $ }) {
    const response = await this.whoisfreaks.sslLookup({
      $,
      params: {
        domainName: this.domainName,
        format: this.format,
        chain: true,
        sslRaw: false,
      },
    });
    $.export(
      "$summary",
      `Successfully performed SSL lookup for ${this.domainName}`,
    );
    return response;
  },
};
