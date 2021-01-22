

export default class BusinessObject {



    constructor() {
        this.id = 0;
        this.creation_time = null;
    }


    setCreationTime(aCreationTime) {
        this.creation_time = aCreationTime;
    }

    getCreationTime() {
        return this.creation_time;
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
