import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { cn } from "@/utils";

export const metadata: Metadata = {
	title: "Hume AI - EVI - Next.js Starter",
	description: "A Next.js starter using Hume AI's Empathic Voice Interface",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<script
					src="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/vision_bundle.js"
					crossOrigin="anonymous"
				/>
			</head>
			<body
				className={cn(
					GeistSans.variable,
					GeistMono.variable,
					"flex flex-col min-h-screen",
				)}
			>
				{children}
			</body>
		</html>
	);
}
