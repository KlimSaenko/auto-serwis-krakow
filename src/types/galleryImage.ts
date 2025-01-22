class GalleryImage {
    private imgUrl: string;
    private thumbnailImg: HTMLImageElement | undefined;
    private label: string;
    private altText: string;
    private onload: ((ev: Event) => any) | null = null;

    constructor(imgUrl: string, label: string = '', thumbnailImgUrl?: string, altText: string = label){
        this.imgUrl = imgUrl;

        const thumbnailImg = new Image();
        thumbnailImg.src = thumbnailImgUrl ?? '';
        thumbnailImg.onload = (ev) => {
            if (this.onload){
                this.onload(ev);
            }
        };

        this.thumbnailImg = thumbnailImg;
        this.label = label;
        this.altText = altText;
    }

    get ImgUrl() {
        return this.imgUrl;
    };

    set OnLoad(fn: (this: GlobalEventHandlers, ev: Event) => any) {
        this.onload = fn;
    };

    get ThumbnailImgUrl() {
        return this.thumbnailImg?.src ?? this.imgUrl;
    }

    get Label() {
        return this.label;
    };

    get AltText() {
        return this.altText;
    };
}

export default GalleryImage;