function extrairFormulario(doc) {
    let div = document.querySelector("#res");
    let forms = doc.querySelectorAll('[id="search-form"]');
    forms.forEach(form => {
            div.appendChild(form.cloneNode(true));
        });
}

function baixarimagem(urlimg){
    fetch(urlimg)
        .then(resp =>{
            return resp.blob()
        })
        .then(blob =>{
            const imageObjectURL = URL.createObjectURL(blob)
            let img = document.createElement("img")
            img.src = imageObjectURL
            document.querySelector("#res").appendChild(img)
        })
}

function fetchimg(){
    const gifs = ["guestbook4.gif", "sponsor.gif"]
    gifs.forEach(gif => {
        baixarimagem("https://theoldnet.com/images/"+gif)
    })
}

function fetchform(){
    fetch("https://theoldnet.com/")
        .then(resp => {
            if(resp.status != 200){
                throw new Error("Problemas no servidor")
            }
            return resp.text();
        })
        .then(text =>{
            let d = new DOMParser();
            let doc = d.parseFromString(text,"text/html");
            console.log(doc);
            extrairFormulario(doc);
        })
        .catch(err =>{
            document.querySelector("#res").innerHTML = err.message;
        })
}

function main(){
     document.querySelector("#btn").addEventListener("click", fetchform);
     document.querySelector("#btnimg").addEventListener("click",fetchimg);
}
window.onload = main