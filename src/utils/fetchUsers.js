function fetchUsers(url, data) {
    return fetch(url)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            return res;
        })
        .catch(error => {
            return error;
        })
}

export default fetchUsers;
