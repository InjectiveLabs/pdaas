export default defineNuxtPlugin(() => {
    if (typeof window !== 'undefined') {
        // Some wallet libraries expect a Node-like global
        // Provide a minimal alias to the browser window object
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const w = window as any
        if (!w.global) w.global = w
    }
})


