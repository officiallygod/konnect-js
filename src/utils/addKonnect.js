// Import Admin SDK
var admin = require("firebase-admin");

// var serviceAccount = require("../permissions/permissions.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://konnect-officiallygod-default-rtdb.firebaseio.com"
// });

const db = admin.firestore();
const request = require('request');


const formatDate = (dateString) => {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
}

const addData = async (data, callback) => {

    try {

        var isValidId = false;
        var givenUID = data.uid;

        if (givenUID == undefined) {
            return callback("No UID was Provided", undefined)
        }

        var date = new Date();
        var currentTime = date.getTime()

        let today = new Date(currentTime)
        var finalDate = formatDate(today)

        data["time"] = finalDate

        admin.auth().listUsers().then(async(userRecords) => {
            userRecords.users.forEach(function (user) {
                if (givenUID == user.uid) {
                    isValidId = true;
                }
            });

            if (isValidId) {
                await db.collection('konnects').doc('/' + data.uid + '/').collection("requests").doc()
                    .create(data);

                return callback(undefined, 200)
            } else {
                return callback("UID is not valid", undefined)
            }
        }).catch((error) => console.log(error));

    } catch (error) {
        console.log(error)
        return callback(500, undefined)
    }


}

module.exports = addData