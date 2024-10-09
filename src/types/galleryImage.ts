class GalleryImage {
    private imgUrl: string;
    private thumbnailImgUrl: string | undefined;
    private label: string;
    private altText: string;

    constructor(imgUrl: string, label: string = '', thumbnailImgUrl?: string, altText: string = label){
        this.imgUrl = imgUrl;
        this.thumbnailImgUrl = thumbnailImgUrl;
        this.label = label;
        this.altText = altText;
    }

    get ImgUrl() {
        return this.imgUrl;
    };

    get ThumbnailImgUrl() {
        return this.thumbnailImgUrl ?? this.imgUrl;
    };

    get Label() {
        return this.label;
    };

    get AltText() {
        return this.altText;
    };
}

export default GalleryImage;