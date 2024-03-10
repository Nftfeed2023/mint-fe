const Collection = {
    FCoffeeTea: 'f-coffee-tea',
    ExploringNft: 'exploring-nft',
    CioVietnam: 'cio-vietnam-christmas',
    Gs25: 'gs25-membership',
    PNJ: 'pnj-premium',
    QuocKhanh: 'qks-collection',
    Dentsu: "dentsu",
} as const

export type ECollectionType = typeof Collection[keyof typeof Collection]
