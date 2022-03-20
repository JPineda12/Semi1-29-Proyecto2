"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aws_keys = {
    s3: {
        region: 'us-east-2',
        accessKeyId: "",
        secretAccessKey: "",
        //apiVersion: '2006-03-01',
    },
    //CLOUD CREDS
    cognito: {
        UserPoolId: '',
        ClientId: ''
    },
    /*
   //TEST PURPOSES COGNITO
    cognito:{
        UserPoolId: 'us-east-2_8Fiadroi0',
        ClientId: ''
    },
    */
    rekognition: {
        region: 'us-east-2',
        accessKeyId: "",
        secretAccessKey: ""
    },
    translate: {
        region: 'us-east-2',
        accessKeyId: "",
        secretAccessKey: ""
    },
};
exports.default = aws_keys;
