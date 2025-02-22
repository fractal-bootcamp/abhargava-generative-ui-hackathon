"use client";

import React, { useEffect, useRef, useState } from "react";
import {
	FaceLandmarker,
	FilesetResolver,
	DrawingUtils,
} from "@mediapipe/tasks-vision";
import { useGameStore } from "./store/useGameStore";

export function VideoCamera() {
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [faceLandmarker, setFaceLandmarker] = useState<FaceLandmarker | null>(
		null,
	);
	const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
	const [webcamRunning, setWebcamRunning] = useState(false);
	const [detectionRunning, setDetectionRunning] = useState(false);
	const [drawingUtils, setDrawingUtils] = useState<DrawingUtils | null>(null);
	const { smileCount, isGameOver, incrementSmile, resetGame } = useGameStore();

	// Initialize the FaceLandmarker when the component mounts
	useEffect(() => {
		initializeFaceLandmarker();
	}, []);

	// Start the webcam once the FaceLandmarker is initialized
	useEffect(() => {
		if (faceLandmarker) {
			startWebcam();
		}
	}, [faceLandmarker]);

	// Initialize face landmarker
	const initializeFaceLandmarker = async () => {
		try {
			const filesetResolver = await FilesetResolver.forVisionTasks(
				"https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm",
			);

			const faceLandmarkerInstance = await FaceLandmarker.createFromOptions(
				filesetResolver,
				{
					baseOptions: {
						modelAssetPath:
							"https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
						delegate: "GPU",
					},
					outputFaceBlendshapes: true,
					runningMode: "VIDEO",
					numFaces: 1,
				},
			);

			setFaceLandmarker(faceLandmarkerInstance);
			console.log("FaceLandmarker initialized:", faceLandmarkerInstance);

			if (canvasRef.current) {
				const context = canvasRef.current.getContext("2d");
				setCtx(context);
				if (context) {
					setDrawingUtils(new DrawingUtils(context));
				}
				console.log("Canvas context initialized:", context);
			}
		} catch (error) {
			console.error("Error initializing FaceLandmarker:", error);
		}
	};

	const hasGetUserMedia = () => {
		// biome-ignore lint/complexity/useOptionalChain: <explanation>
		return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
	};

	const startWebcam = async () => {
		console.log("Attempting to start webcam...");

		if (!faceLandmarker) {
			alert("Face Landmarker is still loading. Please try again.");
			console.error("Face Landmarker not initialized.");
			return;
		}

		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
			});

			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				videoRef.current.style.display = "block";
				setWebcamRunning(true);
				console.log("Webcam stream started.");

				videoRef.current.addEventListener("loadeddata", () => {
					console.log("Video data loaded, starting detection...");
					setDetectionRunning(true);
					detect();
				});
			}
		} catch (err) {
			console.error("Error accessing webcam:", err);
		}
	};

	const detect = async () => {
		if (!faceLandmarker || !ctx || !videoRef.current || !detectionRunning) {
			console.log("Detection prerequisites not met or detection stopped.");
			return;
		}

		if (!canvasRef.current) return;

		// Ensure the video and canvas have valid dimensions
		if (
			videoRef.current.videoWidth === 0 ||
			videoRef.current.videoHeight === 0 ||
			canvasRef.current.width === 0 ||
			canvasRef.current.height === 0
		) {
			console.log("Invalid video or canvas dimensions.");
			requestAnimationFrame(detect);
			return;
		}

		// Match canvas size to video
		canvasRef.current.width = videoRef.current.videoWidth;
		canvasRef.current.height = videoRef.current.videoHeight;

		// Run detection
		const results = faceLandmarker.detectForVideo(
			videoRef.current,
			performance.now(),
		);

		// Clear the canvas
		ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

		// Draw landmarks if detected
		if (results.faceLandmarks && drawingUtils) {
			for (const landmarks of results.faceLandmarks) {
				drawingUtils.drawConnectors(
					landmarks,
					FaceLandmarker.FACE_LANDMARKS_TESSELATION,
					{ color: "#C0C0C070", lineWidth: 1 },
				);
				drawingUtils.drawConnectors(
					landmarks,
					FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
					{ color: "#FF3030" },
				);
				drawingUtils.drawConnectors(
					landmarks,
					FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW,
					{ color: "#FF3030" },
				);
				drawingUtils.drawConnectors(
					landmarks,
					FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
					{ color: "#30FF30" },
				);
				drawingUtils.drawConnectors(
					landmarks,
					FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW,
					{ color: "#30FF30" },
				);
				drawingUtils.drawConnectors(
					landmarks,
					FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
					{ color: "#E0E0E0" },
				);
				drawingUtils.drawConnectors(
					landmarks,
					FaceLandmarker.FACE_LANDMARKS_LIPS,
					{ color: "#E0E0E0" },
				);
				drawingUtils.drawConnectors(
					landmarks,
					FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS,
					{ color: "#FF3030" },
				);
				drawingUtils.drawConnectors(
					landmarks,
					FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS,
					{ color: "#30FF30" },
				);
			}
		} else {
			console.log("No landmarks detected in this frame.");
		}

		// Check for smile
		// biome-ignore lint/complexity/useOptionalChain: <explanation>
		if (results.faceBlendshapes && results.faceBlendshapes[0]) {
			const categories = results.faceBlendshapes[0].categories;
			const leftSmile =
				categories.find((c) => c.categoryName === "mouthSmileLeft")?.score || 0;
			const rightSmile =
				categories.find((c) => c.categoryName === "mouthSmileRight")?.score ||
				0;

			if (leftSmile > 0.8 && rightSmile > 0.9) {
				console.log("Big smile detected! ��");
				incrementSmile();
			}
		}

		// Continue detection loop
		if (webcamRunning) {
			requestAnimationFrame(detect);
		}
	};
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (detectionRunning) {
			detect();
		}
	}, [detectionRunning]);

	useEffect(() => {
		return () => {
			if (videoRef.current?.srcObject) {
				const stream = videoRef.current.srcObject as MediaStream;
				const tracks = stream.getTracks();
				for (const track of tracks) {
					track.stop();
				}
			}
		};
	}, []);

	if (!hasGetUserMedia()) {
		return <div>getUserMedia() is not supported by your browser</div>;
	}

	return (
		<div className="relative flex justify-center items-center">
			<div className="relative inline-block">
				{/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
				<video
					ref={videoRef}
					id="webcam"
					style={{
						width: "100%",
						height: "auto",
						position: "relative",
						zIndex: 5,
					}}
					className="rounded-lg"
					autoPlay
					playsInline
				/>
				<canvas
					ref={canvasRef}
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						zIndex: 10,
						pointerEvents: "none",
						width: "100%",
						height: "100%",
					}}
				/>
			</div>
			<div className="absolute top-4 right-4 z-20 bg-black/50 text-white p-2 rounded">
				Smiles: {smileCount}/100
			</div>
		</div>
	);
}
