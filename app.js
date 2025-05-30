
const btn=document.querySelector("form button");

const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");




const dropdowns=document.querySelectorAll(".dropdown select");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        
        newOption.innerText=currCode;
        newOption.value=currCode;

        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
   }

   select.addEventListener("change",(evt)=>{
    updateflag(evt.target);
   })
}


const updateflag = (element) => {
    let currCode = element.value;
    let countrycode= countryList[currCode];
    console.log(countrycode);
    let newsrc = `https://flagsapi.com/${countrycode}/shiny/64.png`;
    console.log(newsrc);
    let img = element.parentElement.querySelector("img");
    console.log(img);
    img.src=newsrc;
    console.log(img);
}

btn.addEventListener("click", async (evt) =>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtvalue =amount.value;
    if(amtvalue==="" || amtvalue<1){
        amtvalue=1;
        amount.value="1";
    }

 const baseurl=`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromcurr.value.toLowerCase()}.json`;

let response = await fetch(baseurl);

let data = await response.json();

let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
console.log(rate);

let finalamt = amtvalue*rate;

document.querySelector(".msg").innerText= `${amtvalue} ${fromcurr.value} = ${finalamt.toFixed(2)} ${tocurr.value}`;
});
