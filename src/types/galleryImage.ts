class GalleryImage {
    private imgUrl: string;
    private label: string;
    private width: number;
    private altText: string;

    constructor(imgUrl: string, label: string = '', width: number = 1, altText: string = label){
        this.imgUrl = imgUrl;
        this.label = label;
        this.width = width;
        this.altText = altText;
    }

    get ImgUrl() {
        return this.imgUrl;
    };

    get Label() {
        return this.label;
    };

    get Width() {
        return this.width;
    };

    get AltText() {
        return this.altText;
    };

    set Width(width: number) {
        this.width = width;
    };
}

export default GalleryImage;