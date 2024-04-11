import readline from "readline";
import https from "https";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// const jokeGenerator = () => {
//     const req = https.request("https://api.chucknorris.io/jokes/random",
//     function (res) {
//         let data = '';
//         res.on("data", function (chunk) {
//             data += chunk;
//         });
//         res.on("end", function () {
//             console.log(JSON.parse(data).value);
//         });
//     });

//     req.on("error", function (error) {
//         console.error("Error making request:", error);
//     });

//     req.end();
// }

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
            console.log(JSON.parse(data));
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
                rl.question("Select one of the categories below: ", function(caterogy){
                    jokeCategoryRequest(caterogy);
                });
                jokeCategories();
                
            } else {
                console.log("Get the hell out of here!");
                rl.close();
            }
        }
    )
})