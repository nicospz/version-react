#!/bin/bash

COMMIT_SHA_SHORT="$1"
R2_BUCKET="$2"

echo "Commit SHA: $COMMIT_SHA_SHORT" 1>&2
echo "R2 Bucket: $R2_BUCKET" 1>&2

# Define the build directory and target R2 bucket
BUILD_DIR="./build"

# Check if commit SHA is provided
if [ -z "$COMMIT_SHA_SHORT" ]; then
  echo "Commit SHA is not provided. Exiting."
  exit 1
fi

# Check if rclone is installed
if ! command -v rclone &> /dev/null; then
  echo "rclone is not installed. Exiting."
  exit 1
fi

# Upload the build directory to the R2 bucket with rclone
rclone sync "$BUILD_DIR" "$R2_BUCKET:$COMMIT_SHA_SHORT" --progress

echo "Upload complete."
