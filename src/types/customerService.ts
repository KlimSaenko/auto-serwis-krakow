class CustomerService {
    private title: string;
    private descriptionShort: string;
    private description: string;

    constructor(title: string, descriptionShort: string, description: string = descriptionShort){
        this.title = title;
        this.descriptionShort = descriptionShort;
        this.description = description;
    }

    get Title() {
        return this.title;
    };

    set Title(title: string) {
        this.title = title;
    };

    get DescriptionShort() {
        return this.descriptionShort;
    };

    set DescriptionShort(descriptionShort: string) {
        this.descriptionShort = descriptionShort;
    };

    get Description() {
        return this.description;
    };

    set Description(description: string) {
        this.description = description;
    };
}

export default CustomerService;