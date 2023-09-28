import { basePaths } from "./router"


export const createSneakerUrl = (slug:string) => {
    return `${basePaths.sneaker}/${slug}`;
}