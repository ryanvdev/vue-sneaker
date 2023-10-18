import React from 'ts-rssr';
import path from 'node:path';
import fs from 'node:fs';

import { siteUrlsToSiteMap } from './utils/sitemap_util';
import { Sneaker } from './types/sneaker';
import { useValue } from './utils/hooks';

const dataPath = path.join(
    __dirname,
    '../../landing_page/public/testing-api/sneakers/sneakers.json',
);
const filePath = path.join(__dirname, '../../landing_page/public/sitemap.xml');

const currentTime = useValue(() => {
    const date = new Date();
    const yy = date.getFullYear();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    return `${yy}-${mm}-${dd}`;
});

const main = async () => {
    const dataStr = fs.readFileSync(dataPath, { encoding: 'utf8' });
    const data = JSON.parse(dataStr) as Sneaker[];

    const rawSiteUrls: SiteUrl[] = [];

    rawSiteUrls.push({
        loc: `https://vue-sneaker.zitska.com`,
        lastmod: currentTime,
        changefreq: 'monthly',
        priority: 0.9,
    });

    data.forEach((item) => {
        rawSiteUrls.push({
            loc: `https://vue-sneaker.zitska.com/#/sneaker/${item.slug}`,
            lastmod: currentTime,
            changefreq: 'yearly',
            priority: 0.0,
        });
    });

    const sitemap = siteUrlsToSiteMap(rawSiteUrls);

    fs.writeFileSync(filePath, sitemap, { encoding: 'utf8' });
    console.log('done');
};

main();
