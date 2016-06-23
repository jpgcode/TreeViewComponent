/**
 * Basic global utilities
*/

class Utils {

    //Check if the passed string is valid JSON
    isValidJSON(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    //Returns the data type
    typeChecker(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1);
    }

}

export default Utils;
