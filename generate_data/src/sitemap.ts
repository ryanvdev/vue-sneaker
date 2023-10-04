import React from 'ts-rssr';
import path from 'node:path';
import fs from 'node:fs';

import { siteUrlsToSiteMap } from './utils/sitemap_util';
import { Sneaker } from './types/sneaker';

const dataPath = path.join(__dirname, '../../landing_page/public/testing-api/sneakers/sneakers.json');
const filePath = path.join(__dirname, '../../landing_page/public/sitemap.xml');

const main =async () => {
    const dataStr = fs.readFileSync(dataPath, {encoding: 'utf8'});
    const data = JSON.parse(dataStr) as Sneaker[];

    const rawSiteUrls:SiteUrl[] = [];

    rawSiteUrls.push({
        loc: `https://vue-sneaker.zitska.com`,
        lastmod: '2023-09-04',
        changefreq: 'monthly',
        priority: 0.6
    });
    
    data.forEach(item => {
        rawSiteUrls.push({
            loc: `https://vue-sneaker.zitska.com/#/sneaker/${item.slug}`,
            lastmod: '2023-09-03',
            changefreq: 'yearly',
            priority: 0.1
        });
    });

    const sitemap = siteUrlsToSiteMap(rawSiteUrls);

    fs.writeFileSync(filePath, sitemap, {encoding: 'utf8'});
    console.log('done');
}

main();
