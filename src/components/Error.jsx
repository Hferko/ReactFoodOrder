import Button from "./UI/Button"

export default function Error({ title, message, close }) {
    return <div className="fincsi">
        <h3>{title}</h3>
        <p>{message}</p>
        <Button onClick={close}>Rendben</Button>
    </div>
}