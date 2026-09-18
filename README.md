# CareConnect

CareConnect is an Expo SDK 57 and React Native application that uses Expo Router for file-based routing. Application routes are located in `src/app`, with reusable UI in `src/components` and screen implementations in `src/screens`.

## Prerequisites

- Node.js 22.13 or newer
- npm
- For Android: Android Studio with an Android Virtual Device, or a physical device with USB debugging enabled
- For iOS: macOS with Xcode and an iOS Simulator, or a physical iOS device

Expo SDK 57 targets React Native 0.86, React 19.2, Android 7 or newer, and iOS 16.4 or newer.

## Install dependencies

From the repository root, install the exact dependency versions in `package-lock.json`:

```bash
npm ci
```

Use `npm install` only when intentionally changing dependencies and updating the lockfile.

## Start the application

Start the Expo development server:

```bash
npm start
```

The Expo terminal displays shortcuts and a QR code for available targets. You can also launch a target directly:

```bash
npm run android
npm run ios
npm run web
```

- `npm run android` requires a running Android emulator or connected Android device.
- `npm run ios` requires macOS with Xcode.
- `npm run web` opens the web build in a browser.
- A development build or Expo Go may also connect to the server when compatible with the installed SDK and project dependencies.

If the Metro cache causes stale or unexpected behavior, restart with:

```bash
npx expo start --clear
```

## Test and validate changes

Run the complete local quality gate:

```bash
npm run verify
```

This runs TypeScript checking, Expo lint, and the complete Jest suite. The individual commands are:

```bash
npm run typecheck
npm run lint
npm test
```

Run only the React Native Testing Library accessibility and contrast tests with:

```bash
npm run test:a11y
```

Run tests with coverage and write the report to `coverage/`:

```bash
npm test -- --coverage
```

Validate the project configuration and Expo SDK dependency versions with:

```bash
npx expo-doctor
```

Accessibility automation does not replace device testing. Before release, complete the VoiceOver, TalkBack, keyboard, text-scaling, orientation, touch-target, and rendered-contrast checks in [ACCESSIBILITY.md](./ACCESSIBILITY.md).

## Build an Android APK with EAS

The `production` profile in `eas.json` is configured to create an installable APK rather than an Android App Bundle.

Additional prerequisites:

- An Expo account with access to the CareConnect EAS project
- EAS CLI, installed with `npm install --global eas-cli`
- Android SDK Platform-Tools (`adb`) for command-line installation

Authenticate and start the build:

```bash
eas login
eas build --platform android --profile production
```

When the build completes, use the printed build URL to download the APK. Recent Android builds can be listed with:

```bash
eas build:list --platform android --limit 5
```

## Install and test the Android APK

Start an emulator or connect a device, then confirm that ADB reports it as `device`:

```bash
adb devices
```

Install or replace the application:

```bash
adb install -r path/to/careconnect.apk
```

Launch CareConnect from the device launcher, or launch its Android package from the command line:

```bash
adb shell monkey -p com.zbristor2steam.careconnect 1
```

For a physical device, enable Developer options and USB debugging, connect it by USB, and accept the authorization prompt before running the commands above.

If an emulator is listed as `offline`, restart ADB:

```bash
adb kill-server
adb start-server
adb devices
```

Development testing through `npm run android` is separate from installing and validating the production APK.

## Production web export

Create a static web export with:

```bash
npx expo export --platform web
```

The web configuration is static, so Expo API routes are not included in this export. API routes require a server deployment configuration.

