declare global {
    interface IndexSignature<T = any> {
        [key: string]: T;
    }

    interface SiteMap {}
    interface SiteUrl {
        /**
         * url
         */
        loc: string;

        /**
         * W3S datetime https://www.w3.org/TR/NOTE-datetime
         */
        lastmod: string;

        changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

        /**
         * value:Float between 0 -> 1.
         */
        priority: number;
    }
}

export {};
