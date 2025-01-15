import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

interface IFormInput {
    username: string;
    email: string;
    channel: string;
}

let renderCount: number = 0;

const YoutubeForm = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    // can use register like this: destructed on the component
    // const { name, onBlur, onChange, ref } = register("username");
    // Or can directly destructure it in the input field

    renderCount++

    const onSubmit = (data: IFormInput) => {
        console.log("formData: ", data)
    }
    return (
        <div className="formBody">
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <h1 style={{ color: '#f0f0f0', fontSize: '3rem', marginBottom: '1.4rem' }}>Youtube Form {renderCount}</h1>
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
                        marginBottom: '1.5rem'
                    }}
                >
                    {errors.username?.message}
                </p>

                {/* Like the first one */}
                {/* <input
                    className="input"
                    id="username"
                    type="text"
                    name={name}
                    ref={ref}
                    onBlur={onBlur}
                    onChange={onChange}
                    /> */}

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
                        }
                    })
                    }
                />
                <p
                    style={{
                        color: 'red',
                        width: '100%',
                        fontSize: '1.5rem',
                        marginBottom: '1.5rem'
                    }}
                >
                    {errors.email?.message}
                </p>

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
                        marginBottom: '1.5rem'
                    }}
                >
                    {errors.channel?.message}
                </p>

                <button className="submitBtn">Submit</button>
            </form>
            <DevTool control={control} />
        </div>
    )
}

export default YoutubeForm