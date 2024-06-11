import { IAssetLoader } from "./IAssetLoader";
import { IAsset } from "./IAsset";

export class AssetManager{
    private constructor() {}
    private static _loaders : IAssetLoader[] = [];  
    private static _loadedAssets : { [name: string] : IAsset } = {};
    public static registerLoader(loader: IAssetLoader) {
        this._loaders.push(loader);
    }
    public static loadAsset(assetName: string) : void {
        
    }
    public static getAsset(assetName: string) : IAsset {
        return this._loadedAssets[assetName];
    }
}