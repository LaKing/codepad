// used for the demo page

let c = 0;

const Positives = [
    "Do you want to read a TCP joke?",
    "Is it OK if I send you a TCP joke?",
    "Socket.Io is ready to send you a TCP joke!",
    "Are you ready to read a TCP joke?",
    "is the Socket.Io client ready to recieve a TCP joke?",
    "OK, I'm about to send the TCP joke. It will last 10 seconds, it has two characters, it does not have a setting, it ends with a punchline.",
    "Preparing to send the TCP joke!",
    "The TCP joke has been prepared in two TCP packets!",
    "I'm sorry, your connection has timed out. Would you like to read another TCP joke?"
];

const Negatives = [
    "Would you reconsider to read a TCP joke?",
    "Is it OK if I still send you a TCP joke?",
    "However, Socket.Io is ready to send you a TCP joke!",
    "Are you sure you are not ready to read a TCP joke?",
    "Socket.Io client is not ready to recieve a TCP joke?",
    "OK, I'm not going to send the TCP joke. It would last 10 seconds, it would have two characters, it would not have a setting, it would end with a punchline.",
    "I already prepared to send you the TCP joke, may I continue?",
    "The TCP joke is already prepared in two packets, may I send you the TCP joke?",
    "I'm sorry, your connection has timed out. Would you like to read another TCP joke?"
];

function get_positive() {
    c++;
    return Positives[c % Positives.length];
}
function get_negative() {
    c--;
    if (c < 0) c = Negatives.length;
    return Negatives[c % Negatives.length];
}

module.exports = function(socket) {
    socket.on("answer", function(data) {
        let next_question = "Pardon?";
        if (data === true) next_question = get_positive();
        if (data === false) next_question = get_negative();

        socket.emit("question", next_question);
    });
};
