import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

interface IFormInput {
    username: string;
    email: string;
    channel: string;
    social: {
        facebook: string;
        twitter: string;
    },
    phoneNumbers: string[];
    phNumbers: Array<{ number: string }>;
    age: number;
    dob: Date;
}

let renderCount: number = 0;

const YoutubeForm = () => {
    const { register, control, handleSubmit, formState: { errors, isDirty, isValid }, watch, getValues, setValue } = useForm<IFormInput>({
        defaultValues: {
            username: "Batman",
            email: "",
            channel: "",
            social: {
                facebook: "",
                twitter: ""
            },
            phoneNumbers: ["", ""],
            phNumbers: [{ number: "" }],
            age: 0,
            dob: new Date()
        }
    });

    const { fields, append, remove } = useFieldArray({
        name: "phNumbers",
        control,
    });

    // By this you can optimize it and prevents from re-rendering
    useEffect(() => {
        watch((data) => {
            console.log(data)
        })
    }, [watch])
    // It Accepts array of strings to watch
    // const watchUsername = watch(["username", "email", "channel", "social.facebook"]);

    // can use register like this: destructed on the component
    // const { name, onBlur, onChange, ref } = register("username");
    // Or can directly destructure it in the input field

    renderCount++

    const onSubmit = (data: IFormInput) => {
        console.log("formData: ", data)
    }

    const onError = (error: FieldErrors<IFormInput>) => {
        console.log("Error: ", error)
    }

    return (
        <div className="formBody">
            <form onSubmit={handleSubmit(onSubmit, onError)} className="form">
                <h1 style={{ color: '#f0f0f0', fontSize: '3rem', marginBottom: '1.4rem' }}>Youtube Form {renderCount}</h1>
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
                                },
                                // validate: (fieldValue) => {
                                //     return fieldValue !== "admin@example.com" || "Enter a valid Email address"
                                // }
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

                <div className="formFields">
                    <label className="label" htmlFor="twitter">Twitter</label>
                    <input
                        className="input"
                        id="twitter"
                        type="text"
                        {
                        ...register("social.twitter",
                            {
                                required: {
                                    value: true,
                                    message: "Twitter Name Is Required"
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
                        {errors.social?.twitter?.message}
                    </p>
                </div>

                <div className="formFields">
                    <label className="label" htmlFor="facebook">Facebook</label>
                    <input
                        className="input"
                        id="facebook"
                        type="text"
                        {
                        ...register("social.facebook",
                            {
                                required: {
                                    value: true,
                                    message: "Facebook Id is required"
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
                        {errors.social?.facebook?.message}
                    </p>
                </div>

                <div className="formFields">
                    <label className="label" htmlFor="primaryPhoneNumber">Phone Number</label>
                    <input
                        className="input"
                        id="primaryPhoneNumber"
                        type="text"
                        {
                        ...register("phoneNumbers.0",
                            {
                                required: {
                                    value: true,
                                    message: "Primary Phone Number is required"
                                },
                                validate: (fieldValue) => {
                                    return fieldValue.length > 10 || "Phone number must be 11 digit"
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
                        {errors.phoneNumbers?.[0]?.message}
                    </p>
                </div>

                <div className="formFields">
                    <label className="label" htmlFor="secondaryPhoneNumber">Phone Number(In case of emergency)</label>
                    <input
                        className="input"
                        id="secondaryPhoneNumber"
                        type="text"
                        {
                        ...register("phoneNumbers.1",
                            {
                                required: {
                                    value: true,
                                    message: "Secondary Phone Number is required"
                                },
                                validate: (fieldValue) => {
                                    return fieldValue.length > 10 || "Phone number must be 11 digit"
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
                        {errors.phoneNumbers?.[1]?.message}
                    </p>
                </div>

                <div className="formFields">
                    <label className="label">List of phone numbers</label>
                    <div>
                        {fields.map((field, index) => (
                            <div className="formControl" key={field.id}>
                                <input className="input" type="text" {...register(`phNumbers.${index}.number` as const,)} />
                                {
                                    index > 0 && <button className="removeBtn" type="button" onClick={() => { remove(index) }}>Remove</button>
                                }
                            </div>
                        ))}
                        <button className="addBtn" type="button" onClick={() => { append({ number: "" }) }}>Add phone number</button>
                    </div>
                </div>

                <div className="formFields">
                    <label className="label" htmlFor="age">Age</label>
                    <input
                        className="input"
                        id="age"
                        type="number"
                        {
                        ...register("age",
                            {
                                valueAsNumber: true,
                                required: {
                                    value: true,
                                    message: "Age is required"
                                },
                                validate: {
                                    notAdult: (fieldValue) => {
                                        return fieldValue >= 18 || "You must be 18 or above"
                                    }
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
                        {errors.age?.message}
                    </p>
                </div>

                <div className="formFields">
                    <label className="label" htmlFor="dob">Date of birth</label>
                    <input
                        className="input"
                        id="dob"
                        type="date"
                        {
                        ...register("dob",
                            {
                                valueAsDate: true,
                                required: {
                                    value: true,
                                    message: "Facebook Id is required"
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
                        {errors.social?.facebook?.message}
                    </p>
                </div>

                <button disabled={!isDirty || !isValid} className="submitBtn">Submit</button>
                <button type="button" onClick={() => { console.log("get Values: ", getValues()) }} className="submitBtn">Get Values</button>
                <button type="button" onClick={() => { setValue('age', 45) }} className="submitBtn">Set Values</button>
            </form >
            <DevTool control={control} />
        </div >
    )
}

export default YoutubeForm