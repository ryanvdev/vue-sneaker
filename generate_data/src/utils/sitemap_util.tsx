import React from "ts-rssr";


export function siteUrlsToSiteMap(data: SiteUrl[]) {
    const result = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ];

    const urlTagStart = '<url>';
    const urlTagEnd = '</url>';

    for(const item of data){
        result.push(urlTagStart);
        for(const [key, value] of Object.entries(item)){
            result.push(`<${key}>${value}</${key}>`);
        }
        result.push(urlTagEnd);
    }


    result.push('</urlset>');
    
    return result.join('\n');
}