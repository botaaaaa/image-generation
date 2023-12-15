const generatedForm = document.querySelector(".generate-form")
const image = document.querySelector(".image")
const aiKey = "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"



const updtadeImageCard = (imgArray) => {
    imgArray.forEach((imgObject, index) => {

        const imgCard = image.querySelectorAll(".card")[index]
        const imgElement = imgCard.querySelector("img")
        const downloadBtn = imgCard.querySelector(".download-btn")
        const aiGenerateImage = `data:image/jpeg;base64,${imgObject.b64_json}`

        imgElement.src = aiGenerateImage

        imgElement.onload = () => {
            imgCard.classList.remove("loading");
            downloadBtn.setAttribute("href", aiGenerateImage)
            downloadBtn.setAttribute("download", `${new Date().getTime()}.jpg`)

        }
    });
}


const generateImage = async (userinput, imageQuantity) => {
    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${aiKey}`
            },
            body: JSON.stringify({
                prompt: userinput,
                n: parseInt(imageQuantity),
                size: "512x512",
                response_format: "b64_json"
            })
        })

        if (!response.ok) throw new Error("failed to load");

        const { data } = await response.json()

        updtadeImageCard([...data]);

    } catch (error) {
        console.log(error);
    }

}


const loadingCard = (e) => {

    e.preventDefault()
    const userinput = e.srcElement[0].value;
    const imageQuantity = e.srcElement[1].value;

    const card = Array.from({ length: imageQuantity }, () =>
        `<div class="card loading">
   <img src="assets6/loader.svg" alt="">
   <a href="" class="download-btn">
       <img src="assets6/download.svg" alt="">
   </a>
</div>`
    ).join("")

    image.innerHTML = card;

    generateImage(userinput, imageQuantity)
}


generatedForm.addEventListener("submit", loadingCard)