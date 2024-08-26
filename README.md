# Video Bulk Converter with FFmpeg

## Overview

This TypeScript project leverages FFmpeg to bulk convert video files based on a JSON configuration file. The tool reads a list of resolutions for each video file, creates folders named after these resolutions, and converts the videos to WebM format. It also crops the videos to match the specified resolutions. This utility is particularly useful for optimizing videos on a website that requires responsive video handling.

## Features

- **Batch Processing**: Convert multiple video files in one go.
- **Resolution-Based Folders**: Create folders for each resolution and save converted videos accordingly.
- **WebM Conversion**: Convert videos to WebM format for web optimization.
- **Video Cropping**: Crop videos to specified resolutions to fit responsive design requirements.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **FFmpeg**: FFmpeg must be installed on your system.

## Configuration

You need to pass JSON file as an argument with such data type:

```json
[
    {'path/to/file1.mp4', 'resolutions': [[1920, 1080], [1000, 100]]},
    {'path/to/file2.mp4', 'resolutions': [[1920, 1080], [1000, 100]]},
    {'path/to/file3.mp4', 'resolutions': [[1920, 1080], [1000, 100]]}
]
```
