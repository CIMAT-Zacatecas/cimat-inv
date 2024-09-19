// components/SignUp.tsx
import { supabase } from "@/lib/supabase";
import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Please check your email to confirm your account.");
    }
  };

  return (
    <View>
      <TextInput placeholder="Full Name" value={fullName} onChangeText={setFullName} />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
}
