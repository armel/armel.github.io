#!/usr/bin/env bash

set -euo pipefail

REPOSITORY="armel/armel.github.io"
RELEASE_BRANCH="master"
DRY_RUN=false

usage() {
    cat <<'EOF'
Usage: scripts/release-uvstudio.sh [--dry-run]

Build and publish the UV Studio version declared in
uvstudio/js/studio-version.js.

Options:
  --dry-run  Run tests and build the release archive without creating a tag
             or publishing a GitHub release. This mode may run from any branch.
  -h, --help Show this help.
EOF
}

fail() {
    printf 'Error: %s\n' "$*" >&2
    exit 1
}

while (($#)); do
    case "$1" in
        --dry-run)
            DRY_RUN=true
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        *)
            fail "Unknown argument: $1"
            ;;
    esac
    shift
done

for command in git node gh; do
    command -v "$command" >/dev/null 2>&1 ||
        fail "Required command not found: $command"
done

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(git -C "$SCRIPT_DIR" rev-parse --show-toplevel 2>/dev/null)" ||
    fail "The script must be located inside a Git repository."
cd "$REPO_ROOT"

CURRENT_BRANCH="$(git branch --show-current)"
COMMIT="$(git rev-parse HEAD)"
SHORT_COMMIT="$(git rev-parse --short HEAD)"
STATUS="$(git status --porcelain)"

if [[ "$DRY_RUN" == false ]]; then
    [[ "$CURRENT_BRANCH" == "$RELEASE_BRANCH" ]] ||
        fail "Releases must be published from ${RELEASE_BRANCH}; current branch is ${CURRENT_BRANCH:-detached HEAD}."
    [[ -z "$STATUS" ]] ||
        fail "The working tree must be clean before publishing a release."

    printf 'Refreshing origin/%s...\n' "$RELEASE_BRANCH"
    git fetch origin "$RELEASE_BRANCH"

    [[ "$COMMIT" == "$(git rev-parse "origin/${RELEASE_BRANCH}")" ]] ||
        fail "Local ${RELEASE_BRANCH} must exactly match origin/${RELEASE_BRANCH}."

    gh auth status --hostname github.com >/dev/null
elif [[ "$CURRENT_BRANCH" != "$RELEASE_BRANCH" ]]; then
    printf 'Dry run: testing %s instead of %s.\n' \
        "${CURRENT_BRANCH:-detached HEAD}" "$RELEASE_BRANCH"
fi

if [[ "$DRY_RUN" == true && -n "$STATUS" ]]; then
    printf 'Dry run: uncommitted files are ignored by the Git archive.\n'
fi

VERSION="$(
    sed -n 's/.*UVSTUDIO_VERSION = "\([^"]*\)".*/\1/p' \
        uvstudio/js/studio-version.js
)"

[[ -n "$VERSION" ]] ||
    fail "Unable to read UVSTUDIO_VERSION from uvstudio/js/studio-version.js."
[[ "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+([.-][0-9A-Za-z.-]+)?$ ]] ||
    fail "Invalid UV Studio version: $VERSION"

TAG="uvstudio-v${VERSION}"
ARCHIVE_NAME="${TAG}.zip"
CHECKSUM_NAME="${ARCHIVE_NAME}.sha256"

REMOTE_TAG_EXISTS=false
REMOTE_TAG_SHA=""
RELEASE_EXISTS=false
if [[ "$DRY_RUN" == false ]]; then
    REMOTE_TAG_SHA="$(
        git ls-remote --refs --tags origin "refs/tags/${TAG}" |
            awk 'NR == 1 { print $1 }'
    )"
    if [[ -n "$REMOTE_TAG_SHA" ]]; then
        REMOTE_TAG_EXISTS=true
    fi
    if gh release view "$TAG" --repo "$REPOSITORY" >/dev/null 2>&1; then
        RELEASE_EXISTS=true
    fi
    if [[ "$REMOTE_TAG_EXISTS" == true || "$RELEASE_EXISTS" == true ]]; then
        printf 'Existing %s tag or release will be replaced after confirmation.\n' "$TAG"
    fi
fi

printf 'Running UV Studio tests...\n'
node --test uvstudio/tests/*.test.js

RELEASE_DIR="$(mktemp -d)"
ARCHIVE_PATH="${RELEASE_DIR}/${ARCHIVE_NAME}"
CHECKSUM_PATH="${RELEASE_DIR}/${CHECKSUM_NAME}"
NOTES_PATH="${RELEASE_DIR}/release-notes.md"

printf 'Building %s from commit %s...\n' "$ARCHIVE_NAME" "$SHORT_COMMIT"
git archive \
    --format=zip \
    --prefix="${TAG}/" \
    --output="$ARCHIVE_PATH" \
    "${COMMIT}:uvstudio"

if command -v shasum >/dev/null 2>&1; then
    (
        cd "$RELEASE_DIR"
        shasum -a 256 "$ARCHIVE_NAME" >"$CHECKSUM_NAME"
    )
elif command -v sha256sum >/dev/null 2>&1; then
    (
        cd "$RELEASE_DIR"
        sha256sum "$ARCHIVE_NAME" >"$CHECKSUM_NAME"
    )
else
    fail "Neither shasum nor sha256sum is available."
fi

PREVIOUS_TAG="$(
    git tag --list 'uvstudio-v*' --sort=-version:refname |
        grep -Fvx "$TAG" |
        head -n 1 ||
        true
)"

{
    printf '## Changes\n\n'
    if [[ -n "$PREVIOUS_TAG" ]]; then
        git log \
            --format='- %s (%h)' \
            "${PREVIOUS_TAG}..${COMMIT}" \
            -- uvstudio
    else
        printf '%s\n' '- Initial UV Studio release.'
    fi
    printf '\n## Installation\n\n'
    printf '1. Download `%s`.\n' "$ARCHIVE_NAME"
    printf '%s\n' '2. Extract the archive.'
    printf '%s\n' '3. Open `index.html` using Chrome/Edge/Opera or Firefox 151+ !'
} >"$NOTES_PATH"

printf '\nRelease candidate ready:\n'
printf '  Version:  %s\n' "$VERSION"
printf '  Tag:      %s\n' "$TAG"
printf '  Commit:   %s\n' "$COMMIT"
printf '  Archive:  %s\n' "$ARCHIVE_PATH"
printf '  Checksum: %s\n' "$CHECKSUM_PATH"

if [[ "$DRY_RUN" == true ]]; then
    printf '\nDry run complete: no tag or GitHub release was created.\n'
    exit 0
fi

if [[ "$REMOTE_TAG_EXISTS" == true || "$RELEASE_EXISTS" == true ]]; then
    printf '\nReplace UV Studio v%s on GitHub? [y/N] ' "$VERSION"
else
    printf '\nPublish UV Studio v%s on GitHub? [y/N] ' "$VERSION"
fi
read -r CONFIRMATION
case "$CONFIRMATION" in
    y|Y|yes|YES)
        ;;
    *)
        printf 'Release cancelled. Candidate files remain in %s\n' "$RELEASE_DIR"
        exit 0
        ;;
esac

if [[ "$REMOTE_TAG_EXISTS" == true || "$RELEASE_EXISTS" == true ]]; then
    git tag --force "$TAG" "$COMMIT"
    if [[ "$REMOTE_TAG_EXISTS" == true ]]; then
        git push \
            --force-with-lease="refs/tags/${TAG}:${REMOTE_TAG_SHA}" \
            origin "refs/tags/${TAG}"
    else
        git push origin "refs/tags/${TAG}"
    fi
fi

if [[ "$RELEASE_EXISTS" == true ]]; then
    gh release upload "$TAG" \
        "${ARCHIVE_PATH}#UV Studio v${VERSION}" \
        "${CHECKSUM_PATH}#SHA-256 checksum" \
        --repo "$REPOSITORY" \
        --clobber
    gh release edit "$TAG" \
        --repo "$REPOSITORY" \
        --target "$COMMIT" \
        --title "UV Studio v${VERSION}" \
        --notes-file "$NOTES_PATH" \
        --latest
else
    gh release create "$TAG" \
        "${ARCHIVE_PATH}#UV Studio v${VERSION}" \
        "${CHECKSUM_PATH}#SHA-256 checksum" \
        --repo "$REPOSITORY" \
        --target "$COMMIT" \
        --title "UV Studio v${VERSION}" \
        --notes-file "$NOTES_PATH" \
        --latest
fi

git fetch origin tag "$TAG"

printf '\nPublished: https://github.com/%s/releases/tag/%s\n' \
    "$REPOSITORY" "$TAG"
