import {Timestamp as aDateTime} from "@firebase/firestore-types";

export default class BusinessObject {



    constructor() {
        this.id = 0;
        this.creationTime = aDateTime.now();
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
