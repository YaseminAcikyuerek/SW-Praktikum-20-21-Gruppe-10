


export default class BusinessObject {



    constructor() {
        this.id = 0;
        this.creationTime = aDateTime;
    }


    setCreationTime(aDateTime) {
        this.creationTime = aDateTime;
    }

    getCreationTime() {
        return this.creationTime;
    }


    setID(aId) {
        this.id = aId;
    }

    getID() {
        return this.id;
    }

    toString() {
        let result = " ";
        for (var prop in this) {
        result += prop + ":" + this [prop] +" ";
        }
        return result;
    }

}
