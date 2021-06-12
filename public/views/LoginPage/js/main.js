var firebaseConfig = {
    apiKey: "AIzaSyBRbiFdYbI13Ar2lOru5-HqMFSkf3rHDKM",
    authDomain: "eshop-358c5.firebaseapp.com",
    databaseURL: "https://eshop-358c5-default-rtdb.firebaseio.com",
    projectId: "eshop-358c5",
    storageBucket: "eshop-358c5.appspot.com",
    messagingSenderId: "844303338405",
    appId: "1:844303338405:web:0eb9dbf5cc44913bd8b64c",
    measurementId: "G-M47CJ32FGP"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

(function ($) {
    "use strict";

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        //if (check == true) {
           
        //}

        if (check == true) {
            window.alert("Congrats!")
        }
        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);

function signIn() {
    var check = true;

    console.log("yeal")
    var email = $("#email").val();
    var password = $("#password").val();

    var result = firebase.auth().signInWithEmailAndPassword(email, password);
    result.catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        
        check = false
        window.alert(errorMessage);
    });

    if (check) {
        window.alert("Congrats!");
    }
}