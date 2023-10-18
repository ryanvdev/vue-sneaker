import path from 'node:path';
import {
    brandsLibrary,
    createSneakerDetail,
    namesLibrary,
    randomSneakers,
} from './utils/random_home_suggestion';
import { saveBrands, saveNames, saveSneakerDetail, saveSneakers } from './utils/io_utils';

const rootDir = path.join(__dirname, '../../landing_page/public/testing-api/sneakers/');
const sneakerDetailDir = path.join(rootDir, '/detail');

const main = async () => {
    const sneakers = randomSneakers();

    await saveSneakers(sneakers, rootDir);
    await saveNames(namesLibrary, rootDir);
    await saveBrands(brandsLibrary, rootDir);

    for (const item of sneakers) {
        await saveSneakerDetail(createSneakerDetail(item), sneakerDetailDir);
    }
};
main();
