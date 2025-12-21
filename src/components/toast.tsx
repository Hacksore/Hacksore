import { useEffect, useState, useRef } from "react";

interface ToastProps {
	message: string;
	type: "loading" | "success" | "error";
	onClose: () => void;
	duration?: number;
}

export const Toast = ({ message, type, onClose, duration = 2000 }: ToastProps) => {
	const [isVisible, setIsVisible] = useState(true);
	const onCloseRef = useRef(onClose);
	const durationRef = useRef(duration);

	// Keep refs up to date
	useEffect(() => {
		onCloseRef.current = onClose;
		durationRef.current = duration;
	}, [onClose, duration]);

	// Set up timer only once when component mounts with initial duration
	useEffect(() => {
		const initialDuration = durationRef.current;
		
		// If duration is 0, don't auto-dismiss (for loading toasts)
		if (initialDuration === 0) {
			return;
		}

		const timer = setTimeout(() => {
			setIsVisible(false);
			// Wait for fade out animation before calling onClose
			setTimeout(() => {
				onCloseRef.current();
			}, 300);
		}, initialDuration);

		return () => clearTimeout(timer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Only run once on mount - each toast manages its own lifetime

	const bgColor =
		type === "success"
			? "bg-green-600"
			: type === "error"
				? "bg-red-600"
				: "bg-blue-600";

	return (
		<div
			className={`transition-all duration-300 ${
				isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
			}`}
		>
			<div
				className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[200px] max-w-md`}
			>
				{type === "loading" && (
					<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
				)}
				{type === "success" && (
					<svg
						className="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M5 13l4 4L19 7"
						/>
					</svg>
				)}
				{type === "error" && (
					<svg
						className="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				)}
				<span className="text-sm font-medium">{message}</span>
			</div>
		</div>
	);
};

interface ToastContainerProps {
	toasts: Array<{ id: string; message: string; type: "loading" | "success" | "error" }>;
	onRemove: (id: string) => void;
}

export const ToastContainer = ({ toasts, onRemove }: ToastContainerProps) => {
	if (toasts.length === 0) {
		return null;
	}

	return (
		<div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col gap-2 items-center pointer-events-none">
			{toasts.map((toast) => (
				<div key={toast.id} className="pointer-events-auto">
					<Toast
						message={toast.message}
						type={toast.type}
						onClose={() => onRemove(toast.id)}
						duration={toast.type === "loading" ? 0 : 2000}
					/>
				</div>
			))}
		</div>
	);
};

