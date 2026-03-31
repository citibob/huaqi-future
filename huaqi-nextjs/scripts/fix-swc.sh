#!/bin/bash
# If you see "SWC binary signature error" on macOS, run this script to re-sign the binary.
# Note: Moving the project to your local system drive (e.g., /Users/yourname/) is recommended.

echo "Attempting to re-sign Next.js SWC binary..."
codesign -f -s - node_modules/@next/swc-darwin-arm64/next-swc.darwin-arm64.node
echo "Done."
