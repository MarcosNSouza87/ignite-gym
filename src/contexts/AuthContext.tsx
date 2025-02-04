import { createContext, ReactNode, useEffect, useState } from 'react';
import { UserDTO } from '@dtos/UserDTO';
import { api } from '@services/api';
import {
	storageUserSave,
	storageUserGet,
	storageUserRemove,
} from '@storage/storageUser';
import {
	storageAuthTokenGet,
	storageAuthTokenSave,
} from '@storage/storageAuthToken';

export type AuthContextDataProps = {
	user: UserDTO;
	updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => void;
	isLoadingUserStorageData: boolean;
};

export const AuthContext = createContext<AuthContextDataProps>(
	{} as AuthContextDataProps,
);

type AuthContextProviderProps = {
	children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
	const [user, setUser] = useState({} as UserDTO);
	const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(false);

	async function userAndTokenUpdate(userData: UserDTO, token: string) {
		api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		setUser(userData);
	}

	async function storageUserAndTokenSave(userData: UserDTO, token: string) {
		try {
			setIsLoadingUserStorageData(true);
			await storageUserSave(userData);
			await storageAuthTokenSave(token);
		} catch (error) {
			throw error;
		} finally {
			setIsLoadingUserStorageData(false);
		}
	}

	async function signIn(email: string, password: string) {
		try {
			const { data } = await api.post('/sessions', { email, password });
			//
			if (data.user && data.token) {
				setIsLoadingUserStorageData(true);

				await storageUserAndTokenSave(data.user, data.token);

				userAndTokenUpdate(data.user, data.token);
			}
		} catch (error) {
			throw error;
		} finally {
			setIsLoadingUserStorageData(false);
		}
	}

	async function signOut() {
		try {
			setIsLoadingUserStorageData(true);
			setUser({} as UserDTO);
			await storageUserRemove();
			await storageUserRemove();
		} catch (error) {
			throw error;
		} finally {
			setIsLoadingUserStorageData(false);
		}
	}

	async function updateUserProfile(userUpdated: UserDTO) {
		try {
			setUser(userUpdated);
			await storageUserSave(userUpdated);
		} catch (error) {
			throw error;
		}
	}

	async function loadUserData() {
		try {
			setIsLoadingUserStorageData(true);
			const userLogged = await storageUserGet();
			const token = await storageAuthTokenGet();

			if (token && userLogged) {
				userAndTokenUpdate(userLogged, token);
			}
		} catch (error) {
			throw error;
		} finally {
			setIsLoadingUserStorageData(false);
		}
	}

	useEffect(() => {
		loadUserData();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				signIn,
				signOut,
				updateUserProfile,
				isLoadingUserStorageData,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
