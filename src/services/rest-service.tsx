
const API_URL = "https://jsonplaceholder.typicode.com/";

export function Get(route: string) {
    return fetch(`${API_URL}${route}`).then(data => data.json());
}