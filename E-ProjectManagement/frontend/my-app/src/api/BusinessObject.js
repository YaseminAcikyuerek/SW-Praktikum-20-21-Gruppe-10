export default class BusinessObject {
//Text


    constructor() {
        this.id = 0;
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
