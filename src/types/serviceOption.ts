class ServiceOption {
    private name: string;
    private price: string;
    private description: string;
    private problemDescription: string;

    constructor(name: string, price: string, description: string, problemDescription: string){
        this.name = name;
        this.price = price;
        this.description = description;
        this.problemDescription = problemDescription;
    }

    get Name() {
        return this.name;
    };

    get Price() {
        return this.price;
    };

    get Description() {
        return this.description;
    };

    get ProblemDescription() {
        return this.problemDescription;
    };
};

export default ServiceOption;