# How to Add Custom App Icons

This guide explains how to replace the default React Native app icons with your custom Zomato Delivery icon.

## Prerequisites
-   An icon image (1024x1024 PNG). *We have generated one for you in the artifacts folder: `zomato_delivery_icon.png`.*
-   A generator tool (recommended) or manual resizing.

## Option 1: Automated (Recommended)

1.  **Install a generator tool**:
    ```bash
    npm install -g app-icon
    ```

2.  **Place your icon**:
    -   Save your 1024x1024 icon as `icon.png` in the `apps/zomato-delivery-partner` folder.

3.  **Generate**:
    Run inside `apps/zomato-delivery-partner`:
    ```bash
    app-icon generate
    ```
    This automatically creates all required sizes for iOS and Android.

## Option 2: Manual Replacement

### Android
Replace the `ic_launcher.png` and `ic_launcher_round.png` files in the following directories with your resized icons:

-   `android/app/src/main/res/mipmap-mdpi/` (48x48)
-   `android/app/src/main/res/mipmap-hdpi/` (72x72)
-   `android/app/src/main/res/mipmap-xhdpi/` (96x96)
-   `android/app/src/main/res/mipmap-xxhdpi/` (144x144)
-   `android/app/src/main/res/mipmap-xxxhdpi/` (192x192)

### iOS
1.  Open `ios/ZomatoDeliveryPartner.xcworkspace` in Xcode.
2.  Navigate to `ZomatoDeliveryPartner` > `Images.xcassets` > `AppIcon`.
3.  Drag and drop your generated icon files into the matching slots (20pt, 29pt, 40pt, 60pt, 1024pt, etc.).

## Verification
1.  Rebuild the app:
    ```bash
    npm run android -- --reset-cache
    npm run ios -- --reset-cache
    ```
2.  Check the app icon on the simulator/emulator home screen.
