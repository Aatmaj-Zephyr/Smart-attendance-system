let html5QrcodeScanner ;


onScanSuccess("SRS+12334")
function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
    //window.alert(decodedText);
    window.sessionStorage.setItem("Result", ""+decodedText);
    
    decodedText = decodedText.split('+');
    var faculty = decodedText[0]
    var rollno = "100"
    var time = decodedText[1]
    //stop scanning
    var firebaseConfig = {
      apiKey: "AIzaSyBFLmpBv9Ipmte8_97pX7rGLMgmpxxgHa4",
    authDomain: "smart-attendance-system-108f7.firebaseapp.com",
    databaseURL: "https://smart-attendance-system-108f7-default-rtdb.firebaseio.com",
    projectId: "smart-attendance-system-108f7",
    storageBucket: "smart-attendance-system-108f7.appspot.com",
    messagingSenderId: "392843269622",
    appId: "1:392843269622:web:9ccf2f26c000980986a3d7",
    measurementId: "G-50KC8EXP33"
    };
    // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
    //put in firebase
    var database = firebase.database();
    var messagesRef = database.ref(faculty);
    var data = {};

    data[rollno] = time;

    messagesRef.set(data);
    
   // window.location.href="./success.html"
    

  }
  
  function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
  }
  
  document.getElementById("scanButton").addEventListener("click", function () {

    // Ensure that html5QrcodeScanner is initialized before calling render
    if (html5QrcodeScanner) {
      html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    }
    else{
        console.log("Error htmlqrcodeScanner is not initialized");
    }
  });
  


  window.onload = function() { //default running
    
     html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 15, qrbox: {width: 400, height: 400} , facingmode:"environment"},
        /* verbose= */ false
      );
    
  }