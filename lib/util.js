/**
 * Created by Marcus on 1/18/17.
 */
'use strict'
import 'babel-polyfill'

module.exports = {

  cognitoToPublicUser (cognito) {
    let cognitoFiltered = {}
    cognitoFiltered['nationality'] = {}
    cognitoFiltered['username'] = cognito['Username']

    cognito['UserAttributes'].map((elem) => {
      let json = JSON.parse(JSON.stringify(elem))

      if (json['Name'] === 'custom:nationalityIso') cognitoFiltered['nationality']['isoCode'] = json['Value']
      if (json['Name'] === 'email_verified') cognitoFiltered['emailVerified'] = json['Value']
      if (json['Name'] === 'custom:nationalityName') cognitoFiltered['nationality']['name'] = json['Value']
      if (json['Name'] === 'custom:avatar') cognitoFiltered['avatar'] = json['Value']
      if (json['Name'] === 'custom:displayName') cognitoFiltered['displayName'] = json['Value']
      if (json['Name'] === 'sub') cognitoFiltered['id'] = json['Value']
    })

    return cognitoFiltered
  },
  stringSetToJson (value) {
    const stringValue = JSON.stringify(value)
    const replaced = stringValue.replace(/\\/g, '').replace(/\"\"/g, '"').replace(/\"{/g, '{').replace(/}\"/g, '}')
    return JSON.parse(replaced)
  },
  isEmpty (value) {
    return typeof value === 'string' && !value.trim() || typeof value === 'undefined' || value === null
  },
  bufferToString (binary) {
    let buffer = Buffer.from(binary)
    return buffer.toString()
  },
  /**
     @param {string} json
     @return {string}
     */
  jsonToBuffer (json, done) {
    let binary = JSON.parse(JSON.stringify(json))
    let buffer = Buffer.from(binary)
    done(buffer.toString())
  },
  sqlQuery () {

    // CREATE TABLE Lol
    // (
    //     id varchar(45) NOT NULL UNIQUE,
    //     userId varchar(45) NOT NULL,
    //     summonerId int NOT NULL,
    //     accountId int NOT NULL,
    //     name varchar(30) NOT NULL,
    //     profileIconId int NOT NULL,
    //     profileIconUrl varchar(100) NOT NULL,
    //     region varchar(45) NOT NULL,
    //     summonerLevel int NOT NULL,
    //     isVerified boolean,
    //     messages VARCHAR(255),
    //     revisionDate BIGINT NOT NULL,
    //     createdAt DATETIME NOT NULL,
    //     updatedAt DATETIME NOT NULL,
    //     primary key(id),
    //     foreign key(userId) references users(id)
    // );

    // CREATE TABLE Dota2
    // (
    //     id varchar(45) NOT NULL UNIQUE,
    //     userId varchar(45) NOT NULL,
    //     steamid varchar(45) NOT NULL,
    //     communityvisibilitystate int NOT NULL,
    //     profilestate int NOT NULL,
    //     personaname varchar(45) NOT NULL,
    //     lastlogoff BIGINT,
    //     commentpermission int,
    //     profileurl varchar(100) NOT NULL,
    //     avatar varchar(100),
    //     avatarmedium varchar(100),
    //     avatarfull varchar(100),
    //     personastate int,
    //     primaryclanid varchar(45),
    //     timecreated BIGINT NOT NULL,
    //     personastateflags int,
    //     isVerified boolean,
    //     messages VARCHAR(255),
    //     createdAt DATETIME NOT NULL,
    //     updatedAt DATETIME NOT NULL,
    //     primary key(id),
    //     foreign key(userId) references users(id)
    // );

    // CREATE TABLE Cashier
    // (
    //     id varchar(45) NOT NULL UNIQUE,
    //     userId varchar(45) NOT NULL,
    //     realMoney REAL NOT NULL,
    //     inRealMoney REAL NOT NULL,
    //     bonusMoney REAL NOT NULL,
    //     playMoney REAL NOT NULL,
    //     inPlayMoney REAL NOT NULL,
    //     mvpCoins BIGINT NOT NULL,
    //     vipStatus int NOT NULL,
    //     vipProgress REAL NOT NULL,
    //     createdAt DATETIME NOT NULL,
    //     updatedAt DATETIME NOT NULL,
    //     primary key(id),
    //     foreign key(userId) references users(id)
    // );

    // CREATE TABLE users
    // (
    //     id varchar(45) not null sortkey,
    //     username varchar(45) NOT NULL,
    //     password varchar(255) NOT NULL,
    //     email varchar(100) NOT NULL,
    //     displayName varchar(30),
    //     avatar varchar(100) NOT NULL,
    //     birthdate DATE,
    //     hmac varchar(100),
    //     gsId varchar(100),
    //     createdAt DATETIME NOT NULL,
    //     updatedAt DATETIME NOT NULL,
    //     primary key(id)
    // ) diststyle all;

    // CREATE TABLE nationality
    // (
    //     id varchar(45) NOT NULL UNIQUE,
    //     userId varchar(45) NOT NULL,
    //     isoCode varchar(45),
    //     name varchar(30),
    //     createdAt DATETIME NOT NULL,
    //     updatedAt DATETIME NOT NULL,
    //     primary key(id),
    //     foreign key(userId) references users(id)
    // );

  }

}
