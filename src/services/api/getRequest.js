export const sendGetRequest = async (http, path) => {
    try {
        return await http.get(path, { headers: { 'Content-Type': 'application/json' } }) 
    } catch (error) {
        if (error.response.status === 404) {
            alert("Запрашиваемый ресурс не найден, попробуйте еще раз")
        }
        if (error.response.status === 500) {
            alert(error.response.data)
        }
        throw error
    }
}