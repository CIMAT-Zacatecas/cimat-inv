// app/(auth)/login.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useUserStore } from '@/store/userStore';
import { supabase } from '@/lib/supabase';
import type { Profile } from '@/types/profile.dto';

export default function LoginScreen() {
	const router = useRouter();
	const setUser = useUserStore((state) => state.setUser);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {
		const { data: authData, error: authError } =
			await supabase.auth.signInWithPassword({
				email,
				password,
			});

		if (authError) {
			Alert.alert('Error', authError.message);
			return;
		}

		// Fetch the user's profile
		const { data: profileData, error: profileError } = await supabase
			.from('profiles')
			.select('*')
			.eq('id', authData.user.id)
			.single();

		if (profileError) {
			Alert.alert('Error', profileError.message);
			return;
		}

		const profile = profileData as Profile;
		const user = { authUser: authData.user, profile };
		setUser(user);

		// Navigate to Home after successful login
		router.replace('/');
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Please Log In</Text>
			<TextInput
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				autoCapitalize="none"
				keyboardType="email-address"
				style={styles.input}
			/>
			<TextInput
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
				style={styles.input}
			/>
			<Button title="Login" onPress={handleLogin} />
		</View>
	);
}

const styles = StyleSheet.create({
	// Add your styles here
	container: { flex: 1, justifyContent: 'center', padding: 20 },
	input: { marginVertical: 10, borderBottomWidth: 1, padding: 8 },
	title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
});
