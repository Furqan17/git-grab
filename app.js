// Initializing dom elements
const inputValue = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

// Dom elements for container A
const container_A_name = document.querySelector(".main_column_A_name");
const container_A_username = document.querySelector(".main_column_A_username");

// Dom elements for container B
const container_B_locat = document.querySelector(".main_column_B_location");
const container_B_bio = document.querySelector(".main_column_B_bio");
const container_B_orgs = document.querySelector(".main_column_B_organizations");

// Dom element image for container C
const container_C_img = document.querySelector(".main_column_C_image");


const container_D = document.querySelector(".main_column_D");
const container_E = document.querySelector(".main_column_E");
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

        // container A changes
        if (res.data.name !== null) {
            container_A_name.innerHTML = `<span class="cont-font font-noto">Name: &nbsp </span>${res.data.name}`
        } else {
            container_A_name.innerHTML = `<span class="cont-font font-noto">Name: &nbsp </span> Not available`
        }
        container_A_username.innerHTML = `<span class="cont-font font-noto">Username: &nbsp </span>${res.data.login}`

        // container B changes
        // conditions for location
        if (res.data.locat !== null ) {
            container_B_locat.innerHTML = `<span class="cont-font font-noto">Location: &nbsp </span>${res.data.location}`
        } else {
            container_B_locat.innerHTML = `<span class="cont-font font-noto">Location: &nbsp </span> Not available`
        }

        // conditions for organizations
        if (res.data.orgs !== null ) {
            container_B_orgs.innerHTML = `<span class="cont-font font-noto">Organizations: &nbsp </span>${res.data.company}`
        } else {
        container_B_orgs.innerHTML = `<span class="cont-font font-noto">Organizations: &nbsp </span>${res.data.company}`
        }

        // conditions for user bio
        if (res.data.bio !== null) {
            container_B_bio.innerHTML = `<span class="font-noto"> ${res.data.bio}</span>`
        } else {
            container_B_bio.innerHTML = ``
        }

        // container C changes
        container_C_img.innerHTML = `<img class="cont_C-img" src=${res.data.avatar_url}>`
        
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