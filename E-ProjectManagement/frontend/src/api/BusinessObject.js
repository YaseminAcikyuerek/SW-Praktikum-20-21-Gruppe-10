

export default class BusinessObject {



    constructor() {
        this.id = 0;
        this.creationTime = null;
    }


    setCreationTime(aCreationTime) {
        this.creationTime = aCreationTime;
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
