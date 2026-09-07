# Production Workflow & Hardcoded Data Guide

## Current Architecture (Frontend Only)

```
ghummi-app/
├── src/
│   ├── data/          ← All hardcoded data lives here
│   ├── screens/       ← UI screens (static, no API calls)
│   ├── components/    ← Reusable UI components
│   ├── theme/         ← Colors, typography, spacing
│   ├── navigation/    ← React Navigation routes
│   └── utils/         ← Haptics, helpers
```

Everything runs client-side. No API calls, no auth, no database.

---

## When Backend + Database Are Added

### 1. Data Layer Replacement

**Currently hardcoded → becomes API-driven:**

| File | What's hardcoded | Production replacement |
|------|-----------------|----------------------|
| `data/listings.ts` | 12 property listings with names, prices, images, ratings | `GET /api/listings` — fetch from database |
| `SavedScreen.tsx` | `SAVED_IDS = ['oasis', 'coastal', 'mountain', 'tiny']` | `GET /api/user/saved` — fetch from user's saved list |
| `TripsScreen.tsx` | 3 hardcoded trips with dates, budgets | `GET /api/user/trips` — fetch from database |
| `ProfileScreen.tsx` | `PROFILE = { name: 'Sarah Chen', ... }` | `GET /api/user/me` — fetch from auth |
| `IntroScreen.tsx` | `SERVICES` array, `EXPLORE_CARDS`, `FEATURED` array | `GET /api/services`, `GET /api/featured` |
| `MapScreen.tsx` | 12 hardcoded pins with coordinates | `GET /api/listings/nearby?lat=X&lng=Y` |
| `PropertyDetailsScreen.tsx` | Single listing passed via navigation params | `GET /api/listings/:id` |

**These stay hardcoded (no change needed):**
- `data/listings.ts` types (`Listing`, `PropertyType`, `Price`) — keep as TypeScript interfaces
- Service categories structure — keep the shape, populate from API
- Image URL patterns — keep Unsplash as fallback/placeholder

### 2. Authentication Flow

**New screens needed:**
- `LoginScreen` — email/password + social OAuth
- `SignUpScreen` — registration flow
- `ForgotPasswordScreen` — password reset
- `OnboardingScreen` — first-time user preferences

**Current behavior to change:**
- Profile button → redirect to login if not authenticated
- Save/heart → require auth, queue action if offline
- Reserve → require auth + payment method
- "Coming soon" toasts → replace with actual features

**Auth state management:**
```typescript
// New context needed
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
```

### 3. API Integration Points

**Screens that need API calls:**

| Screen | API Calls Needed |
|--------|-----------------|
| IntroScreen | `GET /api/listings/featured`, `GET /api/services` |
| V1GalleryScreen | `GET /api/listings?page=X&limit=20` |
| V2ScanSaveScreen | `GET /api/listings?type=X`, `POST /api/user/save/:id` |
| V3ImageLedScreen | `GET /api/listings/compare?ids=X,Y,Z` |
| PropertyDetailsScreen | `GET /api/listings/:id`, `POST /api/user/save/:id`, `POST /api/user/reserve` |
| SavedScreen | `GET /api/user/saved`, `DELETE /api/user/save/:id` |
| TripsScreen | `GET /api/user/trips`, `GET /api/user/trips/past` |
| ProfileScreen | `GET /api/user/me`, `PUT /api/user/me`, `POST /api/auth/logout` |
| MapScreen | `GET /api/listings/nearby?bounds=X` |
| AIGenerationScreen | `POST /api/ai/generate-trip` (SSE/streaming) |

### 4. State Management

**Current: React useState per screen → becomes global state**

Recommended: Zustand or React Context + useReducer

```typescript
// Store structure
{
  auth: { user, token, isLoading },
  listings: { items, filters, pagination },
  saved: { ids, items },
  trips: { upcoming, past },
  ui: { isOnline, theme, toast }
}
```

### 5. Navigation Changes

**Current stack navigator → add auth flow:**

```typescript
type RootStackParamList = {
  // Auth flow (shown when not logged in)
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  
  // Main app (shown when logged in)
  MainTabs: undefined;
  
  // Modals
  PropertyDetails: { listingId: string };
  Reservation: { listingId: string };
  Payment: { tripId: string };
};
```

### 6. New Features to Build

**Priority 1 (MVP):**
- [ ] User registration & login
- [ ] Property search with filters
- [ ] Save/unsave properties
- [ ] Basic reservation flow
- [ ] Push notifications

**Priority 2 (Growth):**
- [ ] AI trip generation (connect to backend)
- [ ] Reviews & ratings
- [ ] Messaging with hosts
- [ ] Payment integration (Stripe)
- [ ] Multi-currency support

**Priority 3 (Scale):**
- [ ] Real-time availability
- [ ] Dynamic pricing
- [ ] Loyalty program
- [ ] Social features (share trips)
- [ ] Offline support (cached data)

---

## Hardcoded Data — What Stays, What Changes

### STAYS HARDCODED (No production change needed)

| Item | Location | Reason |
|------|----------|--------|
| Color palette | `theme/colors.ts` | Design tokens, not data |
| Typography scale | `theme/colors.ts` | Design system |
| Spacing/Radius values | `theme/colors.ts` | Design system |
| Icon definitions | `components/Icon.tsx` | UI components |
| Navigation structure | `navigation/AppNavigator.tsx` | App architecture |
| Screen layouts | All screen files | UI design |
| Component variants | All component files | UI components |
| Haptic feedback patterns | `utils/haptics.ts` | UX enhancement |
| Service categories | `IntroScreen.tsx` SERVICES | Keep as fallback/defaults |
| Error messages | Various screens | Static copy |
| Empty state illustrations | `EmptyState.tsx` | UI assets |

### CHANGES TO API (Remove hardcoded, fetch from database)

| Item | Current Location | Production Change |
|------|-----------------|-------------------|
| Listing data | `data/listings.ts` | `GET /api/listings` |
| User profile | `ProfileScreen.tsx` | `GET /api/user/me` |
| Saved properties | `SavedScreen.tsx` | `GET /api/user/saved` |
| Trip history | `TripsScreen.tsx` | `GET /api/user/trips` |
| Property images | `listings.ts` IMAGES | Store in cloud storage (S3/R2) |
| Map coordinates | `MapScreen.tsx` pins | `GET /api/listings/nearby` |
| Search results | Various screens | `GET /api/search?q=X` |
| Pricing data | Listing objects | `GET /api/listings/:id/pricing` |
| Reviews | Not yet built | `GET /api/listings/:id/reviews` |
| Host info | Not yet built | `GET /api/hosts/:id` |

---

## API Endpoints Reference

### Auth
```
POST   /api/auth/register     — Create account
POST   /api/auth/login        — Login
POST   /api/auth/logout       — Logout
POST   /api/auth/forgot       — Password reset email
POST   /api/auth/verify       — Email verification
GET    /api/auth/me            — Current user
```

### Listings
```
GET    /api/listings           — List all (with filters)
GET    /api/listings/:id       — Single listing detail
GET    /api/listings/featured  — Featured listings
GET    /api/listings/nearby    — Geo-based search
GET    /api/listings/search    — Text search
POST   /api/listings           — Create (admin only)
PUT    /api/listings/:id       — Update (admin only)
DELETE /api/listings/:id       — Delete (admin only)
```

### User
```
GET    /api/user/me            — Profile
PUT    /api/user/me            — Update profile
POST   /api/user/avatar        — Upload avatar
GET    /api/user/saved         — Saved listings
POST   /api/user/save/:id      — Save listing
DELETE /api/user/save/:id      — Unsave listing
GET    /api/user/trips         — Upcoming trips
GET    /api/user/trips/past    — Past trips
POST   /api/user/reserve       — Create reservation
DELETE /api/user/reserve/:id   — Cancel reservation
```

### AI
```
POST   /api/ai/generate-trip   — Generate itinerary (SSE)
GET    /api/ai/trips/:id       — Get generated trip
PUT    /api/ai/trips/:id       — Update trip
```

---

## Environment Variables Needed

```env
# API
API_URL=https://api.ghummi.com
API_VERSION=v1

# Auth
AUTH_SECRET=your-secret-key
JWT_EXPIRY=7d

# Database
DATABASE_URL=postgresql://...

# Storage (images)
AWS_S3_BUCKET=ghummi-images
AWS_REGION=us-east-1

# Maps
GOOGLE_MAPS_API_KEY=AIza...

# Payments
STRIPE_SECRET_KEY=sk_...

# AI
OPENAI_API_KEY=sk-...

# Push Notifications
EXPO_ACCESS_TOKEN=...
```

---

## Migration Checklist

When adding backend:

- [ ] Set up API server (Node.js/Express or Next.js API routes)
- [ ] Set up database (PostgreSQL + Prisma/Drizzle)
- [ ] Set up auth (JWT + refresh tokens)
- [ ] Set up image storage (S3/Cloudflare R2)
- [ ] Create API endpoints for listings
- [ ] Create API endpoints for users
- [ ] Create API endpoints for saved/trips
- [ ] Add API client (axios/fetch wrapper)
- [ ] Add loading states to all screens
- [ ] Add error handling to all screens
- [ ] Add pull-to-refresh data fetching
- [ ] Replace hardcoded data with API calls
- [ ] Add offline support (cached data)
- [ ] Add push notifications
- [ ] Set up analytics (Mixpanel/PostHog)
- [ ] Set up error tracking (Sentry)
- [ ] Set up CI/CD pipeline
- [ ] Test on real devices
- [ ] Submit to App Store / Play Store
