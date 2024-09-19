import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useUserStore } from '@/store/userStore';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
	const user = useUserStore((state) => state.user);
	const clearUser = useUserStore((state) => state.clearUser);
	const router = useRouter();

	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			Alert.alert('Error', error.message);
		} else {
			clearUser();
			router.replace('/login');
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				Welcome, {user?.profile.full_name || user?.authUser.email}!
			</Text>
			{/* Add more content here */}
			<Button title="Logout" onPress={handleLogout} />
		</View>
	);
}

const styles = StyleSheet.create({
	// Add your styles here
	container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	title: { fontSize: 24, marginBottom: 20 },
});
