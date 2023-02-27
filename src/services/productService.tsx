export function getProducts() {
    return fetch(`/api/data`).then(response => response.json())
}