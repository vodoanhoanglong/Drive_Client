import { gql } from "@apollo/client";

const loginMutation = gql`
	mutation loginMutation {
		login(data: { email: "test1@tesst1.com", password: "test" }) {
			access_token
			expires_in
			refresh_token
		}
	}
`;

const registerMutation = gql`
	mutation registerMutation {
		createAccount(
			data: { email: "test1@tesst1.com", password: "test", role: "user" }
		) {
			id
		}
	}
`;

export { loginMutation, registerMutation };
