declare module '*.css' {
  const content: any
  export default content
}

declare module '*module.css' {
  const styles: {
    [className: string]: string
  }
  export default styles
}

declare module '*.webm' {
  const src: string
  export default src
}
