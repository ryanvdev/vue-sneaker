import _ from 'lodash';
import type {Sneaker, SneakerVariation, SneakerVariationLibrary} from '@/types/sneaker';

const nameLib = [
    {
        brand: 'FILA',
        names: [
            'Ranger'
        ],
    },
    {
        brand: 'Nike',
        names: [
            'Alphaboost',
            'Superstar Core White',
            'Running',
            'Air Jordan',
            'Court Borough Low',
            'Court Royale',
            'Legacy Lift Low',
        ]
    },
    {
        brand: 'Adidas',
        names: [
            'Alphaboost',
            'Superstar Core White',
            'Running',
            'Air Force',
            'Legacy Lift Low',
            'Air Jordan',
            'Court Borough Low',
            'Court Royale',
        ]
    },
    {
        brand: 'Balance',
        names: [
            'W Pro Court Sky',
            'Alphaboost',
            'Superstar Core White',
            'Running',
            'Air Force',
            'Legacy Lift Low',
            'Air Jordan',
            'Court Borough Low',
            'Court Royale',
        ]
    }
] as {
    brand: string,
    names: string[];
}[];

const variationLibrary:SneakerVariationLibrary = {
    colors: {
        'black': 'black',
        'blue': 'blue',
        'green': 'green',
        'pink': 'pink',
        'red': 'red',
    },
    sizes: {
        '1': 'S',
        '2': 'L',
        '3': 'X',
        '4': 'XL',
    },
    images: {
        'black': '/img/demo-sneaker/black.png',
        'red': '/img/demo-sneaker/red.png',
        'blue': '/img/demo-sneaker/blue.png',
        'green': '/img/demo-sneaker/green.png',
        'pink': '/img/demo-sneaker/pink.png',
    }
}

const libColors = Object.entries(variationLibrary.colors);
const libSizes = Object.entries(variationLibrary.sizes);

export const randomVariationLibrary = ():SneakerVariationLibrary => {
    const colors = structuredClone(_.sampleSize(libColors, _.random(1, libColors.length)));
    const sizes = structuredClone(_.sampleSize(libSizes,_.random(1, libSizes.length)));

    const images = colors.reduce((sum, [key]) => {
        sum.push([key, variationLibrary.images[key]]);
        return sum;
    }, [] as [string, string][]);

    return {
        colors: Object.fromEntries(colors),
        sizes: Object.fromEntries(sizes),
        images: Object.fromEntries(images),
    }
}

export const randomVariations = (lib:SneakerVariationLibrary):SneakerVariation[] => {
    const colorKeys = Object.keys(lib.colors);
    const sizeKeys = Object.keys(lib.sizes);

    if(colorKeys.length === 1 && sizeKeys.length === 1){
        return [
            {
                id: _.uniqueId('sneaker-'),
                color: colorKeys[0],
                size: sizeKeys[0],
                image: colorKeys[0],
                price: _.random(1_000, 10_000_000),
            }
        ];
    }

    const result:SneakerVariation[] = [];
    
    for(const sizeKey of sizeKeys){
        const colorKeysSample = _.sampleSize(colorKeys, _.random(1, colorKeys.length));
        for(const colorKey of colorKeysSample){
            result.push({
                id: _.uniqueId(`${colorKey}-${sizeKey}`),
                color: colorKey,
                size: sizeKey,
                image: colorKey,
                price: _.random(10_000_000),
            });
        }
    }

    return result;
}

export const randomSneakers = (n:number = 20):Sneaker[] => {
    const results:Sneaker[] = [];

    for(let i = 0; i < n; i++){
        const brandLib = _.sample(nameLib)!;
        const slug = _.uniqueId('#sneaker');
        const variationLibrary = randomVariationLibrary();
        const variations = randomVariations(variationLibrary);
        const colorKey = variations[0].color;
        results.push({
            id: slug,
            slug,
            brand: brandLib.brand,
            name: _.sample(brandLib.names)!,
            variationLibrary,
            variations,
            defaultColor: colorKey,
            defaultImage: colorKey,
        })
    }
    return results;
}