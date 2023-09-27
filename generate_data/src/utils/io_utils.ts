import fs from 'fs';
import { Sneaker, SneakerDetail } from '../types/sneaker';
import path from 'path';
import { useJsonFormat } from './hooks';

export const saveSneakerDetail = async (sneakerDetail:SneakerDetail, dir:string) => {
    const data = await useJsonFormat(JSON.stringify(sneakerDetail));
    fs.writeFileSync(
        path.join(dir, `${sneakerDetail.id}.json`),
        data,
        {
            encoding: 'utf8',
        }
    );
    console.log('[SAVED] sneaker', sneakerDetail.id);
}


export const saveSneakers = async (sneakers:Sneaker[], dir:string) => {
    const data = await useJsonFormat(JSON.stringify(sneakers));
    const filePath = path.join(dir, 'sneakers.json');
    fs.writeFileSync(filePath, data, {
        encoding: 'utf8',
    });
    console.log('[SAVED] sneakers');
}