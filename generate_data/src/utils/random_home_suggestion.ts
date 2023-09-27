import _ from 'lodash';
import type { Sneaker, SneakerDetail, SneakerVariation, SneakerVariationLibrary } from '../types/sneaker';
import { loremIpsum } from 'lorem-ipsum';
import { useValue } from './hooks';

type ColorsLibraryType = typeof colorsLibrary;

const brandSize = 20;
const sampleSize = 500;

const sizesLibrary = Object.freeze(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const);
const colorsLibrary = Object.freeze(['black', 'red', 'blue', 'green', 'aqua', 'pink', 'orange'] as const);
const imagesLibrary = Object.freeze<Record<ColorsLibraryType[number], string>>({
    black: '/img/demo-sneaker/black.png',
    red: '/img/demo-sneaker/red.png',
    blue: '/img/demo-sneaker/blue.png',
    green: '/img/demo-sneaker/green.png',
    pink: '/img/demo-sneaker/pink.png',
    aqua: '/img/demo-sneaker/blue.png',
    orange: '/img/demo-sneaker/red.png',
});

const brandsLibrary = Object.freeze(useValue(() => {
    return loremIpsum({
        count: brandSize,
        format: 'plain',
        units: 'words',
    })
        .split(' ')
        .map(item => item.toUpperCase());
}));

const namesLibrary = useValue(() => {
    const result: string[] = [];
    for (let i = 0; i < sampleSize; i++) {
        const name = loremIpsum({
            count: _.random(1, 3),
            units: 'words',
            format: 'plain',
        });
        result.push(_.startCase(name));
    }
    return Object.freeze(result);
});

const createImageFromSampleColor = (sampleColors: ColorsLibraryType[number][]): IndexSignature<string> => {
    return sampleColors.reduce((sum, value) => {
        sum[value] = imagesLibrary[value];
        return sum;
    }, {} as IndexSignature<string>);
}

const createLibraryFromSample = (sample: string[]): IndexSignature<string> => {
    return sample.reduce((sum, value) => {
        sum[value] = value;
        return sum;
    }, {} as IndexSignature<string>);
}

const createSneakerId = (index: number, name: string, brand: string) => {
    return _.kebabCase([
        brand,
        name,
        index.toString().padStart(3, '0'),
    ].join(' '));
}

export const randomVariationLibrary = (): SneakerVariationLibrary => {
    const colors = _.sampleSize(colorsLibrary, _.random(1, colorsLibrary.length));
    const sizes = _.sampleSize(sizesLibrary, _.random(1, sizesLibrary.length));
    return {
        colors: createLibraryFromSample(colors),
        sizes: createLibraryFromSample(sizes),
        images: createImageFromSampleColor(colors),
    }
}

export const randomVariations = (lib: SneakerVariationLibrary): SneakerVariation[] => {
    const sizeKeys = Object.keys(lib.sizes);
    const colorKeys = Object.keys(lib.colors);
    const result: SneakerVariation[] = [];

    for (const sizeKey of sizeKeys) {
        for (const colorKey of colorKeys) {
            result.push({
                id: _.uniqueId(`${sizeKey}-${colorKey}-`),
                color: colorKey,
                size: sizeKey,
                image: colorKey,
                price: _.random(10_000) * 1000,
            });
        }
    }

    return result;
}

export const randomSneakers = (n: number = 20): Sneaker[] => {
    return namesLibrary.map((name, index) => {
        const brand = _.sample(brandsLibrary)!;
        const id = createSneakerId(index, name, brand);
        const variationLibrary = randomVariationLibrary();
        const variations = randomVariations(variationLibrary);
        const firstColorKey = variations[0].color;
        return {
            id,
            slug: id,
            brand,
            name,
            defaultColor: firstColorKey,
            defaultImage: firstColorKey,
            variationLibrary,
            variations,
        }
    });
}

export const createSneakerDetail = (sneaker: Sneaker): SneakerDetail => {
    return {
        ...sneaker,
        description: loremIpsum({
            count: _.random(10, 25),
            format: 'html',
            units: 'paragraphs',
            suffix: ' ',
        }),
    }
}