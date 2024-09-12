import ServiceOption from './serviceOption';

class CustomerService {
    private title: string;
    private descriptionShort: string;
    private description: string;
    private serviceOptions: ServiceOption[];

    constructor(title: string, descriptionShort: string, serviceOptions: ServiceOption[], description: string = descriptionShort){
        this.title = title;
        this.descriptionShort = descriptionShort;
        this.description = description;
        this.serviceOptions = serviceOptions;
    }

    get Title() {
        return this.title;
    };

    get DescriptionShort() {
        return this.descriptionShort;
    };

    get Description() {
        return this.description;
    };

    get ServiceOptions() {
        return this.serviceOptions;
    };
}

export default CustomerService;