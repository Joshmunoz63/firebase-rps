// firebase
  var firebaseConfig = {
    apiKey: "AIzaSyBEc-Te-5NjDc3TfPdCvCGVj9Z4-obS97k",
    authDomain: "fir-rps-76a87.firebaseapp.com",
    databaseURL: "https://fir-rps-76a87.firebaseio.com",
    projectId: "fir-rps-76a87",
    storageBucket: "",
    messagingSenderId: "161250234998",
    appId: "1:161250234998:web:da1eefc5094d3f0c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


$(document).ready(function () {
    
    const statusText = $("#status-text");

    // Create variables
    let database, connections, chat;
    let userID = "";
    let oppSelection = "";
    let username = "";
    let selection = "";

    // on click events
    $(document).on("click", "#submit", init);
    $(document).on("click", "#send", sendMessage);
    

    function init(event) {
        // Stop page refreshing
        event.preventDefault();

        firebase.initializeApp(firebaseConfig);

        database = firebase.database();

        chat = database.ref("/chat");

        chat.on("child_added", appendMessage);

        connections = database.ref("/connections");
        let connected = database.ref(".info/connected");

        connected.on("value", connect);


    }

    function connect(snapshot) {
        // Check if connected
        if (snapshot.val()) {
            // Obtain username
            username = $("#username").val().trim();

            // Initalize user settings
            let settings = {
                username: username,
                selection: selection
            };

            // Add user to the connections list
            let user = connections.push(settings);

            // Store userID
            userID = user.key;

            // Remove user from the connection list when they disconnect
            user.onDisconnect().remove();
        }
    }

    function sendMessage(event) {
        // Stop page refreshing
        event.preventDefault();

        // Get player's message
        let msg = $("#message").val().trim();

        // Prevent empty messages being added
        if (msg === "") {
            return;
        }

        // Create chat entry
        let entry = {
            from: username,
            message: msg,
            timestamp: moment().format("x")
        };

        // Add new message
        chat.push(entry);

        // Empty message field
        $("#message").val("");
    }

    /*
     *   Adds all messages to chat log on the client's side.
     */
    function appendMessage(snapshot) {
        // Create snapshot value variable
        let val = snapshot.val();

        // Obtain message values (username of sender, text, and time sent)
        let from = val.from;
        let msg = val.message;
        let timestamp = moment(val.timestamp, "x").format("MMM Do, YYYY hh:mm:ss");

        // Create a p tag to store message
        let p = $("<p>")
            .addClass("mb-0")
            .text(
                from + " [" + timestamp + "]: " + msg
            );

        // Add message to chat log
        $("#messages").append(p);
    }
// game 
    document.onkeyup = function(event) {
        debugger;

        var userGuess = event.key;

        if ((userGuess === "r") || (userGuess === "p") || (userGuess === "s")) {
  
          if ((userGuess === "r" && userGuess2 === "s") ||
            (userGuess === "s" && userGuess2 === "p") || 
            (userGuess === "p" && userGuess2 === "r")) {
            wins++;
          } else if (userGuess === userGuess2) {
            ties++;
          } else {
            losses++;
          }
});
