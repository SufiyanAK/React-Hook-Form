import { FieldErrors, useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const Schema = yup.object({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Email format is not valid").required("Email in required"),
    channel: yup.string().required("Channel is required")
})

interface IYupForm {
    username: string
    email: string
    channel: string
}

let render = 0

const YupForm = () => {
    const form = useForm<IYupForm>({
        defaultValues: {
            username: "",
            email: "",
            channel: ""
        },
        resolver: yupResolver(Schema)
    })
    const { register, control, handleSubmit, formState: { errors } } = form

    const onSubmit = (data: IYupForm) => {
        console.log(data)
    }

    const onError = (errors: FieldErrors<IYupForm>) => {
        console.log(errors)
    }

    render++
    return (
        <div className="formBody">
            <form onSubmit={handleSubmit(onSubmit, onError)} className="form">
                <h1 style={{ color: '#f0f0f0', fontSize: '3rem', marginBottom: '1.4rem' }}>Yup Form: {render}</h1>
                {/* <h2 style={{ color: '#f0f0f0', fontSize: '2rem', marginBottom: '1.4rem' }}>Watched Value: {watchUsername}</h2> */}

                <div className="formFields">
                    <label className="label" htmlFor="username">Username</label>
                    <input
                        className="input"
                        id="username"
                        type="text"
                        {
                        ...register("username", {
                            required: {
                                value: true,
                                message: "Username is required"
                            }
                        })
                        }
                    />
                    <p
                        style={{
                            color: 'red',
                            width: '100%',
                            fontSize: '1.5rem',
                        }}
                    >
                        {errors.username?.message}
                    </p>
                </div>

                <div className="formFields">
                    <label className="label" htmlFor="email">Email</label>
                    <input
                        className="input"
                        id="email"
                        type="text"
                        {
                        ...register("email", {
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid Email"
                            },
                            validate: {
                                notAdmin: (fieldValue) => {
                                    return fieldValue !== "admin@example.com" || "Enter a valid Email address"
                                },
                                notGmail: (fieldValue) => {
                                    return !fieldValue.endsWith("@hotmail.com") || "Enter a valid Domain"
                                }
                            }
                        })
                        }
                    />
                    <p
                        style={{
                            color: 'red',
                            width: '100%',
                            fontSize: '1.5rem',
                        }}
                    >
                        {errors.email?.message}
                    </p>
                </div>

                <div className="formFields">
                    <label className="label" htmlFor="channel">Channel</label>
                    <input
                        className="input"
                        id="channel"
                        type="text"
                        {
                        ...register("channel",
                            {
                                required: {
                                    value: true,
                                    message: "Channel is required"
                                }
                            }
                        )
                        }
                    />
                    <p
                        style={{
                            color: 'red',
                            width: '100%',
                            fontSize: '1.5rem',
                        }}
                    >
                        {errors.channel?.message}
                    </p>
                </div>
                <button className="submitBtn">Submit</button>
            </form>
            <DevTool control={control} />
        </div>
    )
}

export default YupForm