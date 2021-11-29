

// Require & then initialize
const firebaseClient = require('firebase/app');
firebaseClient.initializeApp(JSON.parse(process.env.FIREBASE_CLIENT_CONFIG));
const {getAuth, signInWithEmailAndPassword} = require('firebase/auth');

// Initialized elsewhere, just require it & that's it
const firebaseAdmin = require('firebase-admin');

// Call it by saying things like 
// signUpUser({username:"Something", email:"something@web.com", password:"Password1"})
async function signUpUser(userDetails){
    return firebaseAdmin.auth().createUser({
        email: userDetails.email,
        password: userDetails.password,
        displayName: userDetails.username,
        emailVerified: true,
        // photoURL: "somefreestockwebsite.com/image/someimage.png"
    }).then(async (userRecord) => {
        // Set a "custom claim", or authorization/role data 
        let defaultUserClaims = firebaseAdmin.auth().setCustomUserClaims(userRecord.uid, {admin:false, regularUser:true}).then(() => {
            console.log("Set default claims to the new user.");
        })
        return userRecord

    }).catch(error => {
        console.log(`Internal sign-up function error is:\n${error}`);
        return {error:error};
    })
}

// We assume everything inside UserDetails are all good
async function signInUser(userDetails){
  const firebaseClientAuth = getAuth();

  let signInResult = signInWithEmailAndPassword(firebaseClientAuth, userDetails.email, userDetails.password).then(async (userCredential) => {
    // Can get a user friendly version
    let userIdToken = await firebaseClientAuth.currentUser.getIdTokenResult(false)
    // Once we have token
    console.log(`userIdToken object is \n ${JSON.stringify(userIdToken)}`);
    return {
      idToken: userIdToken.token,
      // This is more about our current session
      refreshToken: userCredential.user.refreshToken,
      email: userCredential.user.email,
      emailVerified: userCredential.user.emailVerified,
      displayName: userCredential.user.displayName,
      photoURL: userCredential.user.photoURL,
      // Still need uid for database entry
      uid: userCredential.user.uid
    }
  }).catch(error => {
    console.log(`Internal sign-up function error is:\n${error}`);
        return {error:error};
  })

  return signInResult
}

module.exports = {
    signUpUser, signInUser
}