/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
        // サーバーサイドの場合はpolyfillを無視する
        if (!isServer) {
            config.resolve.fallback = {
                stream: require.resolve("stream-browserify"),
                crypto: require.resolve("crypto-browserify"),
                buffer: require.resolve("buffer"),
                util: require.resolve("util"),
                assert: require.resolve("assert"),
                fs: false,
                tls: false,
                net: false,
            };
        }

        return config;
    },
};

module.exports = nextConfig;
