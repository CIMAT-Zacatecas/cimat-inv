// components/ForgotPassword.tsx
import { supabase } from '@/lib/supabase';
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

export default function ForgotPassword() {
	const [email, setEmail] = useState('');

	const handlePasswordReset = async () => {
		const { data, error } = await supabase.auth.resetPasswordForEmail(email);
		if (error) {
			Alert.alert('Error', error.message);
			return;
		}
		Alert.alert('Success', 'Password reset email sent');
	};

	return (
		<View>
			<TextInput
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				autoCapitalize="none"
				keyboardType="email-address"
			/>
			<Button title="Reset Password" onPress={handlePasswordReset} />
		</View>
	);
}
