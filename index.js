import readline from "readline";
import https from "https";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const jokeGenerator = () => {
    const req = https.request("https://api.chucknorris.io/jokes/random",
    function (res) {
        res.on("data", function (data) {
            console.log(JSON.parse(data.toString()));
        })
    }
)
}

rl.question("What is your name? ", function(name){
    rl.question(
        "Hi, " + name + ", do you want to hear some jokes? [Y/N] ",
        function (answer) {
            if(answer === "Y"){
                console.log("");
            } else {
                console.log("Get the hell out of here!");
                rl.close();
            }
        }
    )
})