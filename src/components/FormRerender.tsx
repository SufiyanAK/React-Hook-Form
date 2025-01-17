import { useCallback, useState, memo } from "react"

interface IYupForm {
    username: string
    email: string
    channel: string
}

interface InputFieldProps {
    id: string
    value: string
    onChange: (key: string, value: string) => void
}

const InputField = memo(({ id, value, onChange }: InputFieldProps) => {
    return (
        <div className="formFields">
            <label className="label" htmlFor={id}>{id}</label>
            <input
                className="input"
                id={id}
                type="text"
                name={id}
                value={value}
                onChange={(e) => onChange(id, e.target.value)}
            />
        </div>
    )
})

const initialValues: IYupForm = {
    username: '',
    email: '',
    channel: ''
}

let watchCount: number = 0

const FormRerender = () => {
    const [formData, setFormData] = useState<IYupForm>(initialValues)

    const handleChange = useCallback((key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }))
    }, [])

    watchCount++
    return (
        <div className="formBody">
            <form className="form">
                <h1 style={{ color: '#f0f0f0', fontSize: '3rem', marginBottom: '1.4rem' }}>
                    Re-Render Count: {watchCount}
                </h1>

                <InputField
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <InputField
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <InputField
                    id="channel"
                    value={formData.channel}
                    onChange={handleChange}
                />

                <button className="submitBtn">Submit</button>
            </form>
        </div>
    )
}

export default memo(FormRerender)