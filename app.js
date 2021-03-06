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

// Dom elements for container F
const container_F_repos = document.querySelector(".main_column_F_repos");
const container_F_gists = document.querySelector(".main_column_F_gists");

// Github API Tokens
// Get tokens from registering an app on github 
// https://github.com/settings/applications/new
const client_id = "xxxxxxxxxxxxxxxxxxxx";
const client_secret = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

// Fetch Users from github API -> into JSON
const grabUsers = async (user) => {
    const api_call = await fetch(`https://api.github.com/users/${user}
    ?client_id=${client_id}
    &client_secret=${client_secret}`);

    const data = await api_call.json();
    return { data: data }
};

// displays DOM data
const displayData = () => {
    grabUsers(inputValue.value).then((res) => {
        console.log(res);

        // Assign User bool
        let userBool = false;
        userBool = userExist(res.data);

        // Checks first if the user exists 
        if ( !userBool ) {
            // error message is shown
            container_B_locat.innerHTML = `<span class="cont-font ">User does not exist</span>`
            // if the user does not exist, all container are set to blank
            container_A_name.innerHTML = ""
            container_A_username.innerHTML = ""
            container_B_orgs.innerHTML = ""
            container_C_img.innerHTML = ""
            container_D_followers.innerHTML = ""
            container_D_following.innerHTML = ""
            container_E_bio.innerHTML = ""
            container_F_gists.innerHTML = ""
            container_F_repos.innerHTML = ""
        } else {
            // Means user exists and all user information is shown

            // ---
            // container A
            if ( nullRes(res.data.name) ) {
                container_A_name.innerHTML = `<span class="cont-font ">Name: &nbsp </span>${res.data.name}`
            } else {
                container_A_name.innerHTML = `<span class="cont-font ">Name: &nbsp </span> Not available`
            } 
            container_A_username.innerHTML = `<span class="cont-font ">Username: &nbsp </span>${res.data.login}`

            // ---
            // container B
            // conditions for location
            if ( nullRes(res.data.location)) {
                container_B_locat.innerHTML = `<span class="cont-font ">Location: &nbsp </span>${res.data.location}`
            } else {
                container_B_locat.innerHTML = `<span class="cont-font ">Location: &nbsp </span> Not available`
            }

            // conditions for organizations
            if ( nullRes(res.data.company) ) {
                container_B_orgs.innerHTML = `<span class="cont-font ">Organizations: &nbsp </span>
                <a href="https://api.github.com/users/${res.data.login}/orgs" target="_blank">${res.data.company}</a>`
            } else {
                container_B_orgs.innerHTML = `<span class="cont-font ">Organizations: &nbsp </span> none`
            }

            // ---
            // container C
            container_C_img.innerHTML = `<a href="https://github.com/${res.data.login}" target="_blank">
                <img class="cont_C-img" src=${res.data.avatar_url}><a/>`

            // ---
            // container D
            // followers container
            if ( res.data.followers == 0 ) {
                container_D_followers.innerHTML = `<span class="cont-font "> Followers: &nbsp </span> 
                    <a href="https://github.com/${res.data.login}?tab=followers" target="_blank">none</a>`
            } else {
                container_D_followers.innerHTML = `<span class="cont-font "> Followers: &nbsp </span>
                    <a href="https://github.com/${res.data.login}?tab=followers" target="_blank">${res.data.followers}</a>`
            }

            // following container
            if ( res.data.following == 0 ) {
                container_D_following.innerHTML = `<span class="cont-font "> Following: &nbsp </span> 
                    <a href="https://github.com/${res.data.login}?tab=following" target="_blank">none</a>`
            } else {
                container_D_following.innerHTML = `<span class="cont-font "> Following: &nbsp </span>
                    <a href="https://github.com/${res.data.login}?tab=following" target="_blank">
                        ${res.data.following}</a>`
            }

            // ---
            // container E
            // conditions for user bio
            if ( nullRes(res.data.bio) ) {
                container_E_bio.innerHTML = `<span class="cont-font ">Bio: &nbsp </span>${res.data.bio}`
            } else {
                container_E_bio.innerHTML = `<span class="cont-font ">Bio: &nbsp </span> none`
            }

            // ---
            // container F
            container_F_repos.innerHTML = `<span class="cont-font "> Public Respositories: &nbsp </span>
                <a href="https://github.com/${res.data.login}?tab=repositories" target="_blank">${res.data.public_repos}</a>`
            container_F_gists.innerHTML = `<span class="cont-font "> Public Gists: &nbsp </span>${res.data.public_gists}`
        }
    }) 
}

// Function to determine if res.data is null
const nullRes = (data) => {
    if (data !== null) {
        return true;
    } else {
        return false;
    }
}

// Function to determine if user exists
const userExist = (data) => {
    if (data.message == "Not Found") {
        return false;
    } else {
        return true;
    }
}

// Add eventlistener on Search button
searchButton.addEventListener("click", () => {
    displayData();
})