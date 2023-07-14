const API_KEY="67a5546b46e041bdb1623732267c03ce";
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener("load", ()=>fetchNews("India"));
function reload(){
    window.location.reload();
}
async function fetchNews(query){
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data= await res.json();
    bindData(data.articles);
}
function bindData(articles){
    const cardscontainer=document.getElementById("cards-container");
    const newstemp=document.getElementById("template-news-card");
    cardscontainer.innerHTML="";
    articles.forEach((article) =>{
        if(!article.urlToImage)return;
        const cardclone=newstemp.content.cloneNode(true);
        fillDataInCard(cardclone, article);
        cardscontainer.appendChild(cardclone);
    });

}
function fillDataInCard(cardclone,article){
    const newsimg = cardclone.querySelector('#newsimg');
    const newstitle = cardclone.querySelector('#title');
    const newssource = cardclone.querySelector('#source');
    const newsdesc = cardclone.querySelector('#news-desc');
    newsimg.src=article.urlToImage;
    newstitle.innerHTML=article.title;
    newsdesc.innerHTML=article.description;
    const date=new Date(article.publishedAt).toLocaleString("en-US",{timeZone:"Asia/Jakarta"});
   newssource.innerHTML=`${article.source.name} . ${date}`;
   cardclone.firstElementChild.addEventListener('click',()=>{
    window.open(article.url,"_blank");
   });
}
let curSelectedNav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');
}
const searchbtn=document.getElementById('search-btn');
const searchtxt=document.getElementById('news-input');
searchbtn.addEventListener('click',()=>{
    const query=searchtxt.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=null;
})