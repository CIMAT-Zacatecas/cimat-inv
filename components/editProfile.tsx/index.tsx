// components/EditProfile.tsx
import { supabase } from '@/lib/supabase';
import { useUserStore } from '@/store/userStore';
import type { Profile } from '@/types/profile.dto';
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
export default function EditProfile() {
	const user = useUserStore((state) => state.user);
	const setUser = useUserStore((state) => state.setUser);

	const [fullName, setFullName] = useState(user?.profile.full_name || '');
	const [username, setUsername] = useState(user?.profile.username || '');

	const handleUpdateProfile = async () => {
		const updates: Partial<Profile> = {
			full_name: fullName,
			username,
			updated_at: new Date().toISOString(),
		};

		const { data, error } = await supabase
			.from('profiles')
			.update(updates)
			.eq('id', user?.authUser.id)
			.select()
			.single();

		if (error) {
			Alert.alert('Error', error.message);
			return;
		}
		if (!user) {
			Alert.alert('Error', 'User not found');
			return;
		}

		// Update the user in the store
		setUser({
			...user,
			profile: {
				...user.profile,
				...data,
			},
		});

		Alert.alert('Success', 'Profile updated successfully');
	};

	return (
		<View>
			<TextInput
				placeholder="Full Name"
				value={fullName}
				onChangeText={setFullName}
			/>
			<TextInput
				placeholder="Username"
				value={username}
				onChangeText={setUsername}
			/>
			<Button title="Save Changes" onPress={handleUpdateProfile} />
		</View>
	);
}
