module.exports = {
  name: "example-react-app",
  designsource: {
    provider: "figma",
    url: "https://figma.com/files/xxx",
    authentication: {
      personalAccessToken: process.env["FIGMA_PERSONAL_ACCESS_TOKEN"],
    },
  },
  plugins: [],
  async rewrites() {
    return [
      {
        source: "Components",
        destination: "components",
      },
    ];
  },
  experimental: {
    urlImports: true,
  },
};
