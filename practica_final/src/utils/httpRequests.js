


export async function getDatos(url){
    const token = localStorage.getItem('jwt')
    
    const res = await fetch(url, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await res.json()

    return data
}

export async function postDatosWithoutToken(url, body){
    const res = await fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    return res
}

export async function postDatosWithToken(url, body){
    const token = localStorage.getItem('jwt')
    console.log(JSON.stringify(body))
    const res = await fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
    
    return res
}

export async function putDatos(url, body){
    const token = localStorage.getItem('jwt')
    const res = await fetch(url, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })

    return res
}

export async function patchLogoCliente(url, file){
    const formData = new FormData()
    console.log("URL: ", url)
    console.log("File: ", file)
    formData.append('image', file)
    const token = localStorage.getItem('jwt')
    const res = await fetch(url, {
        method: 'PATCH',
        headers:{
            'Authorization': `Bearer ${token}`
        },
        body: formData,
    })

    return res
}

export function deleteClient(url){
    const token = localStorage.getItem('jwt')
    fetch(url, {
        method: 'DELETE',
        headers:{
            'Authorization': `Bearer ${token}`
        },
    })
    
}

export function downloadPDF(url){
    const token = localStorage.getItem('jwt')
    const res = fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    
    return res
}