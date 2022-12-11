export interface Subscription {
    metadata: Metadata
    trial_start: any
    cancel_at: any
    canceled_at: any
    created: Created
    price: Price
    quantity: number
    ended_at: any
    prices: Price2[]
    status: string
    trial_end: any
    current_period_start: CurrentPeriodStart
    current_period_end: CurrentPeriodEnd
    stripeLink: string
    cancel_at_period_end: boolean
    product: Product
    items: Item[]
    role: string
  }
  
  export interface Metadata {}
  
  export interface Created {
    seconds: number
    nanoseconds: number
  }
  
  export interface Price {
    converter: any
    _key: Key
    type: string
    firestore: Firestore
  }
  
  export interface Key {
    path: Path
  }
  
  export interface Path {
    segments: string[]
    offset: number
    len: number
  }
  
  export interface Firestore {
    app: App
    databaseId: DatabaseId
    settings: Settings
  }
  
  export interface App {
    _isDeleted: boolean
    _options: Options
    _config: Config
    _name: string
    _automaticDataCollectionEnabled: boolean
    _container: Container
  }
  
  export interface Options {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
  }
  
  export interface Config {
    name: string
    automaticDataCollectionEnabled: boolean
  }
  
  export interface Container {
    name: string
    providers: Providers
  }
  
  export interface Providers {}
  
  export interface DatabaseId {
    projectId: string
    database: string
  }
  
  export interface Settings {
    host: string
    ssl: boolean
    ignoreUndefinedProperties: boolean
    cacheSizeBytes: number
    experimentalForceLongPolling: boolean
    experimentalAutoDetectLongPolling: boolean
    useFetchStreams: boolean
  }
  
  export interface Price2 {
    converter: any
    _key: Key2
    type: string
    firestore: Firestore2
  }
  
  export interface Key2 {
    path: Path2
  }
  
  export interface Path2 {
    segments: string[]
    offset: number
    len: number
  }
  
  export interface Firestore2 {
    app: App2
    databaseId: DatabaseId2
    settings: Settings2
  }
  
  export interface App2 {
    _isDeleted: boolean
    _options: Options2
    _config: Config2
    _name: string
    _automaticDataCollectionEnabled: boolean
    _container: Container2
  }
  
  export interface Options2 {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
  }
  
  export interface Config2 {
    name: string
    automaticDataCollectionEnabled: boolean
  }
  
  export interface Container2 {
    name: string
    providers: Providers2
  }
  
  export interface Providers2 {}
  
  export interface DatabaseId2 {
    projectId: string
    database: string
  }
  
  export interface Settings2 {
    host: string
    ssl: boolean
    ignoreUndefinedProperties: boolean
    cacheSizeBytes: number
    experimentalForceLongPolling: boolean
    experimentalAutoDetectLongPolling: boolean
    useFetchStreams: boolean
  }
  
  export interface CurrentPeriodStart {
    seconds: number
    nanoseconds: number
  }
  
  export interface CurrentPeriodEnd {
    seconds: number
    nanoseconds: number
  }
  
  export interface Product {
    converter: any
    _key: Key3
    type: string
    firestore: Firestore3
  }
  
  export interface Key3 {
    path: Path3
  }
  
  export interface Path3 {
    segments: string[]
    offset: number
    len: number
  }
  
  export interface Firestore3 {
    app: App3
    databaseId: DatabaseId3
    settings: Settings3
  }
  
  export interface App3 {
    _isDeleted: boolean
    _options: Options3
    _config: Config3
    _name: string
    _automaticDataCollectionEnabled: boolean
    _container: Container3
  }
  
  export interface Options3 {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
  }
  
  export interface Config3 {
    name: string
    automaticDataCollectionEnabled: boolean
  }
  
  export interface Container3 {
    name: string
    providers: Providers3
  }
  
  export interface Providers3 {}
  
  export interface DatabaseId3 {
    projectId: string
    database: string
  }
  
  export interface Settings3 {
    host: string
    ssl: boolean
    ignoreUndefinedProperties: boolean
    cacheSizeBytes: number
    experimentalForceLongPolling: boolean
    experimentalAutoDetectLongPolling: boolean
    useFetchStreams: boolean
  }
  
  export interface Item {
    price: Price3
    created: number
    plan: Plan
    billing_thresholds: any
    quantity: number
    metadata: Metadata5
    subscription: string
    id: string
    tax_rates: any[]
    object: string
  }
  
  export interface Price3 {
    product: Product2
    created: number
    id: string
    unit_amount: number
    currency: string
    type: string
    tiers_mode: any
    tax_behavior: string
    nickname: any
    livemode: boolean
    billing_scheme: string
    transform_quantity: any
    custom_unit_amount: any
    recurring: Recurring
    lookup_key: any
    active: boolean
    metadata: Metadata3
    object: string
    unit_amount_decimal: string
  }
  
  export interface Product2 {
    statement_descriptor: any
    updated: number
    attributes: any[]
    id: string
    name: string
    type: string
    object: string
    active: boolean
    livemode: boolean
    created: number
    default_price: string
    shippable: any
    description: string
    package_dimensions: any
    images: any[]
    tax_code: any
    metadata: Metadata2
    url: any
    unit_label: any
  }
  
  export interface Metadata2 {
    firebaseRole: string
  }
  
  export interface Recurring {
    interval: string
    trial_period_days: any
    interval_count: number
    usage_type: string
    aggregate_usage: any
  }
  
  export interface Metadata3 {}
  
  export interface Plan {
    metadata: Metadata4
    id: string
    currency: string
    billing_scheme: string
    created: number
    product: string
    amount: number
    usage_type: string
    active: boolean
    interval: string
    object: string
    amount_decimal: string
    transform_usage: any
    trial_period_days: any
    nickname: any
    tiers_mode: any
    interval_count: number
    aggregate_usage: any
    livemode: boolean
  }
  
  export interface Metadata4 {}
  
  export interface Metadata5 {}
  