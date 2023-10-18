import fs from 'fs';
import { Sneaker, SneakerDetail } from '../types/sneaker';
import path from 'path';

export const saveSneakerDetail = async (sneakerDetail: SneakerDetail, dir: string) => {
    const data = JSON.stringify(sneakerDetail);
    fs.writeFileSync(path.join(dir, `${sneakerDetail.id}.json`), data, {
        encoding: 'utf8',
    });
    console.log('[SAVED] sneaker', sneakerDetail.id);
};

export const saveSneakers = async (sneakers: Sneaker[], dir: string) => {
    const data = await JSON.stringify(sneakers);
    const filePath = path.join(dir, 'sneakers.json');
    fs.writeFileSync(filePath, data, {
        encoding: 'utf8',
    });
    console.log('[SAVED] sneakers');
};

export const saveBrands = async (brands: Readonly<string[]>, dir: string) => {
    const data = JSON.stringify(brands);
    const filePath = path.join(dir, 'brands.json');
    fs.writeFileSync(filePath, data, {
        encoding: 'utf8',
    });
    console.log('[SAVED] brands');
};

export const saveNames = async (names: Readonly<string[]>, dir: string) => {
    const data = JSON.stringify(names);
    const filePath = path.join(dir, 'names.json');
    fs.writeFileSync(filePath, data, {
        encoding: 'utf8',
    });
    console.log('[SAVED] names');
};
