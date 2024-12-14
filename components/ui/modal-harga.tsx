// components/Dialog.tsx
import React, { ReactNode } from 'react';

interface DialogProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<div style={{margin:'0px'}} className="fixed  inset-0 z-[50] flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white rounded-lg shadow-lg overflow-hidden w-[75rem]">
				<div className="p-4">
					<button
						className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
						onClick={onClose}
					>
						×
					</button>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Dialog;
