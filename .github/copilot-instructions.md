# BookingTourApp AI Agent Instructions

## Project Overview

**BookingTourApp** is a React Native mobile app built with Expo, providing tour booking functionality. It uses TypeScript, Expo Router for navigation, NativeWind (Tailwind CSS) for styling, and includes both iOS/Android and web support.

**Key Tech Stack:**

- **Framework**: Expo 54, React Native 0.81.5, React 19
- **Routing**: Expo Router (file-based routing in `/app`)
- **Styling**: NativeWind + Tailwind CSS 3.4
- **Type Safety**: TypeScript with strict mode enabled
- **Icon Library**: @expo/vector-icons (Ionicons)
- **Navigation**: React Navigation bottom-tabs + Stack navigation

## Architecture Patterns

### 1. Navigation Structure (Expo Router)

The app uses **file-based routing** with grouped routes:

- **Root layout** (`app/_layout.tsx`): Uses Stack navigation, supports dark/light themes, wraps with SafeAreaProvider
- **Auth routes** (`app/(auth)/*`): Login screens, separate from authenticated experience
- **Tab routes** (`app/(tabs)/*`): Main app with 4 tabs—Home, Search, Notification, Profile

**Key pattern**: Create new screens as `.tsx` files in the `/app` directory. Use route groups with parentheses to organize navigation without affecting URLs.

### 2. Component Organization

- **`components/form/`**: Form components (e.g., `FormSearchTour.tsx`—search input with state management)
- **`components/ui/`**: Reusable UI primitives (collapsible, icon-symbols)
- **`components/`**: Higher-level components (parallax scroll, themed text/view, haptic feedback)

**Pattern**: Use `className` with NativeWind (Tailwind) for styling. Example from `index.tsx`:

```tsx
<View className="flex-1 bg-white">
  <Text className="text-3xl font-bold">Recently viewed</Text>
</View>
```

### 3. State Management & Hooks

- Custom hooks in `hooks/` (e.g., `use-color-scheme.ts`, `use-theme-color.ts`)
- Use `useState` for local form state (see `FormSearchTour.tsx`)
- Color scheme detection differs by platform: `.ts` for native, `.web.ts` for web

**Pattern**: Platform-specific hooks use `.ios.ts`, `.web.ts`, or `.android.ts` extensions.

### 4. Data Models

All data types are centralized in `types/index.ts`. Key models:

- **User**: Authentication data with role and avatar
- **Tour**: Main booking entity with details, pricing, and reviews
- **TourDetail**: Specific tour instances with capacity, itineraries, and dates
- **Booking**: Orders with status and payment info
- **Destination/Promotion**: Content for discovery screens

**Pattern**: Import types from `@/types` and always annotate component props.

### 5. Theming & Constants

- `constants/theme.ts`: Colors for light/dark modes, platform-specific fonts
- `Colors[colorScheme ?? "light"].tint` pattern for dynamic colors
- TailwindCSS extends default theme in `tailwind.config.js`

## Development Workflows

### Running the App

```bash
npm install                # Install dependencies
npx expo start            # Start dev server (choose platform: Android/iOS/Web)
npm run android           # Run on Android emulator/device
npm run ios              # Run on iOS simulator
npm run web              # Run web version
```

### Linting & Code Quality

```bash
npm run lint             # Runs ESLint (uses expo/flat config)
```

**Code standards**: Follows Expo ESLint config in `eslint.config.js`. All code is TypeScript with strict mode enabled.

### Project Reset (Dangerous)

```bash
npm run reset-project    # Clears app/ and creates fresh starter code
```

## Project-Specific Conventions

### 1. CSS-in-JSX with NativeWind

- **Always use `className`** for styling (React Native props don't work the same as web)
- Classes are compiled to RN StyleSheets
- Platform-specific classes work: `ios:`, `android:`, `web:`
- `tailwind.config.js` scans `./app/**/*.{js,jsx,ts,tsx}` and `./components/**/*.{js,jsx,ts,tsx}`

### 2. Imports Path Alias

```tsx
// Use @ alias for cleaner imports (configured in tsconfig.json)
import { Tour } from "@/types";
import FormSearchTour from "@/components/form/FormSearchTour";
import { Colors } from "@/constants/theme";
```

### 3. Safe Area & Layout

- **Always wrap screens** with `SafeAreaView` (see `index.tsx`)
- Use `KeyboardAvoidingView` for forms with inputs
- `useSafeAreaInsets()` hook for dynamic padding around notches/home indicators

### 4. Component Pattern Example

```tsx
// Functional component with TypeScript props, hooks, and NativeWind styling
export default function ComponentName() {
  const colorScheme = useColorScheme();
  const [state, setState] = useState<string>("");

  return (
    <View className="flex-1 bg-white items-center">
      <Text className="text-lg font-bold">{state}</Text>
    </View>
  );
}
```

### 5. Tab Navigation Configuration

New tabs are added to `app/(tabs)/_layout.tsx` using the `Tabs.Screen` component with:

- `name`: File name (without `.tsx`)
- `options.title`: Display name
- `options.tabBarIcon`: Ionicons component

## Integration Points & Dependencies

### Key External Packages

- **react-native-calendars**: For date selection (likely used in tour booking flows)
- **react-native-element-dropdown**: Dropdown UI component
- **react-native-gesture-handler**: Gesture recognition
- **expo-haptics**: Haptic feedback on interactions (see `HapticTab`)
- **expo-location**: For tour location features
- **react-native-reanimated**: Smooth animations

### Platform-Specific Code

Use file extensions to handle platform differences:

- `use-color-scheme.ts` (native iOS/Android)
- `use-color-scheme.web.ts` (web)
- `icon-symbol.ios.tsx` & `icon-symbol.tsx` (fallback)

### Expected API Integration Points

Based on data models, the app likely integrates with a backend API for:

- User authentication (login in `app/(auth)/login.tsx`)
- Tour listings and details (Tour model)
- Booking management (Booking model)
- Reviews and ratings (Review model)

**Note**: No HTTP client imported yet in explored files—watch for axios, fetch, or custom API service layer.

## File Organization Reference

```
app/                 # Expo Router screens (file-based routing)
├── (auth)/         # Auth group (hidden from URL path)
├── (tabs)/         # Main app tabs group
├── _layout.tsx     # Root layout with navigation setup
└── global.css      # Global Tailwind directives

components/        # Reusable React components
├── form/          # Form-specific components
├── ui/            # Atomic UI primitives
└── [others]       # Higher-level components

constants/         # App-wide constants (theme colors, configs)
hooks/            # Custom React hooks
types/            # TypeScript interfaces and types
assets/           # Images, icons, static media
```

## Quick Win Patterns for Contributors

1. **Add a new screen**: Create `/app/(tabs)/newscreen.tsx`, add `Tabs.Screen` to `_layout.tsx`
2. **Style a component**: Use `className` with Tailwind classes (no StyleSheet)
3. **Add a type**: Export from `types/index.ts` and import with `@/types`
4. **Handle dark mode**: Grab `useColorScheme()` and apply `Colors[colorScheme ?? "light"]`
5. **Safe area**: Wrap layout with `<SafeAreaView>` and use `useSafeAreaInsets()`

## Common Gotchas

- ❌ Don't use CSS `style` prop directly; NativeWind compiles `className` to RN StyleSheets
- ❌ Don't import React Native components without checking if they work in web
- ❌ Don't forget to configure `tailwind.config.js` if adding new component directories
- ❌ Strict TypeScript mode is enabled—always annotate prop types
- ✅ Use platform-specific hooks for device-specific logic (`.ios.ts`, `.web.ts` files)

---

_Last updated: December 2025 | Analyzed from package.json, tsconfig.json, and core navigation/component structure_
