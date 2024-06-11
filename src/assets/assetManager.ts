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
        let extension = assetName.split('.').pop();
        if (!extension) {
            throw new Error(`No extension found in asset: ${assetName}`);
        }
        extension = extension.toLowerCase();
        for (let loader of this._loaders) {
            if (loader.supportedExtensions.includes(extension)) {
                const asset = loader.loadAsset(assetName);
                this._loadedAssets[assetName] = asset;
                return;
            }
        }
        throw new Error(`No loader found for asset: ${assetName}`);
    }
    public static getAsset(assetName: string) : IAsset|undefined {
        if ( AssetManager._loadedAssets[assetName] !== undefined ) {
            return AssetManager._loadedAssets[assetName];
        } else 
        {
            AssetManager.loadAsset( assetName );
        };
        return undefined;
    }
}