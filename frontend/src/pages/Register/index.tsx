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
  StyledLabel,
  StyledTextInput,
  Title,
} from "../Login/styles";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import FormButton from "../../components/FormButton";

import AppLogoIcon from "../../assets/Logo.svg";
import { MediumText } from "../../theme/globalFonts";
import { useNavigation } from "@react-navigation/native";

interface IRegisterData {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const navigation = useNavigation().navigate;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IRegisterData> = (data) => console.log(data);

  return (
    <FormContainer>
      <Logo>
        <AppLogoIcon />
        <LogoText>Musiquinha</LogoText>
      </Logo>
      <Title>Sign up</Title>
      <InputSection>
        <StyledLabel>Name</StyledLabel>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <StyledTextInput
              placeholder="Name..."
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.name && <ErrorText>This is required</ErrorText>}
      </InputSection>
      <InputSection>
        <StyledLabel>Email</StyledLabel>
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
        <StyledLabel>Password</StyledLabel>
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

      <FormButton text="Sign Up" onPress={handleSubmit(onSubmit)} />

      <SignupText>
        Already have an account?{" "}
        <SignupLink onPress={() => navigation("Login" as never)}>
          Login
        </SignupLink>
      </SignupText>
    </FormContainer>
  );
};

export default Register;
