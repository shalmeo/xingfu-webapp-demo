export const initWebApp = (button, onClick) => {
    window.Telegram.WebApp.expand()
    const MainButton = window.Telegram.WebApp.MainButton
    MainButton.setText(button)
    MainButton.show()
    MainButton.onClick(async () => {
        try {
            await onClick()
            window.Telegram.WebApp.close()
        } catch (error) {
            console.log(error)
        }
    })
}