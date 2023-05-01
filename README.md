
# **What does Ravely offer?**
Ravely simply solves a problem when u and your friends or partner, etc...
wants to watch a movie or series together remotely, you hop on a call and hope both of you start the video at the same time it's such a pain to sync the video between the two parties, so that's what ravely solves not only sync the video but also real-time communication with audio chat to replicate the cinema experience with Ravely Party Feature.


### **Tech Stack**
- Nextjs 13 with app directory
- TypeScript
- Tailwind CSS
- Socket io
-  Firebase (Auth & Firestore)
-  Stripe (subscriptions payment)
-  Agora SDK for Audio Chat

## **How Ravely is Built**
- **Frontend**: NextJs
- **Backend** : Nextjs & Nodejs
   - **NextJS**: user auth & party tokens & data fetching and transformation for some routes                         from TMDB API
   - **NodeJs**:  soket io and video Stream
   
  #### **Movies and series Data**
  Ravely fetches the movie and series data from TMDP API
  #### **Video Player synchronization among party users**
  I'm using here **web sockets** to send/receive video events and for now, it's only paused and resumed events and synced the video time stamp among all users 
  
   **_example_** 
    if user1 paused the video at 1:55 it will fire a pause event and then send all party users that 
    "user 1 paused the video at 1:55" and the video will be paused among all user
  #### **Audio chat**
  Audio chat is built on WebRTC with Agora SDK
  



### **Project Tree** 
```
├── README.md
├── app
│   ├── (auth)
│   │   ├── forgot-password
│   │   │   └── page.tsx
│   │   ├── login
│   │   │   └── page.tsx
│   │   ├── reauth
│   │   │   └── page.tsx
│   │   └── signup
│   │       └── page.tsx
│   ├── (media)
│   │   ├── movie
│   │   │   ├── [movieId]
│   │   │   │   ├── VideoSlider.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   ├── types.d.ts
│   │   │   │   └── watch
│   │   │   │       ├── layout.tsx
│   │   │   │       └── page.tsx
│   │   │   ├── head.tsx
│   │   │   └── loading.tsx
│   │   └── serieses
│   │       ├── [seriesId]
│   │       │   ├── head.tsx
│   │       │   ├── page.tsx
│   │       │   └── season
│   │       │       └── [season_number]
│   │       │           ├── episode
│   │       │           │   ├── [epNumber]
│   │       │           │   │   └── page.tsx
│   │       │           │   └── layout.tsx
│   │       │           └── page.tsx
│   │       └── loading.tsx
│   ├── (user)
│   │   └── account
│   │       ├── head.tsx
│   │       ├── page.tsx
│   │       └── types.d.ts
│   ├── explore
│   │   ├── [type]
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── loading.tsx
│   ├── favourite
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── globals.css
│   ├── head.tsx
│   ├── layout.tsx
│   ├── my-space
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── page.tsx
│   ├── party
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── plans
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   └── page.tsx
│   └── upcoming
│       ├── loading.tsx
│       └── page.tsx
├── components
│   ├── ConintueWatching.tsx
│   ├── DefaultTags.tsx
│   ├── Favorite.tsx
│   ├── Home
│   │   ├── Hero.tsx
│   │   ├── SoundWaves.tsx
│   │   ├── VideoFeature.tsx
│   │   └── soundwaves.css
│   ├── Icons
│   │   ├── AmazonPrime.svg
│   │   ├── Disney.svg
│   │   ├── HBO-Logo.wine.svg
│   │   ├── HBO.svg
│   │   ├── Netflix.svg
│   │   └── disney-seeklogo.com.svg
│   ├── Modal.tsx
│   ├── Paginition.tsx
│   ├── Rating.tsx
│   ├── auth
│   │   ├── LoginButton.tsx
│   │   ├── LoginForm.tsx
│   │   ├── PromtUserReAuthwithPassword.tsx
│   │   ├── SignOut.tsx
│   │   ├── SignupForm.tsx
│   │   └── signupSchema.ts
│   ├── cards
│   │   ├── CharacterCard.tsx
│   │   ├── MovieCard.tsx
│   │   └── SeasonCard.tsx
│   ├── chat
│   │   ├── AudioCall.tsx
│   │   ├── Controls.tsx
│   │   ├── Member.tsx
│   │   └── settings.tsx
│   ├── continueWatchingSkeleton.tsx
│   ├── layout
│   │   ├── DropdownMenu.tsx
│   │   ├── Header.tsx
│   │   ├── Loader
│   │   │   ├── Loader.module.css
│   │   │   └── Loader.tsx
│   │   ├── ProviderFilter.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Slider.tsx
│   │   └── carousel.tsx
│   ├── media-page
│   │   └── Hero.tsx
│   ├── plans
│   │   ├── Plan.tsx
│   │   └── plansSkeleton.tsx
│   └── video
│       ├── FreeVideoPlayer.tsx
│       ├── LoadingPlayer.tsx
│       └── PremiumVideoPlayer.tsx
├── context
│   ├── authContext.tsx
│   └── checkoutContext.tsx
├── firebase
│   ├── firebase-admin.js
│   └── firebase-init.js
├── hooks
│   ├── useDebounce.tsx
│   ├── useFilters.tsx
│   ├── useGetContinueWatching.tsx
│   ├── useMonted.tsx
│   ├── useParty.tsx
│   └── useSocket.tsx
├── middleware.ts
├── next.config.js
├── package-lock.json
├── package.json
├── pages
│   └── api
│       ├── auth
│       │   ├── login.ts
│       │   ├── logout.ts
│       │   └── validate.ts
│       ├── getDataListing.ts
│       └── party
│           └── token.ts
├── postcss.config.js
├── public
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── avatar.png
│   ├── avatar2.png
│   ├── cat-notfound.jpg
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   ├── icons8-netflix.svg
│   ├── logo.png
│   ├── netflix.svg
│   ├── outlineLogoBlack.png
│   └── site.webmanifest
├── tailwind.config.js
├── tsconfig.json
└── util
    ├── CopyToClipboard.ts
    ├── addToContinueWatching.ts
    ├── getDataListing.ts
    ├── getDiscoverList.ts
    ├── getGenreId.ts
    ├── getImageUrl.ts
    ├── getMovie.ts
    ├── getNetworkId.tsx
    ├── getSeries.ts
    ├── getSortmethoud.tsx
    ├── getUserRole.ts
    ├── party.ts
    ├── search.ts
    └── types.d.ts
    ```
