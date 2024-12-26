import "./globals.css";

export const metadata = {
	title: "User Management App",
	description: "A simple user management application",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<main>{children}</main>
			</body>
		</html>
	);
}
