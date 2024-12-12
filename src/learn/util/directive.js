export default {
    install(app) {
        app.directive('color', (el, binding) => {
            el.style.color = binding.value
        })
    },
}

export function installPlugin(app) {
    app.directive('color2', (el, binding) => {
        el.style.color = binding.value
    })
}