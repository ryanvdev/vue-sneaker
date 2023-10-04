import React from "react";

declare global {
    type ReactJSXProps<T = IndexSignature<string>> = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>&T;
    type JSXDivProps =  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    namespace JSX {
        interface IntrinsicElements {
            urlset: ReactJSXProps<{
                xmlns?: string;
            }>;
            url: JSXDivProps;
            loc: JSXDivProps;
            lastmod: JSXDivProps;
            changefreq: JSXDivProps;
            priority: JSXDivProps;
        }
    }
}

export { }