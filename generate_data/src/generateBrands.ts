import fs from 'node:fs';
import path from 'node:path';
import { Sneaker } from './types/sneaker';

const rootDir = path.join(__dirname, '../../landing_page/public/testing-api/sneakers');
const sneakerFilePath = path.join(rootDir, '/sneakers.json');
const namesFilePath = path.join(rootDir, '/names.json');
const brandsFilePath = path.join(rootDir, '/brands.json');

const main = async () => {
    const strData = fs.readFileSync(sneakerFilePath, { encoding: 'utf-8' });
    const sneakers = JSON.parse(strData) as Sneaker[];

    const setOfName = new Set<string>();
    const setOfBrand = new Set<string>();

    for (const item of sneakers) {
        setOfName.add(item.name);
        setOfBrand.add(item.brand);
    }

    const names = Array.from(setOfName);
    const brands = Array.from(setOfBrand);

    fs.writeFileSync(namesFilePath, JSON.stringify(names), { encoding: 'utf8' });
    fs.writeFileSync(brandsFilePath, JSON.stringify(brands), { encoding: 'utf8' });
};

main();
