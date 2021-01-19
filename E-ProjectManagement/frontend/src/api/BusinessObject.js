

export default class BusinessObject {
    dateTime;




    constructor() {
        this.id = 0;
        this.creationTime = this.dateTime.now();
    }


    setCreationTime(aDateTime) {
        this.creationTime = aDateTime.now();
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
