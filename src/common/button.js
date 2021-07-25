import './button.css';
const Button = (prop) => {
    return (
        <div className={prop.className}>
            {prop.label}
        </div>
    )
}
export default Button;