import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const quranApi = "https://api.quran.com/api/v4/verses/random?translations=131";
const hadithApi = "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-bukhari.json";

app.use(express.static("public"));
app.set("view engine", "ejs");


// Qur'an and Hadith API
app.get("/", async (req, res) => {
    try {
        const quranResponse = await axios.get(quranApi);
        const hadithResponse = await axios.get(hadithApi);
        // console.log("Hadith Response: ", hadithResponse.data);
        res.render("index.ejs", { ayah: quranResponse.data, hadith: hadithResponse.data });
        // console.log(JSON.stringify(response.data.verse.translations[0].text));
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("An error occurred while fetching data.");
        // console.log(error);
    }
})

app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`);
})