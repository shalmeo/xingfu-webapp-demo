export const sendUpdateRequest = async (http, path, data) => {
    try {
        return await http.put(path, data)
    } catch (error) {
        if (error.response.status === 409) {
            alert(error.response.data.detail)
        }
        if (error.response.status === 422) {
            alert("Проверьте правильность ввода полей")
        }
        if (error.response.status === 404) {
            alert("Пользователь не найден, попробуйте еще раз")
        }
        if (error.response.status === 500) {
            alert(error.response.data)
        }
        throw error
    }
}