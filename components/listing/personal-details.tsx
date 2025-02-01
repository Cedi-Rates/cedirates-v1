import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import styles from "../../assets/styles/listing.module.css";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Input } from "../ui/input";
import { useGeneralDetails } from "@/context/context-provider";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

const YourDetails: React.FC = () => {
  const { personalDetails, setPersonalDetails } = useGeneralDetails();
  // States
  const [visible, setVisibility] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const {
    register,
    formState,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
    watch,
    control,
  } = useForm<FormValues>({
    defaultValues: {
      firstName: personalDetails?.firstName,
      lastName: personalDetails?.lastName,
      email: personalDetails?.email,
      phone: personalDetails?.phone,
      password: personalDetails?.password,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    trigger();
  };

  const firstNameValue = watch("firstName");
  const lastNameValue = watch("lastName");
  const emailValue = watch("email");
  const phoneValue = watch("phone");
  const passwordValue = watch("password");

  const personalDetailsFunc = () => {
    if (
      firstNameValue &&
      lastNameValue &&
      emailValue &&
      phoneValue &&
      passwordValue
    ) {
      const personalDetailsValues = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        phone: phoneValue,
        password: passwordValue,
      };

      setPersonalDetails(personalDetailsValues);
    }
  };

  useEffect(() => {
    personalDetailsFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstNameValue, lastNameValue, emailValue, phoneValue, passwordValue]);

  const handleShow = () => {
    setVisibility(!visible);
  };

  return (
    <form className={styles["your-details"]}>
      <h2 className="font-medium">Your Details</h2>

      <p className={styles.error}>{errors.firstName?.message}</p>
      <div className={styles["input-div"]}>
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          rules={{ required: "First Name is required" }}
          render={({ field }) => (
            <input
              type="text"
              {...field}
              className={styles.input}
              placeholder="First Name"
            />
          )}
        />
      </div>

      <p className={styles.error}>{errors.lastName?.message}</p>
      <div className={styles["input-div"]}>
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          rules={{ required: "Last Name is required" }}
          render={({ field }) => (
            <input
              type="text"
              {...field}
              className={styles.input}
              placeholder="Last Name"
            />
          )}
        />
      </div>

      <p className={styles.error}>{errors.email?.message}</p>
      <div className={styles["input-div"]}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <input
              type="email"
              {...field}
              className={styles.input}
              placeholder="Email"
            />
          )}
        />
      </div>

      <p className={styles.error}>{errors.password?.message}</p>
      <div className={styles["input-div"]}>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: "Password is required", minLength: 8 }}
          render={({ field }) => (
            <input
              type={visible ? "text" : "password"}
              placeholder="Enter your password"
              {...field}
              className={styles.input}
            />
          )}
        />
        <div onClick={handleShow} className={styles["show-hide"]}>
          {visible ? (
            <BsEyeSlash className={styles.hide} />
          ) : (
            <BsEye className={styles.visible} />
          )}
        </div>
      </div>

      <p className={styles.error}>{errors.phone?.message}</p>
      <div className={styles["input-div"]}>
        <Controller
          name="phone"
          control={control}
          defaultValue=""
          rules={{ required: "Phone is required" }}
          render={({ field }) => (
            <input
              type="tel"
              {...field}
              className={styles.input}
              placeholder="Phone"
            />
          )}
        />
      </div>
    </form>
  );
};

export default YourDetails;
