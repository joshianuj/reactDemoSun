// Libraries
import axios from 'axios';
import 'whatwg-fetch';

const API_PATH = window.location.origin + '/api/v1/';

/**
 * Perfoms a GET request to the server
 *
 * @param {String} url for get Requset
 */
export function get(url) {
    return fetch(API_PATH + url, {
        method: 'GET'
    });
}

/**
 * Perfoms a POST request to the server
 *
 * @param {String} url for get Request
 */
export function post(url, body) {
    console.log(url,body);
    return fetch(API_PATH + url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
}
