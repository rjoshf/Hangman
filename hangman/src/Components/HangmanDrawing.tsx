import styles from './HangmanDrawing.module.css'

const HEAD = (
    <div className={styles.head}/>
)

const BODY = (
    <div className={styles.body}/>
)

const RIGHT_ARM = (
    <div className={styles.rightarm}/>
)

const LEFT_ARM = (
    <div className={styles.leftarm}/>
)

const RIGHT_LEG = (
    <div className={styles.rightleg}/>
)

const LEFT_LEG = (
    <div className={styles.leftleg}/>
)

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG]

type HangmanDrawingProps = {
    numberOfGuesses: number
}

export function HangmanDrawing({numberOfGuesses}: HangmanDrawingProps) {
    return <div style={{position: "relative"}}>
        {BODY_PARTS.slice(0, numberOfGuesses)}
        <div className={styles.noose}/>
        <div className={styles.horizontalline}/>
        <div className={styles.verticalline}/>
        <div className={styles.stand}/>
    </div>
}