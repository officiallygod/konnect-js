// Import Admin SDK
var admin = require("firebase-admin");

const db = admin.firestore();
const request = require('request');

const getData = async (data, callback) => {

    try {
            let query = db.collection('konnects').doc(data).collection("requests")
            let response = []
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;

                for (let doc of docs) {
                    const selectedItem = {
                        id: doc.id,
                        value: doc.data()
                    };
                    response.push(selectedItem)
                }
            });
            return callback(undefined, response)

        } catch (error) {

            console.log(error);
            return callback(500, undefined)
        }

}

module.exports = getData