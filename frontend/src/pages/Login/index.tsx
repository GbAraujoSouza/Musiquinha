import { View, Text, Pressable, TextInput, Image } from "react-native";
import React from "react";
import {
  ErrorText,
  ForgotPasswordText,
  FormContainer,
  InputSection,
  Logo,
  LogoText,
  SignupLink,
  SignupText,
  StyledTextInput,
  Title,
} from "./styles";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import FormButton from "../../components/FormButton";

import AppLogoIcon from "../../assets/Logo.svg";
import { useAuth } from "../../contexts/AuthContext";

interface ILoginData {
  email: string;
  password: string;
}

const Login = () => {
  const { loginUser } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<ILoginData> = (data) => {
    console.log(data);
    loginUser(data.email, data.password);
  };

  return (
    <FormContainer>
      <Logo>
        <AppLogoIcon />
        <LogoText>Musiquinha</LogoText>
      </Logo>
      <Title>Sign in</Title>
      <InputSection>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <StyledTextInput
              placeholder="Email..."
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && <ErrorText>This is required</ErrorText>}
      </InputSection>
      <InputSection>
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <StyledTextInput
              placeholder="Passoword..."
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          )}
        />
        {errors.password && <ErrorText>This is required</ErrorText>}
      </InputSection>
      <ForgotPasswordText>Forget password</ForgotPasswordText>

      <FormButton text="Log In" onPress={handleSubmit(onSubmit)} />

      <SignupText>
        Don't have an account? <SignupLink>Signup</SignupLink>
      </SignupText>
    </FormContainer>
  );
};

export default Login;
