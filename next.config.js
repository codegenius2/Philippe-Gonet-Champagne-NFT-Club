/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Pour éviter les erreurs avec les modules non utilisés côté serveur
    if (!isServer) {
      config.resolve.fallback = { fs: false, net: false, tls: false };
    }

    // Ajout de la règle de loader pour les fichiers .txt
    config.module.rules.push({
      test: /\.mp4$/, // Applique ce loader aux fichiers .txt
      use: [
        {
          loader: "raw-loader",
          options: {
            esModule: false, // Cette option peut être nécessaire selon la version de raw-loader
          },
        },
      ],
    });

    return config; // Toujours retourner la configuration
  },
};

module.exports = nextConfig;
