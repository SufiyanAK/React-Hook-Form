import { useForm } from 'react-hook-form'

interface IYupForm {
    username: string
    email: string
    channel: string
}

const initialValues: IYupForm = {
    username: '',
    email: '',
    channel: ''
}

let watchCount: number = 0
const Form = () => {
    const { register, handleSubmit } = useForm<IYupForm>({
        defaultValues: initialValues
    })
    // const [formData, setFormData] = useState<IYupForm>(initialValues)
    // const [watchCount, setWatchCount] = useState<number>(0)


    // const handleChange = useCallback((key: string, value: string) => {
    //     setFormData({ ...formData, [key]: value })
    // }, [formData])

    const onSubmit = (data: IYupForm) => {
        console.log(data)
    }

    watchCount++
    return (
        <div className="formBody" >
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <h1 style={{ color: '#f0f0f0', fontSize: '3rem', marginBottom: '1.4rem' }}>Re-Render Count: {watchCount}</h1>
                {/* <h2 style={{ color: '#f0f0f0', fontSize: '2rem', marginBottom: '1.4rem' }}>Watched Value: {watchUsername}</h2> */}

                <div className="formFields">
                    <label className="label" htmlFor="username">Username</label>
                    <input
                        className="input"
                        id="username"
                        type="text"
                        {
                        ...register("username")
                        }
                    />
                </div>

                <div className="formFields">
                    <label className="label" htmlFor="email">Email</label>
                    <input
                        className="input"
                        id="email"
                        type="text"
                        {
                        ...register("email")
                        }
                    />
                </div>

                <div className="formFields">
                    <label className="label" htmlFor="channel">Channel</label>
                    <input
                        className="input"
                        id="channel"
                        type="text"
                        {
                        ...register("channel")
                        }
                    />
                </div>
                <button className="submitBtn">Submit</button>
            </form>
        </div >
    )
}

export default Form