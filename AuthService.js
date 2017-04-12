'use-strict'

var encoding = require('NativeModules').Encoding;
var _ = require('lodash');
import { AsyncStorage } from 'react-native';

const authKey = 'auth';
const userKey = 'user';

class AuthService {
    getAuthInfo(callback){
        AsyncStorage.multiGet([authKey, userKey], (err, val) => {
            if(err){
                return callback(err);
            }

            if(!val){
                return callback();
            }
            
            var zippedObject = _.fromPairs(val);

            if(!zippedObject[authKey]){
                return callback();
            }

            var authInfo = {
                header: {
                    Authorization: 'Basic ' + zippedObject[authKey]
                },
                user: JSON.parse(zippedObject[userKey])
            }

            return callback(null, authInfo);
        })
    }

    login(credentials, cb){
        var authString = credentials.username + ':' + credentials.password;
        encoding.base64Encode(authString, (encodedAuth) => {
            fetch('https://api.github.com/user', {
            headers: {
                'Authorization': 'Basic ' + encodedAuth
            }
            })
            .then((response) => {
            if(response.status >= 200 && response.status < 300){
                return response;
            }
            throw {
                badCredentials: response.status == 401,
                unknownError: response.status != 401
            }
            })
            .then((response) => {
            return response.json();
            })
            .then((results) => {
            console.log(results);

            AsyncStorage.multiSet([
                [authKey, encodedAuth],
                [userKey, JSON.stringify(results)]
            ], (err) => {
                if(err){
                    throw err;
                }

                return cb({success: true});
            })
            })
            .catch((err) => {
            return cb(err);
            });            
        });

    }
}

module.exports = new AuthService();