import { API_BASE_URL } from "../constants";

/* eslint-disable prettier/prettier */
export function compareJSONObject(object1, object2, element, jsonObject) {
    /**
     * Code to compare values of two equivalent JSON object.
     * @param {Object} - first JSON object.
     * @param {Object} - second JSON object.
     * @param {Element} - it's name and value needs to be creating the new JSON object i.e to be updated
     * @return {Object} - a JSON object of those keys whose values are different along-with id key.
     */
    if (Object.keys(object1).length === Object.keys(object2).length) {
        if(object2.hasOwnProperty('unique_id')){
            jsonObject['unique_id'] = object2.unique_id;
        }
        if(object2.hasOwnProperty('id')){
            jsonObject['id'] = object2.id;
        }

        let key = element.name;
        if (object2.hasOwnProperty(key)) {
            if (object2[key] !== object1[key]) {
                jsonObject[element.name] = element.value;
            } else {
                delete jsonObject[element.name];
            }
        }
    }
    return jsonObject;
}

export function dynamicRequiredMsz(field_name) {
    return `${field_name} is required.`;
}

export function replacer(template, jsonData) {
    return template.replace(/\$\{([^\)]+)?\}/g, function($1, $2) { return jsonData[$2]; });
}
export function getNameAttributes(name) {
    let _name = []
    if (typeof name !== 'undefined') {
        _name = name.split(' ');
    }
    if (_name.length === 0) {
        return {
            first_name: null,
            last_name: null
        }
    } else if (_name.length === 1) {
        return {
            first_name: _name[0],
            last_name: null
        }
    } else {
        return {
            first_name: _name[0],
            last_name: _name[_name.length - 1]
        }
    }
}

export function apiWithParams(params,endPoint){
    console.log(params,' params')
    const url = new URL(API_BASE_URL+endPoint);
    Object.keys(params).forEach(key => {
        if (params[key] !== undefined) {
            url.searchParams.append(key, params[key]);
        }
    });
    console.log(url.toString(),' inactive category')
    return url.toString();
}

export function errorMessage(res){
    res.payload?.errors ? res.payload.errors.forEach((err) => {
        message.error(err);
      }) : message.error(res.payload.message);
}