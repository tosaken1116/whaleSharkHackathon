const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp(functions.config().firebase);

const createUser = `
mutation createuser($id: String!, $email: String!, $iconPath: String!, $userName: String!) {
    insertUsersOne(object: {id: $id, email: $email, userName: $userName, iconPath: $iconPath}, onConflict: {constraint: Users_pkey, updateColumns: []}) {
      id
      email
    }
  }

`;

exports.processSignUp = functions.auth.user().onCreate((user) => {
    let customClaims;
    customClaims = {
        "https://hasura.io/jwt/claims": {
            "x-hasura-default-role": "user",
            "x-hasura-allowed-roles": ["user"],
            "x-hasura-user-id": user.uid,
        },
    };

    return admin
        .auth()
        .setCustomUserClaims(user.uid, customClaims)
        .then(() => {
            let queryStr = {
                query: createUser,
                variables: {
                    id: user.uid,
                    email: user.email,
                    iconPath: user.photoURL,
                    userName: user.displayName,
                },
            };

            axios({
                method: "post",
                url: "https://whale-shark.hasura.app/v1/graphql",
                data: queryStr,
                headers: {
                    "x-hasura-admin-secret":
                        process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ADMIN_SECRET,
                },
            });

            admin.firestore().collection("user_meta").doc(user.uid).create({
                refreshTime: admin.firestore.FieldValue.serverTimestamp(),
            });
        })
        .catch((error) => {
            console.log(error);
        });
});
