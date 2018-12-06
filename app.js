// Initializing dom elements
const inputValue = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

// Dom elements for container A
const container_A_name = document.querySelector(".main_column_A_name");
const container_A_username = document.querySelector(".main_column_A_username");

// Dom elements for container B
const container_B_locat = document.querySelector(".main_column_B_location");
const container_B_orgs = document.querySelector(".main_column_B_organizations");

// Dom element image for container C
const container_C_img = document.querySelector(".main_column_C_image");

// Dom elements for container D
const container_D_followers = document.querySelector(".main_column_D_followers");
const container_D_following = document.querySelector(".main_column_D_following");

// Dom elements for container E
const container_E_bio = document.querySelector(".main_column_E_bio");


const container_F = document.querySelector(".main_column_F");

// Github API Tokens
// Get tokens from registering an app on github 
const client_id = "xxxxxxxxxxxxxxxxxxxx";
const client_secret = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

const grabUsers = async (user) => {
    const api_call = await fetch(`https://api.github.com/users/${user}
    ?client_id=${client_id}
    &client_secret=${client_secret}`);

    const data = await api_call.json();
    return { data: data }
};

const showData = () => {
    grabUsers(inputValue.value).then((res) => {
        console.log(res);

        // container A
        if ( nullRes(res.data.name) ) {
            container_A_name.innerHTML = `<span class="cont-font ">Name: &nbsp </span>${res.data.name}`
        } else {
            container_A_name.innerHTML = `<span class="cont-font ">Name: &nbsp </span> Not available`
        } 
        container_A_username.innerHTML = `<span class="cont-font ">Username: &nbsp </span>${res.data.login}`

        // container B
        // conditions for location
        if ( nullRes(res.data.location)) {
            container_B_locat.innerHTML = `<span class="cont-font ">Location: &nbsp </span>${res.data.location}`
        } else {
            container_B_locat.innerHTML = `<span class="cont-font ">Location: &nbsp </span> Not available`
        }

        // conditions for organizations
        if ( nullRes(res.data.company) ) {
            container_B_orgs.innerHTML = `<span class="cont-font ">Organizations: &nbsp </span>${res.data.company}`
        } else {
            container_B_orgs.innerHTML = `<span class="cont-font ">Organizations: &nbsp </span> none`
        }

        // container C
        container_C_img.innerHTML = `<img class="cont_C-img" src=${res.data.avatar_url}>`

        // container D
        // follower & following container
        // TODO: Add conditionals for if followers & following == 0
        container_D_followers.innerHTML = `<span class="cont-font "> Followers: &nbsp </span>${res.data.followers}`
        container_D_following.innerHTML = `<span class="cont-font "> Following: &nbsp </span>${res.data.following}`

        // container E
        // conditions for user bio
        if ( nullRes(res.data.bio) ) {
            container_E_bio.innerHTML = `<span class="cont-font ">Bio: &nbsp </span>${res.data.bio}`
        } else {
            container_E_bio.innerHTML = `<span class="cont-font ">Bio: &nbsp </span><p class="font-noto"> none </p>`
        }

        
        
        
    }) 
}

const nullRes = (data) => {
    if (data !== null) {
        return true;
    } else {
        return false;
    }
}

searchButton.addEventListener("click", () => {
    showData();
})