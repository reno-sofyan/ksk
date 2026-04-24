import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import HeroShell from '@/components/HeroShell.jsx';
import '@/index.css';

class AppErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error) {
		console.error(error);
	}

	render() {
		if (this.state.hasError) {
			return <HeroShell />;
		}

		return this.props.children;
	}
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<AppErrorBoundary>
		<App />
	</AppErrorBoundary>
);
