document.addEventListener("DOMContentLoaded",()=>{
    renderUser();
})

function renderUser(){
    const form = document.querySelector("#github-form")
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        const username = document.querySelector("#search").value
        const user =username.split(" ").join("")
        fetch("https://api.github.com/search/users?q="+user)
        .then((response)=>response.json())
        .then((data)=>{
            userData = data
            displayUsers(userData)
            displayRepos(user)
            form.reset()

    })
    }) 
    
}
function displayUsers(userData){
    const ul = document.querySelector("#user-list")
    ul.innerHTML = null
    userData.items.forEach((user)=>{
        const li = document.createElement("li")
        const imgContainer=document.createElement("div")
        const avatar = document.createElement("img")
        avatar.addEventListener("click", (e)=>{
            const username = e.target.parentNode.lastChild.textContent
            displayRepos(username)
        })
        // const profileLink = document.createElement("a")
        // profileLink.href = user.html_url, profileLink.target="_blank";
        avatar.src = user.avatar_url
        imgContainer.style.height="100px",  
        imgContainer.style.display="flex", 
        imgContainer.style.marginBottom="10px";
        li.textContent = user.login, li.style.paddingLeft="20px", li.style.fontWeight="bold";
        ul.appendChild(imgContainer)
        imgContainer.appendChild(avatar);
        imgContainer.appendChild(li)
    })
}

function displayRepos(username){
    fetch("https://api.github.com/users/"+username+"/repos")
    .then((response)=>response.json())
    .then((data)=>{
        reposData = data;
        const ul = document.querySelector("#repos-list")
        ul.innerHTML = ""
    reposData.forEach((item)=>{      
        const repoLink = document.createElement("li")
        repoLink.innerHTML = `<a href="${item.html_url}" target="_blank" style ="text-decoration:none; color: black">${item.name}</a>`
        ul.appendChild(repoLink) 
    })
    const h1 = document.createElement('h1')
        h1.textContent=username +"'s repositories"
        ul.prepend(h1)
})

}

