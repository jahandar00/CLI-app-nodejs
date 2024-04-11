import readline from "readline";
import https from "https";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


function generateRandomNumber(min, max) {
    // Generate a random number between min (inclusive) and max (exclusive)
    return Math.floor(Math.random() * (max - min) + min);
}


const jokeCategories = () => {
    const req = https.request("https://api.chucknorris.io/jokes/categories",
    function (res) {
        let data = '';
        res.on("data", function (chunk) {
            data += chunk;
        });
        res.on("end", function () {
            for(let i = 0; i < JSON.parse(data).length; i++){
                console.log(`${i + 1}. ${JSON.parse(data)[i]}`);
            }
            ;
        });
    });

    req.on("error", function (error) {
        console.error("Error making request:", error);
    });

    req.end();
}

const jokeCategoryRequest = (category) => {
    const req = https.request(`https://api.chucknorris.io/jokes/search?query=${category}`,
    function (res) {
        let data = '';
        res.on("data", function (chunk) {
            data += chunk;
        });
        res.on("end", function () {
            const parsedData = JSON.parse(data)
            const randomNumber = generateRandomNumber(1, parsedData.result.length);
            console.log(parsedData.result[randomNumber].value);
            
        });
    });

    req.on("error", function (error) {
        console.error("Error making request:", error);
    });

    req.end();
}


rl.question("What is your name? ", function(name){
    rl.question(
        "Hi, " + name + ", do you want to hear some jokes? [Y/N] ",
        function (answer) {
            if(answer === "Y"){
                jokeCategories()
                rl.question("Select one of the categories below:\n ", function(caterogy){
                    jokeCategoryRequest(caterogy);
                })
                
            } else {
                console.log("Get the hell out of here!");
                rl.close();
            }
        }
    )
})