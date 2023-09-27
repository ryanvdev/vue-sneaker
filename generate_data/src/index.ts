import path from "node:path";
import fs from 'node:fs';
import prettier from 'prettier';
import { randomSneakers } from './utils/random_home_suggestion';

const fakeApiPath = path.join(__dirname, '../../landing_page/public/testing-api/', 'random-sneakers.json');

const main = async () => {
    const sample = randomSneakers(200);
    // console.log(sample);
    const data = await prettier.format(JSON.stringify(sample), {
        parser: 'json',
        printWidth: 150,
        tabWidth: 4,
        endOfLine: 'crlf',
    });
    fs.writeFileSync(fakeApiPath, data);
    console.log('done!');
}
main();