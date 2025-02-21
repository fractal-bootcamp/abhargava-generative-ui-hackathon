"use client";
import type { Hume } from "hume";
import { expressionColors, isExpressionColor } from "@/utils/expressionColors";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import * as R from "remeda";
import { useEffect } from "react";

export default function Expressions({
	values,
	messageContent,
}: {
	values: Hume.empathicVoice.EmotionScores | undefined;
	messageContent?: string;
}) {
	useEffect(() => {
		if (!values) return;

		const top3 = R.pipe(
			values,
			R.entries(),
			R.sortBy(R.pathOr([1], 0)),
			R.reverse(),
			R.take(3),
		);

		// Only log when values or messageContent changes
		const timestamp = new Date().toISOString();
		const emotionsLog = {
			timestamp,
			messageContent,
			emotions: Object.fromEntries(top3),
		};
		console.log("Emotions Log:", emotionsLog);
	}, [messageContent, values]);

	if (!values) return null;

	const top3 = R.pipe(
		values,
		R.entries(),
		R.sortBy(R.pathOr([1], 0)),
		R.reverse(),
		R.take(3),
	);

	return (
		<div
			className={
				"text-xs p-3 w-full border-t border-border flex flex-col md:flex-row gap-3"
			}
		>
			{top3.map(([key, value]) => (
				<div key={key} className={"w-full overflow-hidden"}>
					<div
						className={"flex items-center justify-between gap-1 font-mono pb-1"}
					>
						<div className={"font-medium truncate"}>{key}</div>
						<div className={"tabular-nums opacity-50"}>{value.toFixed(2)}</div>
					</div>
					<div
						className={"relative h-1"}
						style={
							{
								"--bg": isExpressionColor(key)
									? expressionColors[key]
									: "var(--bg)",
							} as CSSProperties
						}
					>
						<div
							className={
								"absolute top-0 left-0 size-full rounded-full opacity-10 bg-[var(--bg)]"
							}
						/>
						<motion.div
							className={
								"absolute top-0 left-0 h-full bg-[var(--bg)] rounded-full"
							}
							initial={{ width: 0 }}
							animate={{
								width: `${R.pipe(
									value,
									R.clamp({ min: 0, max: 1 }),
									(value) => `${value * 100}%`,
								)}`,
							}}
						/>
					</div>
				</div>
			))}
		</div>
	);
}
