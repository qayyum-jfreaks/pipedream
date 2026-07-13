import { axios } from "@pipedream/platform";

export default {
  type: "app",
  app: "whoisfreaks",
  propDefinitions: {
    domainName: {
      type: "string",
      label: "Domain Name",
      description: "The domain name to lookup",
    },
    domainNames: {
      type: "string",
      label: "Domain Names",
      description: "Enter domain names separated by commas (e.g. example.com,google.com). Supports up to 100 domains per request.",
    },
    ipAddresses: {
      type: "string",
      label: "IP Addresses",
      description: "Enter IP addresses separated by commas (e.g. 8.8.8.8,1.1.1.1). Supports IPv4 and IPv6. Up to 100 IPs per request.",
      optional: true,
    },
    ip: {
      type: "string",
      label: "IP Address",
      description: "The IP address to look up. Supports both IPv4 (e.g. 8.8.8.8) and IPv6 (e.g. 2001:4860:4860::8888).",
    },
    format: {
      type: "string",
      label: "Format",
      description:
        "Two formats are available JSON, XML. If you don't specify the 'format' parameter, the default format will be JSON.",
      options: ["JSON", "XML"],
      optional: true,
    },
  },
  methods: {
    _baseUrl() {
      return "https://api.whoisfreaks.com";
    },
    _makeRequest({ $ = this, path, params, ...opts }) {
      return axios($, {
        url: `${this._baseUrl()}${path}`,
        params: {
          ...params,
          apiKey: this.$auth.api_key,
        },
        ...opts,
      });
    },
    _makePostRequest({ $ = this, path, params, body, ...opts }) {
      return axios($, {
        url: `${this._baseUrl()}${path}`,
        method: "POST",
        data: body,
        params: {
          ...params,
          apiKey: this.$auth.api_key,
        },
        ...opts,
      });
    },
    domainLookup(opts = {}) {
      return this._makeRequest({
        path: "/v1.0/whois",
        ...opts,
      });
    },
    ipLookup(opts = {}) {
      return this._makeRequest({
        path: "/v1.0/ip-whois",
        ...opts,
      });
    },
    domainAvailabilityLookup(opts = {}) {
      return this._makeRequest({
        path: "/v1.0/domain/availability",
        ...opts,
      });
    },
    sslLookup(opts = {}) {
      return this._makeRequest({
        path: "/v1.0/ssl/live",
        ...opts,
      });
    },
    ipGeolocationLookup(opts = {}) {
      return this._makeRequest({
        path: "/v1.0/geolocation",
        ...opts,
      });
    },
    subDomainLookup(opts = {}) {
      return this._makeRequest({
        path: "/v1.0/subdomains",
        ...opts,
      });
    },
    domainSecurityLookup(opts = {}) {
      return this._makeRequest({
        path: "/v1/domain/security",
        ...opts,
      });
    },
    ipReputationLookup(opts = {}) {
      return this._makeRequest({
        path: "/v1.0/security",
        ...opts,
      });
    },
    bulkWhoisLookup(opts = {}) {
      return this._makePostRequest({
        path: "/v2.0/bulkwhois/live",
        ...opts
      });
    },
    bulkDnsDomainLookup(opts = {}) {
      return this._makePostRequest({
        path: "/v2.0/dns/bulk/live",
        ...opts
      });
    },
    bulkIpGeolocationLookup(opts = {}) {
      return this._makePostRequest({
        path: "/v1.0/geolocation",
        ...opts
      });
    },
    bulkIpReputationLookup(opts = {}) {
      return this._makePostRequest({
        path: "/v1.0/security",
        ...opts
      });
    },
  },
};
