export default function ({ store, redirect, route }) {
    try{
      const auth = store.state.auth;
      console.log(auth);
    } catch(e){
      console.log("Exception: ", e);
    }
  }