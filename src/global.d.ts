declare global {
    var language: string
}
declare module '*.i18n' {
    const value: string; // markdown is just a string
    export default value;
}
export {}