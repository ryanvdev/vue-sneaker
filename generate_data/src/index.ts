import path from "node:path";
import { createSneakerDetail, randomSneakers } from './utils/random_home_suggestion';
import { saveSneakerDetail, saveSneakers } from "./utils/io_utils";

const rootDir = path.join(__dirname, '../../landing_page/public/testing-api/sneakers/');
const sneakerDetailDir = path.join(rootDir, '/detail');

const main = async () => {
    const sneakers = randomSneakers();
    
    await saveSneakers(sneakers, rootDir);

    for(const item of sneakers){
        await saveSneakerDetail(createSneakerDetail(item), sneakerDetailDir);
    }
}
main();