import { Layout } from "./Layout";

import { BackBtn } from "./components/Common/BackBtn";

export default function ErrorPage() {
	return (
    <Layout>

		<div id="error-page">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<BackBtn/>
		</div>
    </Layout>
	);
}
