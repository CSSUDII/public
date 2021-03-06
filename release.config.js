module.exports = {
    branches: [
        "stable",
        /**
        {
            name: "beta",
            prerelease: true,
        },
        */
        {
            name: "canary",
            prerelease: true,
        },
    ],
    plugins: [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        [
            "@semantic-release/changelog",
            {
                changelogFile: "CHANGELOG.md",
            },
        ],
        "@semantic-release/github",
        [
            "@semantic-release/git",
            {
                assets: ["CHANGELOG.md", "package.json"],
                message:
                    "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
            },
        ],
        [
            "@semantic-release-plus/docker",
            {
                name: {
                    registry: "ghcr.io",
                    namespace: "cssudii",
                    repository: "public",
                },
            },
        ],
    ],
};
