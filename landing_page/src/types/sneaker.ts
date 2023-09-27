export interface SneakerVariationLibrary {
    sizes: IndexSignature<string>,
    colors: IndexSignature<string>,
    images: IndexSignature<string>,
}

export interface SneakerVariation {
    id: string,
    size: string,
    color: string,
    image: string,
    price: number,
}

export interface Sneaker {
    id: string,
    slug: string,
    brand: string,
    name: string,
    defaultImage: string,
    defaultColor: string,
    variations: SneakerVariation[],
    variationLibrary: SneakerVariationLibrary,
}
