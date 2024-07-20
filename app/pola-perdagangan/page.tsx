'use client';

import { useEffect, useRef } from 'react';
import Navbar from '@/components/ui/navbar';
import Image from 'next/image';
import user from '@/public/user.svg';
import Background from '@/public/bgg.png';
import vector1 from '@/public/vect1.svg';
import vector2 from '@/public/vect2.svg';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import bank from '@/public/bank.svg';
import sulaw from '@/public/sulaw.svg';
import {
	CounterClockwiseClockIcon,
	ChevronDownIcon,
	ChevronRightIcon,
	SewingPinFilledIcon,
	PersonIcon,
	ArrowUpIcon,
	EnvelopeClosedIcon,
} from '@radix-ui/react-icons';

const FlowChart: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	useEffect(() => {
		const container = containerRef.current;
		const canvas = canvasRef.current;
		if (!container || !canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const flow = [
			{ start: 'Buol', end: 'Tolitoli' },
			{ start: 'Parigi', end: 'Morowali' },
			{ start: 'Banggai', end: 'Morowali-Utara' },
			{ start: 'Touna', end: 'Poso' },
			{ start: 'Sigi', end: 'Donggala' },
			{ start: 'Palu', end: 'Banggai-Laut' },
			{ start: 'Palu', end: 'Banggai-Kepulauan' },
			{ 'start': 'Buol', 'end': 'gorontalo' },

		];

		const externalFlow = [
			"gorontalo"
			, "sulbar"
			, "sulsel"
			, "sulteng"
			, "manado"
			, "papua"
			, "papua-pegunungan"
			, "maluku"
			, "papua-barat-daya"
			, "papua-selatan"
			, "maluku-utara"
			, "papua-barat"
			, "ntt"
			, "ntb"
			, "bali"
			, "jatim"
			, "yogya"
			, "jabar"
			, "jateng"
			, "jakarta"
			, "bangka"
			, "kepulauan-riau"
			, "jambi"
			, "banten"
			, "sumsel"
			, "aceh"
			, "bengkulu"
		];


		canvas.width = container.scrollWidth;
		canvas.height = container.scrollHeight;

		function getCoordinate(rect: DOMRect, el: string, offsetX: number, offsetY: number): [number, number] {
			const screenWidth = window.innerWidth;
			let startX = 0;
			let startY = 0;
			if (screenWidth <= 450) {
				switch (el) {
					case 'Buol':
						startX = offsetX + (rect.left + rect.width / 2) - 10;
						startY = offsetY + rect.top + rect.height / 2;
						break;
					case 'Tolitoli':
						startX = offsetX + (rect.left + rect.width / 2) + 5;
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Parigi':
						startX = offsetX + (rect.left + rect.width / 2) + 20;
						startY = offsetY + (rect.top + rect.height / 2) - 40;
						break;
					case 'Morowali':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Banggai':
						startX = offsetX + (rect.left + rect.width / 2) - 20;
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Morowali-Utara':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Touna':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Poso':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Sigi':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Donggala':
						startX = offsetX + (rect.left + rect.width / 2) + 5;
						startY = offsetY + (rect.top + rect.height / 2) - 20;
						break;
					case 'Palu':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2) + 5;
						break;
					case 'Banggai-Laut':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Banggai-Kepulauan':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					default:
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2) + 10;
						break;
				}
			} else if (screenWidth <= 600) {
				switch (el) {
					case 'Buol':
						startX = offsetX + (rect.left + rect.width / 2) - 20;
						startY = offsetY + rect.top + rect.height / 2;
						break;
					case 'Tolitoli':
						startX = offsetX + (rect.left + rect.width / 2) + 15;
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Parigi':
						startX = offsetX + (rect.left + rect.width / 2) + 20;
						startY = offsetY + (rect.top + rect.height / 2) - 50;
						break;
					case 'Morowali':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Banggai':
						startX = offsetX + (rect.left + rect.width / 2) - 20;
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Morowali-Utara':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Touna':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Poso':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Sigi':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Donggala':
						startX = offsetX + (rect.left + rect.width / 2) + 5;
						startY = offsetY + (rect.top + rect.height / 2) - 20;
						break;
					case 'Palu':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2) + 5;
						break;
					case 'Banggai-Laut':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Banggai-Kepulauan':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					default:
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2) + 10;
						break;
				}
			} else if (screenWidth <= 800) {
				switch (el) {
					case 'Buol':
						startX = offsetX + (rect.left + rect.width / 2) - 20;
						startY = offsetY + rect.top + rect.height / 2;
						break;
					case 'Tolitoli':
						startX = offsetX + (rect.left + rect.width / 2) + 15;
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Parigi':
						startX = offsetX + (rect.left + rect.width / 2) + 40;
						startY = offsetY + (rect.top + rect.height / 2) - 60;
						break;
					case 'Morowali':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Banggai':
						startX = offsetX + (rect.left + rect.width / 2) - 20;
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Morowali-Utara':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2) - 20;
						break;
					case 'Touna':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Poso':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Sigi':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Donggala':
						startX = offsetX + (rect.left + rect.width / 2) + 10;
						startY = offsetY + (rect.top + rect.height / 2) - 40;
						break;
					case 'Palu':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2) + 5;
						break;
					case 'Banggai-Laut':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Banggai-Kepulauan':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					default:
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2) + 10;
						break;
				}
			} else if (screenWidth <= 1050) {
				switch (el) {
					case 'Buol':
						startX = offsetX + (rect.left + rect.width / 2) - 30;
						startY = offsetY + rect.top + rect.height / 2;
						break;
					case 'Tolitoli':
						startX = offsetX + (rect.left + rect.width / 2) + 30;
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Parigi':
						startX = offsetX + (rect.left + rect.width / 2) + 60;
						startY = offsetY + (rect.top + rect.height / 2) - 85;
						break;
					case 'Morowali':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Banggai':
						startX = offsetX + (rect.left + rect.width / 2) - 50;
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Morowali-Utara':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2) - 20;
						break;
					case 'Touna':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Poso':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Sigi':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Donggala':
						startX = offsetX + (rect.left + rect.width / 2) + 20;
						startY = offsetY + (rect.top + rect.height / 2) - 60;
						break;
					case 'Palu':
						startX = offsetX + (rect.left + rect.width / 2) + 10;
						startY = offsetY + (rect.top + rect.height / 2) + 15;
						break;
					case 'Banggai-Laut':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Banggai-Kepulauan':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					default:
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2) + 10;
						break;
				}
			} else {
				switch (el) {
					case 'Buol':
						startX = offsetX + (rect.left + rect.width / 2) - 30;
						startY = offsetY + rect.top + rect.height / 2;
						break;
					case 'Tolitoli':
						startX = offsetX + (rect.left + rect.width / 2) + 30;
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Parigi':
						startX = offsetX + (rect.left + rect.width / 2) + 60;
						startY = offsetY + (rect.top + rect.height / 2) - 120;
						break;
					case 'Morowali':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Banggai':
						startX = offsetX + (rect.left + rect.width / 2) - 50;
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Morowali-Utara':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2) - 20;
						break;
					case 'Touna':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Poso':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Sigi':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Donggala':
						startX = offsetX + (rect.left + rect.width / 2) + 20;
						startY = offsetY + (rect.top + rect.height / 2) - 60;
						break;
					case 'Palu':
						startX = offsetX + (rect.left + rect.width / 2) + 10;
						startY = offsetY + (rect.top + rect.height / 2) + 15;
						break;
					case 'Banggai-Laut':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					case 'Banggai-Kepulauan':
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2);
						break;
					default:
						startX = offsetX + (rect.left + rect.width / 2);
						startY = offsetY + (rect.top + rect.height / 2) + 10;
						break;
				}
			}
			return [startX, startY];
		}



		function draw() {
			if (!ctx || !canvas || !container) return; // Add null check for ctx and canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			flow.forEach((el) => {
				const containerRect = container.getBoundingClientRect();
				const offsetX = container.scrollLeft - containerRect.left;
				const offsetY = container.scrollTop - containerRect.top;
				const el1 = document.getElementById(el.start);
				const rect1 = el1?.getBoundingClientRect();
				if (!rect1) return;
				const starter = getCoordinate(rect1, el.start, offsetX, offsetY);
				const el2 = document.getElementById(el.end);
				const rect2 = el2?.getBoundingClientRect();
				if (!rect2) return;
				const ender = getCoordinate(rect2, el.end, offsetX, offsetY);
				const controlX = (starter[0] + ender[0]) / 2;
				const controlY = starter[1] - 100;
				drawBentDashedLine(ctx, starter[0], starter[1], ender[0], ender[1], controlX, controlY, el.start, el.end);
			});
		}

		function drawBentDashedLine(ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number, controlX: number, controlY: number, startLabel: string, endLabel: string) {
			const path = new Path2D();
			if (externalFlow.includes(startLabel) || externalFlow.includes(endLabel)) {

				// Draw straight line if start or end is in the externalFlow list
				path.moveTo(startX, startY);
				path.lineTo(endX, endY);
			} else {
				// Draw bent dashed line otherwise
				path.moveTo(startX, startY);
				path.quadraticCurveTo(controlX, controlY, endX, endY);
			}
			ctx.setLineDash([10, 5]);
			ctx.lineWidth = 3;
			ctx.strokeStyle = '#01518B';
			ctx.stroke(path);
			drawDot(ctx, startX, startY, '#01518B');
			drawIcon(ctx, startX, startY, bank);
			drawDot(ctx, endX, endY, 'yellow');
		}

		function drawArrow(ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number) {
			const headlen = 10; // panjang kepala panah
			const dx = toX - fromX;
			const dy = toY - fromY;
			const angle = Math.atan2(dy, dx);
			ctx.beginPath();
			ctx.moveTo(toX, toY);
			ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
			ctx.moveTo(toX, toY);
			ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
			ctx.strokeStyle = '#01518B';
			ctx.lineWidth = 3;
			ctx.stroke();
		}

		function drawIcon(ctx: CanvasRenderingContext2D, x: number, y: number, img: HTMLImageElement) {
			const iconSize = 30; // Ukuran ikon
			ctx.drawImage(document.getElementById('location') as CanvasImageSource , x - iconSize / 2, y - iconSize / 2, iconSize, iconSize);
		}

		function drawDot(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
			ctx.beginPath();
			ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
			ctx.fillStyle = color;
			ctx.fill();
		}

		
		container.addEventListener('scroll', draw);
		window.addEventListener('resize', draw); // Add resize event listener

	
		// check is flow are include externalFlow and then remove hidden class
		externalFlow.forEach((el) => {
			if (flow.some((e) => e.start === el || e.end === el)) {
				const el1 = document.getElementById(el);
				if (el1) {
					el1.classList.remove('hidden');
				}
			}
		});

		draw();

		return () => {
			container.removeEventListener('scroll', draw);
			window.removeEventListener('resize', draw);
		};
	}, []);


	return (
		<div style={{ 'overflowX': 'hidden' }}>
			<style jsx>{`
        #myCanvas {
        	position: absolute;
        	top: 0;
        	left: 0;
        }

		@media screen and (max-width: 600px) {
				#container canvas {
					height: 500px !important;
				}

				#container svg {
					height: 500px !important;
				}
			}
    `}</style>
			<Navbar />
			<img src="/location.svg" id='location' className='hidden' alt="" />
			<div className="relative h-72 flex items-center justify-center bg-no-repeat bg-cover bg-[url('/bgg.png')]">
				<div className="hidden lg:block">
					<Image
						src={vector1}
						alt="vector1"
						width={440}
						height={440}
						objectFit="cover"
						className="absolute opacity-60 right-0 top-0"
					/>
					<Image
						src={vector2}
						alt="vector2"
						width={440}
						height={440}
						objectFit="cover"
						className="absolute drop-shadow-md opacity-25 right-0 top-0"
					/>
				</div>

				<div className="flex-col mx-auto z-50 items-center ">
					<p className="text-lg text-center sm:text-2xl md:text-3xl lg:text-3xl  text-white font-semibold">
						Sistem Informasi Komoditas : Harga dan Pasokan
					</p>
				</div>
			</div>

			<section className="px-4 sm:px-8 md:px-20 pt-4 space-y-4 sm:space-y-8 md:space-y-20">

				<div className="flex flex-col sm:flex-row justify-between pt-10">
					<div className="flex-col">
						<h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
							COMMODITY FLOW
						</h1>
						<Badge className="bg-green-400 mt-2 text-xs sm:text-sm md:text-base rounded-full text-white gap-2">
							<CounterClockwiseClockIcon /> Harga diperbaharui pada tanggal 15
							April 2024
						</Badge>
					</div>
					<div></div>
				</div>
			</section>

			<center>
				<div className="container" id="container" ref={containerRef} style={{ position: 'relative' }}>
					<canvas id="myCanvas" ref={canvasRef}></canvas>
					<svg width="100%" height="1064" viewBox="0 0 1164 1064" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="100%" height="1064" fill="#ffffff" />
						<g id="User Page">
							<path d="M-3170 -3698C-3170 -3753.23 -3125.23 -3798 -3070 -3798H6623C6678.23 -3798 6723 -3753.23 6723 -3698V3335C6723 3390.23 6678.23 3435 6623 3435H-3070C-3125.23 3435 -3170 3390.23 -3170 3335V-3698Z" fill="white" />
							<path d="M-3070 -3797H6623V-3799H-3070V-3797ZM6722 -3698V3335H6724V-3698H6722ZM6623 3434H-3070V3436H6623V3434ZM-3169 3335V-3698H-3171V3335H-3169ZM-3070 3434C-3124.68 3434 -3169 3389.68 -3169 3335H-3171C-3171 3390.78 -3125.78 3436 -3070 3436V3434ZM6722 3335C6722 3389.68 6677.68 3434 6623 3434V3436C6678.78 3436 6724 3390.78 6724 3335H6722ZM6623 -3797C6677.68 -3797 6722 -3752.68 6722 -3698H6724C6724 -3753.78 6678.78 -3799 6623 -3799V-3797ZM-3070 -3799C-3125.78 -3799 -3171 -3753.78 -3171 -3698H-3169C-3169 -3752.68 -3124.68 -3797 -3070 -3797V-3799Z" fill="white" fill-opacity="0.1" />
							<g id="Group 811451">
								<g id="Buol">
									<mask id="path-3-outside-1_0_1" maskUnits="userSpaceOnUse" x="477.98" y="216.305" width="212" height="103" fill="black">
										<rect fill="white" x="477.98" y="216.305" width="212" height="103" />
										<path d="M483.455 307.638C483.455 307.638 486.74 305.531 489.079 298.044C489.079 298.044 496.815 291.493 503.14 290.793C503.14 290.793 506.889 289.157 506.425 276.992C506.425 276.992 509.71 268.569 507.835 265.062C505.96 261.554 505.943 262.018 508.418 261.082C510.892 260.146 512.522 256.167 512.522 256.167C512.522 256.167 518.847 254 518.619 251.108C518.391 248.216 516.288 244.001 518.619 241.193C520.95 238.386 526.346 236.75 526.582 233.471C526.819 230.191 529.631 228.092 535.018 229.491C540.406 230.891 539.705 235.393 551.426 229.053H562.438C562.438 229.053 569.236 226.684 570.174 221.305C570.174 221.305 580.02 221.777 573.222 228.555L569.937 231.835L569 239.794C569 239.794 580.248 258.747 592.434 257.575L607.195 257.339C607.195 257.339 612.819 253.595 618.207 255.931C618.207 255.931 626.88 254.523 628.518 254.523C628.518 254.523 630.865 251.951 637.655 254.759C637.655 254.759 645.855 250.316 645.855 254.059C645.855 257.803 650.305 266.925 658.978 261.31C658.978 261.31 664.602 257.803 664.838 256.158C664.838 256.158 667.65 254.987 676.323 258.502C676.323 258.502 680.309 260.374 683.585 259.674C686.862 258.974 685.46 261.546 678.662 263.182C671.864 264.817 663.428 266.925 662.254 267.397C661.08 267.869 661.08 273.012 654.519 275.82C654.519 275.82 655.929 285.178 648.895 279.799C648.895 279.799 641.159 275.584 641.159 273.484C641.159 271.385 635.772 265.062 630.376 271.376C630.376 271.376 622.64 276.528 617.016 276.755L606.942 281.671C606.942 281.671 600.617 281.671 595.457 285.414H585.61C585.61 285.414 584.437 291.029 575.536 289.857H566.399C566.399 289.857 560.538 288.222 557.726 288.921C557.726 288.921 557.025 294.3 558.663 296.408C558.663 296.408 554.678 298.516 552.803 298.516C550.928 298.516 542.255 293.837 537.104 298.516C531.953 303.195 531.945 305.067 531.945 305.067C531.945 305.067 533.118 311.618 528.432 314.661C528.432 314.661 519.066 312.452 518.349 311.137C518.349 311.137 510.808 312.334 506.138 309.94C506.138 309.94 498.597 314.484 493.445 312.334C488.294 310.184 483.438 309.468 483.438 309.468C483.438 309.468 482.408 308.574 483.438 307.647L483.455 307.638Z" />
									</mask>
									<path d="M483.455 307.638C483.455 307.638 486.74 305.531 489.079 298.044C489.079 298.044 496.815 291.493 503.14 290.793C503.14 290.793 506.889 289.157 506.425 276.992C506.425 276.992 509.71 268.569 507.835 265.062C505.96 261.554 505.943 262.018 508.418 261.082C510.892 260.146 512.522 256.167 512.522 256.167C512.522 256.167 518.847 254 518.619 251.108C518.391 248.216 516.288 244.001 518.619 241.193C520.95 238.386 526.346 236.75 526.582 233.471C526.819 230.191 529.631 228.092 535.018 229.491C540.406 230.891 539.705 235.393 551.426 229.053H562.438C562.438 229.053 569.236 226.684 570.174 221.305C570.174 221.305 580.02 221.777 573.222 228.555L569.937 231.835L569 239.794C569 239.794 580.248 258.747 592.434 257.575L607.195 257.339C607.195 257.339 612.819 253.595 618.207 255.931C618.207 255.931 626.88 254.523 628.518 254.523C628.518 254.523 630.865 251.951 637.655 254.759C637.655 254.759 645.855 250.316 645.855 254.059C645.855 257.803 650.305 266.925 658.978 261.31C658.978 261.31 664.602 257.803 664.838 256.158C664.838 256.158 667.65 254.987 676.323 258.502C676.323 258.502 680.309 260.374 683.585 259.674C686.862 258.974 685.46 261.546 678.662 263.182C671.864 264.817 663.428 266.925 662.254 267.397C661.08 267.869 661.08 273.012 654.519 275.82C654.519 275.82 655.929 285.178 648.895 279.799C648.895 279.799 641.159 275.584 641.159 273.484C641.159 271.385 635.772 265.062 630.376 271.376C630.376 271.376 622.64 276.528 617.016 276.755L606.942 281.671C606.942 281.671 600.617 281.671 595.457 285.414H585.61C585.61 285.414 584.437 291.029 575.536 289.857H566.399C566.399 289.857 560.538 288.222 557.726 288.921C557.726 288.921 557.025 294.3 558.663 296.408C558.663 296.408 554.678 298.516 552.803 298.516C550.928 298.516 542.255 293.837 537.104 298.516C531.953 303.195 531.945 305.067 531.945 305.067C531.945 305.067 533.118 311.618 528.432 314.661C528.432 314.661 519.066 312.452 518.349 311.137C518.349 311.137 510.808 312.334 506.138 309.94C506.138 309.94 498.597 314.484 493.445 312.334C488.294 310.184 483.438 309.468 483.438 309.468C483.438 309.468 482.408 308.574 483.438 307.647L483.455 307.638Z" fill="#76bf70" />
									<path d="M483.455 307.638C483.455 307.638 486.74 305.531 489.079 298.044C489.079 298.044 496.815 291.493 503.14 290.793C503.14 290.793 506.889 289.157 506.425 276.992C506.425 276.992 509.71 268.569 507.835 265.062C505.96 261.554 505.943 262.018 508.418 261.082C510.892 260.146 512.522 256.167 512.522 256.167C512.522 256.167 518.847 254 518.619 251.108C518.391 248.216 516.288 244.001 518.619 241.193C520.95 238.386 526.346 236.75 526.582 233.471C526.819 230.191 529.631 228.092 535.018 229.491C540.406 230.891 539.705 235.393 551.426 229.053H562.438C562.438 229.053 569.236 226.684 570.174 221.305C570.174 221.305 580.02 221.777 573.222 228.555L569.937 231.835L569 239.794C569 239.794 580.248 258.747 592.434 257.575L607.195 257.339C607.195 257.339 612.819 253.595 618.207 255.931C618.207 255.931 626.88 254.523 628.518 254.523C628.518 254.523 630.865 251.951 637.655 254.759C637.655 254.759 645.855 250.316 645.855 254.059C645.855 257.803 650.305 266.925 658.978 261.31C658.978 261.31 664.602 257.803 664.838 256.158C664.838 256.158 667.65 254.987 676.323 258.502C676.323 258.502 680.309 260.374 683.585 259.674C686.862 258.974 685.46 261.546 678.662 263.182C671.864 264.817 663.428 266.925 662.254 267.397C661.08 267.869 661.08 273.012 654.519 275.82C654.519 275.82 655.929 285.178 648.895 279.799C648.895 279.799 641.159 275.584 641.159 273.484C641.159 271.385 635.772 265.062 630.376 271.376C630.376 271.376 622.64 276.528 617.016 276.755L606.942 281.671C606.942 281.671 600.617 281.671 595.457 285.414H585.61C585.61 285.414 584.437 291.029 575.536 289.857H566.399C566.399 289.857 560.538 288.222 557.726 288.921C557.726 288.921 557.025 294.3 558.663 296.408C558.663 296.408 554.678 298.516 552.803 298.516C550.928 298.516 542.255 293.837 537.104 298.516C531.953 303.195 531.945 305.067 531.945 305.067C531.945 305.067 533.118 311.618 528.432 314.661C528.432 314.661 519.066 312.452 518.349 311.137C518.349 311.137 510.808 312.334 506.138 309.94C506.138 309.94 498.597 314.484 493.445 312.334C488.294 310.184 483.438 309.468 483.438 309.468C483.438 309.468 482.408 308.574 483.438 307.647L483.455 307.638Z" stroke="#FFFEFE" stroke-width="8" mask="url(#path-3-outside-1_0_1)" />
								</g>
								<g stroke='#cec6c6' stroke-width="4" id="Tolitoli">
									<mask id="path-4-outside-2_0_1" maskUnits="userSpaceOnUse" x="368.482" y="210" width="173" height="122" fill="black">
										<rect fill="white" x="368.482" y="210" width="173" height="122" />
										<path d="M372.482 304.532C372.482 304.532 373.997 309.567 379.961 310.173V323.57L387.636 323.169C387.636 323.169 397.33 317.426 402.892 314.055C402.892 314.055 417.438 312.195 419.055 318.441C419.055 318.441 433.498 318.441 433.704 321.769C433.909 325.097 433.601 325.191 436.733 324.287C439.864 323.382 445.221 326.301 445.221 326.301C445.221 326.301 455.831 314.712 458.552 314.712C461.273 314.712 465.525 315.514 467.339 314.507C469.153 313.501 472.695 312.698 475.416 313.099C475.416 313.099 479.763 311.487 483.194 306.452C483.194 306.452 484.914 305.044 486.326 300.914C487.738 296.784 496.73 291.143 501.077 290.938C501.077 290.938 504.611 288.319 504.816 286.51C505.022 284.7 504.414 279.555 505.723 276.235C507.032 272.916 507.64 267.369 507.443 264.852C507.443 264.852 504.517 261.43 506.433 260.517C508.35 259.604 508.453 259.715 512.594 254.578C512.594 254.578 516.941 252.06 517.95 251.659C517.95 251.659 515.623 242.392 517.95 239.474C520.278 236.555 524.821 235.847 525.831 232.519C526.84 229.191 529.168 227.587 530.58 227.587C530.58 227.587 519.876 217.415 515.024 220.538C515.024 220.538 514.22 223.363 511.388 220.641C511.388 220.641 508.153 218.422 504.32 218.226C504.32 218.226 499.674 216.007 499.374 215.606C499.075 215.205 494.429 215 494.429 215C494.429 215 493.522 220.035 490.69 220.035C487.857 220.035 486.249 219.531 487.156 218.226C488.063 216.92 475.031 216.007 474.432 218.831C473.833 221.656 475.339 228.099 475.339 228.099C475.339 228.099 476.349 231.324 475.237 234.038C475.237 234.038 481.123 239.977 472.576 244.517C472.576 244.517 468.195 249.654 472.576 254.185C476.956 258.716 464.832 268.393 464.832 268.393C464.832 268.393 456.849 273.027 456.147 274.136C456.147 274.136 449.379 275.143 445.238 283.002C441.096 290.862 442.508 295.999 442.508 295.999C442.508 295.999 439.779 301.938 437.965 302.143C436.151 302.347 422.512 300.427 422.512 300.427L410.387 297.705C410.387 297.705 409.583 291.561 401.497 289.846C401.497 289.846 401.497 285.417 402.712 281.185C403.927 276.952 403.517 271.516 403.517 271.516C403.517 271.516 399.675 268.794 393.617 270.006C393.617 270.006 393.317 272.924 389.176 273.735C389.176 273.735 387.157 279.58 388.466 288.95C389.775 298.32 382.605 302.347 372.508 304.566L372.482 304.532Z" />
									</mask>
									<path d="M372.482 304.532C372.482 304.532 373.997 309.567 379.961 310.173V323.57L387.636 323.169C387.636 323.169 397.33 317.426 402.892 314.055C402.892 314.055 417.438 312.195 419.055 318.441C419.055 318.441 433.498 318.441 433.704 321.769C433.909 325.097 433.601 325.191 436.733 324.287C439.864 323.382 445.221 326.301 445.221 326.301C445.221 326.301 455.831 314.712 458.552 314.712C461.273 314.712 465.525 315.514 467.339 314.507C469.153 313.501 472.695 312.698 475.416 313.099C475.416 313.099 479.763 311.487 483.194 306.452C483.194 306.452 484.914 305.044 486.326 300.914C487.738 296.784 496.73 291.143 501.077 290.938C501.077 290.938 504.611 288.319 504.816 286.51C505.022 284.7 504.414 279.555 505.723 276.235C507.032 272.916 507.64 267.369 507.443 264.852C507.443 264.852 504.517 261.43 506.433 260.517C508.35 259.604 508.453 259.715 512.594 254.578C512.594 254.578 516.941 252.06 517.95 251.659C517.95 251.659 515.623 242.392 517.95 239.474C520.278 236.555 524.821 235.847 525.831 232.519C526.84 229.191 529.168 227.587 530.58 227.587C530.58 227.587 519.876 217.415 515.024 220.538C515.024 220.538 514.22 223.363 511.388 220.641C511.388 220.641 508.153 218.422 504.32 218.226C504.32 218.226 499.674 216.007 499.374 215.606C499.075 215.205 494.429 215 494.429 215C494.429 215 493.522 220.035 490.69 220.035C487.857 220.035 486.249 219.531 487.156 218.226C488.063 216.92 475.031 216.007 474.432 218.831C473.833 221.656 475.339 228.099 475.339 228.099C475.339 228.099 476.349 231.324 475.237 234.038C475.237 234.038 481.123 239.977 472.576 244.517C472.576 244.517 468.195 249.654 472.576 254.185C476.956 258.716 464.832 268.393 464.832 268.393C464.832 268.393 456.849 273.027 456.147 274.136C456.147 274.136 449.379 275.143 445.238 283.002C441.096 290.862 442.508 295.999 442.508 295.999C442.508 295.999 439.779 301.938 437.965 302.143C436.151 302.347 422.512 300.427 422.512 300.427L410.387 297.705C410.387 297.705 409.583 291.561 401.497 289.846C401.497 289.846 401.497 285.417 402.712 281.185C403.927 276.952 403.517 271.516 403.517 271.516C403.517 271.516 399.675 268.794 393.617 270.006C393.617 270.006 393.317 272.924 389.176 273.735C389.176 273.735 387.157 279.58 388.466 288.95C389.775 298.32 382.605 302.347 372.508 304.566L372.482 304.532Z" fill="#f1be5b" />
									<path d="M372.482 304.532C372.482 304.532 373.997 309.567 379.961 310.173V323.57L387.636 323.169C387.636 323.169 397.33 317.426 402.892 314.055C402.892 314.055 417.438 312.195 419.055 318.441C419.055 318.441 433.498 318.441 433.704 321.769C433.909 325.097 433.601 325.191 436.733 324.287C439.864 323.382 445.221 326.301 445.221 326.301C445.221 326.301 455.831 314.712 458.552 314.712C461.273 314.712 465.525 315.514 467.339 314.507C469.153 313.501 472.695 312.698 475.416 313.099C475.416 313.099 479.763 311.487 483.194 306.452C483.194 306.452 484.914 305.044 486.326 300.914C487.738 296.784 496.73 291.143 501.077 290.938C501.077 290.938 504.611 288.319 504.816 286.51C505.022 284.7 504.414 279.555 505.723 276.235C507.032 272.916 507.64 267.369 507.443 264.852C507.443 264.852 504.517 261.43 506.433 260.517C508.35 259.604 508.453 259.715 512.594 254.578C512.594 254.578 516.941 252.06 517.95 251.659C517.95 251.659 515.623 242.392 517.95 239.474C520.278 236.555 524.821 235.847 525.831 232.519C526.84 229.191 529.168 227.587 530.58 227.587C530.58 227.587 519.876 217.415 515.024 220.538C515.024 220.538 514.22 223.363 511.388 220.641C511.388 220.641 508.153 218.422 504.32 218.226C504.32 218.226 499.674 216.007 499.374 215.606C499.075 215.205 494.429 215 494.429 215C494.429 215 493.522 220.035 490.69 220.035C487.857 220.035 486.249 219.531 487.156 218.226C488.063 216.92 475.031 216.007 474.432 218.831C473.833 221.656 475.339 228.099 475.339 228.099C475.339 228.099 476.349 231.324 475.237 234.038C475.237 234.038 481.123 239.977 472.576 244.517C472.576 244.517 468.195 249.654 472.576 254.185C476.956 258.716 464.832 268.393 464.832 268.393C464.832 268.393 456.849 273.027 456.147 274.136C456.147 274.136 449.379 275.143 445.238 283.002C441.096 290.862 442.508 295.999 442.508 295.999C442.508 295.999 439.779 301.938 437.965 302.143C436.151 302.347 422.512 300.427 422.512 300.427L410.387 297.705C410.387 297.705 409.583 291.561 401.497 289.846C401.497 289.846 401.497 285.417 402.712 281.185C403.927 276.952 403.517 271.516 403.517 271.516C403.517 271.516 399.675 268.794 393.617 270.006C393.617 270.006 393.317 272.924 389.176 273.735C389.176 273.735 387.157 279.58 388.466 288.95C389.775 298.32 382.605 302.347 372.508 304.566L372.482 304.532Z" stroke="#FEFBFB" stroke-width="8" mask="url(#path-4-outside-2_0_1)" />
								</g>
								<g stroke='#cec6c6' stroke-width="4" id="Parigi">
									<mask id="path-5-outside-3_0_1" maskUnits="userSpaceOnUse" x="323.283" y="302.539" width="248" height="313" fill="black">
										<rect fill="white" x="323.283" y="302.539" width="248" height="313" />
										<path d="M398.903 606.613C398.903 606.613 407.681 603.326 411.09 601.376C411.09 601.376 421.845 601.376 429.012 598.364C429.012 598.364 434.122 595.528 436.806 595.705C436.806 595.705 433.307 591.177 431.339 589.582C429.37 587.987 428.655 585.409 428.565 583.814C428.476 582.219 425.612 578.222 422.83 578.222C420.047 578.222 414.499 577.602 412.522 570.593C412.522 570.593 412.253 567.846 408.844 567.58C405.435 567.314 402.125 568.555 399.709 572.02C399.709 572.02 394.779 572.108 393.257 572.994C393.257 572.994 389.49 568.201 389.401 566.96C389.311 565.719 383.218 562.166 383.218 562.166C383.218 562.166 379.541 554.891 378.377 554.537C377.214 554.182 374.521 554.803 373.268 552.41C372.016 550.018 371.479 546.73 362.513 539.278C362.513 539.278 354.809 526.5 354.093 522.15C353.378 517.799 352.572 511.587 351.677 507.688C350.783 503.79 351.946 496.594 354.997 493.67C354.997 493.67 355.713 487.193 349.977 483.019C349.977 483.019 348.546 475.567 348.904 471.837C348.904 471.837 349.351 469.799 345.226 467.663V450.712C345.226 450.712 350.067 447.247 349.798 441.753C349.53 436.26 349.351 432.175 349.351 432.175C349.351 432.175 357.86 432.175 359.301 425.609C360.741 419.043 359.927 416.384 360.375 415.578C360.822 414.772 362.254 412.113 360.554 409.809C360.554 409.809 359.748 408.126 362.075 406.167C364.401 404.209 365.484 400.222 363.864 397.032C362.245 393.842 376.23 380.258 376.23 380.258C376.23 380.258 380.265 374.046 382.144 368.543C382.144 368.543 388.059 366.417 389.669 360.471C389.669 360.471 399.798 349.288 411.081 347.782C411.081 347.782 412.066 348.845 414.302 347.782C416.539 346.719 419.143 342.191 426.131 341.659C433.119 341.127 437.334 342.279 440.823 340.95C444.313 339.621 456.231 341.925 456.947 344.592C457.663 347.259 466.172 349.953 466.172 349.953L466.441 353.896C466.441 353.896 468.329 356.235 470.02 353.497L469.751 349.483C469.751 349.483 471.711 348.411 472.919 350.015C474.127 351.619 476.498 353.356 480.614 353.223C480.614 353.223 487.566 362.447 492.219 359.505C496.872 356.563 508.414 353.754 508.414 353.754C508.414 353.754 515.027 360.569 518.74 359.231C522.453 357.892 529.406 357.423 529.406 357.423C529.406 357.423 529.066 354.082 529.943 353.48C530.819 352.877 534.13 348.535 542.496 349.935C542.496 349.935 542.899 343.591 552.008 345.46C552.008 345.46 556.195 347.8 557.269 347.8C557.269 347.8 577.875 349.271 559.873 338.602C559.873 338.602 561.984 332.993 555.426 333.099C548.867 333.206 539.651 325.284 539.651 325.284L539.543 323.52C539.543 323.52 531.652 318.895 530.435 317.141C530.435 317.141 522.435 315.156 519.438 313.508C516.44 311.859 509.658 314.278 509.658 314.278L505.766 312.187C505.766 312.187 495.548 316.591 492.103 314.721C488.658 312.852 482.654 311.753 481.884 310.539C481.884 310.539 478.243 315.935 471.836 316.042C471.836 316.042 467.103 316.042 465.439 318.239C465.439 318.239 458.441 316.042 454.218 319.887C449.995 323.733 445.548 331.221 440.555 328.359C440.555 328.359 437.003 325.275 431.33 328.359C431.33 328.359 432.77 321.863 427.33 322.528C421.89 323.193 416.217 321.863 416.217 321.863C416.217 321.863 415.77 317.796 411.77 317.796C407.771 317.796 402.107 316.254 402.107 316.254C402.107 316.254 399.664 314.828 393.105 320.322C386.547 325.816 382.887 327.916 376.105 326.267C376.105 326.267 374.217 326.161 374.217 329.351C374.217 332.541 369.331 338.708 369.331 338.708L368.445 348.615C368.445 348.615 358.997 352.797 363.336 356.865C363.336 356.865 363.667 360.17 360.115 360.498C356.563 360.825 356.116 365.894 356.116 365.894C356.116 365.894 354.004 369.961 352.563 370.076L352.116 378.326C352.116 378.326 356.447 378.326 358.003 387.019C358.003 387.019 359.668 391.086 354.559 392.965C349.449 394.843 350.452 400.115 350.452 400.115C350.452 400.115 348.367 402.977 345.244 402.534C345.244 402.534 342.569 404.298 341.898 406.167C341.227 408.037 337.343 408.914 337.343 408.914L336.457 416.836C336.457 416.836 333.12 421.24 334.238 429.711C335.357 438.182 329.568 441.266 329.568 441.266C329.568 441.266 326.678 444.35 329.568 446.875C332.458 449.401 333.567 456.339 330.239 457.765C330.239 457.765 329.129 459.75 330.462 462.276C330.462 462.276 327.125 465.138 329.908 467.229C332.69 469.32 333.245 472.838 330.355 476.249C330.355 476.249 329.353 477.898 330.462 479.439C331.572 480.981 330.57 489.346 330.57 489.346C330.57 489.346 330.794 492.536 332.789 493.75L333.12 502.336L343.902 516.975C343.902 516.975 343.016 522.256 346.676 523.798C346.676 523.798 349.118 531.17 347.347 533.368C345.575 535.565 346.899 541.511 346.899 541.511L349.566 548.99C349.566 548.99 350.675 557.027 350.013 558.896C349.351 560.766 355.793 563.407 355.793 563.407C355.793 563.407 353.351 572.206 354.684 574.084C356.017 575.963 357.35 574.412 356.903 579.144C356.903 579.144 363.345 578.479 365.018 584.647L369.904 584.975C369.904 584.975 374.789 588.28 376.794 586.401C376.794 586.401 382.458 590.805 382.126 597.407C382.126 597.407 387.236 601.474 388.13 601.474C389.025 601.474 395.128 596.077 397.132 599.489C399.136 602.9 399.27 603.884 398.921 606.587L398.903 606.613Z" />
									</mask>
									<path d="M398.903 606.613C398.903 606.613 407.681 603.326 411.09 601.376C411.09 601.376 421.845 601.376 429.012 598.364C429.012 598.364 434.122 595.528 436.806 595.705C436.806 595.705 433.307 591.177 431.339 589.582C429.37 587.987 428.655 585.409 428.565 583.814C428.476 582.219 425.612 578.222 422.83 578.222C420.047 578.222 414.499 577.602 412.522 570.593C412.522 570.593 412.253 567.846 408.844 567.58C405.435 567.314 402.125 568.555 399.709 572.02C399.709 572.02 394.779 572.108 393.257 572.994C393.257 572.994 389.49 568.201 389.401 566.96C389.311 565.719 383.218 562.166 383.218 562.166C383.218 562.166 379.541 554.891 378.377 554.537C377.214 554.182 374.521 554.803 373.268 552.41C372.016 550.018 371.479 546.73 362.513 539.278C362.513 539.278 354.809 526.5 354.093 522.15C353.378 517.799 352.572 511.587 351.677 507.688C350.783 503.79 351.946 496.594 354.997 493.67C354.997 493.67 355.713 487.193 349.977 483.019C349.977 483.019 348.546 475.567 348.904 471.837C348.904 471.837 349.351 469.799 345.226 467.663V450.712C345.226 450.712 350.067 447.247 349.798 441.753C349.53 436.26 349.351 432.175 349.351 432.175C349.351 432.175 357.86 432.175 359.301 425.609C360.741 419.043 359.927 416.384 360.375 415.578C360.822 414.772 362.254 412.113 360.554 409.809C360.554 409.809 359.748 408.126 362.075 406.167C364.401 404.209 365.484 400.222 363.864 397.032C362.245 393.842 376.23 380.258 376.23 380.258C376.23 380.258 380.265 374.046 382.144 368.543C382.144 368.543 388.059 366.417 389.669 360.471C389.669 360.471 399.798 349.288 411.081 347.782C411.081 347.782 412.066 348.845 414.302 347.782C416.539 346.719 419.143 342.191 426.131 341.659C433.119 341.127 437.334 342.279 440.823 340.95C444.313 339.621 456.231 341.925 456.947 344.592C457.663 347.259 466.172 349.953 466.172 349.953L466.441 353.896C466.441 353.896 468.329 356.235 470.02 353.497L469.751 349.483C469.751 349.483 471.711 348.411 472.919 350.015C474.127 351.619 476.498 353.356 480.614 353.223C480.614 353.223 487.566 362.447 492.219 359.505C496.872 356.563 508.414 353.754 508.414 353.754C508.414 353.754 515.027 360.569 518.74 359.231C522.453 357.892 529.406 357.423 529.406 357.423C529.406 357.423 529.066 354.082 529.943 353.48C530.819 352.877 534.13 348.535 542.496 349.935C542.496 349.935 542.899 343.591 552.008 345.46C552.008 345.46 556.195 347.8 557.269 347.8C557.269 347.8 577.875 349.271 559.873 338.602C559.873 338.602 561.984 332.993 555.426 333.099C548.867 333.206 539.651 325.284 539.651 325.284L539.543 323.52C539.543 323.52 531.652 318.895 530.435 317.141C530.435 317.141 522.435 315.156 519.438 313.508C516.44 311.859 509.658 314.278 509.658 314.278L505.766 312.187C505.766 312.187 495.548 316.591 492.103 314.721C488.658 312.852 482.654 311.753 481.884 310.539C481.884 310.539 478.243 315.935 471.836 316.042C471.836 316.042 467.103 316.042 465.439 318.239C465.439 318.239 458.441 316.042 454.218 319.887C449.995 323.733 445.548 331.221 440.555 328.359C440.555 328.359 437.003 325.275 431.33 328.359C431.33 328.359 432.77 321.863 427.33 322.528C421.89 323.193 416.217 321.863 416.217 321.863C416.217 321.863 415.77 317.796 411.77 317.796C407.771 317.796 402.107 316.254 402.107 316.254C402.107 316.254 399.664 314.828 393.105 320.322C386.547 325.816 382.887 327.916 376.105 326.267C376.105 326.267 374.217 326.161 374.217 329.351C374.217 332.541 369.331 338.708 369.331 338.708L368.445 348.615C368.445 348.615 358.997 352.797 363.336 356.865C363.336 356.865 363.667 360.17 360.115 360.498C356.563 360.825 356.116 365.894 356.116 365.894C356.116 365.894 354.004 369.961 352.563 370.076L352.116 378.326C352.116 378.326 356.447 378.326 358.003 387.019C358.003 387.019 359.668 391.086 354.559 392.965C349.449 394.843 350.452 400.115 350.452 400.115C350.452 400.115 348.367 402.977 345.244 402.534C345.244 402.534 342.569 404.298 341.898 406.167C341.227 408.037 337.343 408.914 337.343 408.914L336.457 416.836C336.457 416.836 333.12 421.24 334.238 429.711C335.357 438.182 329.568 441.266 329.568 441.266C329.568 441.266 326.678 444.35 329.568 446.875C332.458 449.401 333.567 456.339 330.239 457.765C330.239 457.765 329.129 459.75 330.462 462.276C330.462 462.276 327.125 465.138 329.908 467.229C332.69 469.32 333.245 472.838 330.355 476.249C330.355 476.249 329.353 477.898 330.462 479.439C331.572 480.981 330.57 489.346 330.57 489.346C330.57 489.346 330.794 492.536 332.789 493.75L333.12 502.336L343.902 516.975C343.902 516.975 343.016 522.256 346.676 523.798C346.676 523.798 349.118 531.17 347.347 533.368C345.575 535.565 346.899 541.511 346.899 541.511L349.566 548.99C349.566 548.99 350.675 557.027 350.013 558.896C349.351 560.766 355.793 563.407 355.793 563.407C355.793 563.407 353.351 572.206 354.684 574.084C356.017 575.963 357.35 574.412 356.903 579.144C356.903 579.144 363.345 578.479 365.018 584.647L369.904 584.975C369.904 584.975 374.789 588.28 376.794 586.401C376.794 586.401 382.458 590.805 382.126 597.407C382.126 597.407 387.236 601.474 388.13 601.474C389.025 601.474 395.128 596.077 397.132 599.489C399.136 602.9 399.27 603.884 398.921 606.587L398.903 606.613Z" fill="#f1be5b" />
									<path d="M398.903 606.613C398.903 606.613 407.681 603.326 411.09 601.376C411.09 601.376 421.845 601.376 429.012 598.364C429.012 598.364 434.122 595.528 436.806 595.705C436.806 595.705 433.307 591.177 431.339 589.582C429.37 587.987 428.655 585.409 428.565 583.814C428.476 582.219 425.612 578.222 422.83 578.222C420.047 578.222 414.499 577.602 412.522 570.593C412.522 570.593 412.253 567.846 408.844 567.58C405.435 567.314 402.125 568.555 399.709 572.02C399.709 572.02 394.779 572.108 393.257 572.994C393.257 572.994 389.49 568.201 389.401 566.96C389.311 565.719 383.218 562.166 383.218 562.166C383.218 562.166 379.541 554.891 378.377 554.537C377.214 554.182 374.521 554.803 373.268 552.41C372.016 550.018 371.479 546.73 362.513 539.278C362.513 539.278 354.809 526.5 354.093 522.15C353.378 517.799 352.572 511.587 351.677 507.688C350.783 503.79 351.946 496.594 354.997 493.67C354.997 493.67 355.713 487.193 349.977 483.019C349.977 483.019 348.546 475.567 348.904 471.837C348.904 471.837 349.351 469.799 345.226 467.663V450.712C345.226 450.712 350.067 447.247 349.798 441.753C349.53 436.26 349.351 432.175 349.351 432.175C349.351 432.175 357.86 432.175 359.301 425.609C360.741 419.043 359.927 416.384 360.375 415.578C360.822 414.772 362.254 412.113 360.554 409.809C360.554 409.809 359.748 408.126 362.075 406.167C364.401 404.209 365.484 400.222 363.864 397.032C362.245 393.842 376.23 380.258 376.23 380.258C376.23 380.258 380.265 374.046 382.144 368.543C382.144 368.543 388.059 366.417 389.669 360.471C389.669 360.471 399.798 349.288 411.081 347.782C411.081 347.782 412.066 348.845 414.302 347.782C416.539 346.719 419.143 342.191 426.131 341.659C433.119 341.127 437.334 342.279 440.823 340.95C444.313 339.621 456.231 341.925 456.947 344.592C457.663 347.259 466.172 349.953 466.172 349.953L466.441 353.896C466.441 353.896 468.329 356.235 470.02 353.497L469.751 349.483C469.751 349.483 471.711 348.411 472.919 350.015C474.127 351.619 476.498 353.356 480.614 353.223C480.614 353.223 487.566 362.447 492.219 359.505C496.872 356.563 508.414 353.754 508.414 353.754C508.414 353.754 515.027 360.569 518.74 359.231C522.453 357.892 529.406 357.423 529.406 357.423C529.406 357.423 529.066 354.082 529.943 353.48C530.819 352.877 534.13 348.535 542.496 349.935C542.496 349.935 542.899 343.591 552.008 345.46C552.008 345.46 556.195 347.8 557.269 347.8C557.269 347.8 577.875 349.271 559.873 338.602C559.873 338.602 561.984 332.993 555.426 333.099C548.867 333.206 539.651 325.284 539.651 325.284L539.543 323.52C539.543 323.52 531.652 318.895 530.435 317.141C530.435 317.141 522.435 315.156 519.438 313.508C516.44 311.859 509.658 314.278 509.658 314.278L505.766 312.187C505.766 312.187 495.548 316.591 492.103 314.721C488.658 312.852 482.654 311.753 481.884 310.539C481.884 310.539 478.243 315.935 471.836 316.042C471.836 316.042 467.103 316.042 465.439 318.239C465.439 318.239 458.441 316.042 454.218 319.887C449.995 323.733 445.548 331.221 440.555 328.359C440.555 328.359 437.003 325.275 431.33 328.359C431.33 328.359 432.77 321.863 427.33 322.528C421.89 323.193 416.217 321.863 416.217 321.863C416.217 321.863 415.77 317.796 411.77 317.796C407.771 317.796 402.107 316.254 402.107 316.254C402.107 316.254 399.664 314.828 393.105 320.322C386.547 325.816 382.887 327.916 376.105 326.267C376.105 326.267 374.217 326.161 374.217 329.351C374.217 332.541 369.331 338.708 369.331 338.708L368.445 348.615C368.445 348.615 358.997 352.797 363.336 356.865C363.336 356.865 363.667 360.17 360.115 360.498C356.563 360.825 356.116 365.894 356.116 365.894C356.116 365.894 354.004 369.961 352.563 370.076L352.116 378.326C352.116 378.326 356.447 378.326 358.003 387.019C358.003 387.019 359.668 391.086 354.559 392.965C349.449 394.843 350.452 400.115 350.452 400.115C350.452 400.115 348.367 402.977 345.244 402.534C345.244 402.534 342.569 404.298 341.898 406.167C341.227 408.037 337.343 408.914 337.343 408.914L336.457 416.836C336.457 416.836 333.12 421.24 334.238 429.711C335.357 438.182 329.568 441.266 329.568 441.266C329.568 441.266 326.678 444.35 329.568 446.875C332.458 449.401 333.567 456.339 330.239 457.765C330.239 457.765 329.129 459.75 330.462 462.276C330.462 462.276 327.125 465.138 329.908 467.229C332.69 469.32 333.245 472.838 330.355 476.249C330.355 476.249 329.353 477.898 330.462 479.439C331.572 480.981 330.57 489.346 330.57 489.346C330.57 489.346 330.794 492.536 332.789 493.75L333.12 502.336L343.902 516.975C343.902 516.975 343.016 522.256 346.676 523.798C346.676 523.798 349.118 531.17 347.347 533.368C345.575 535.565 346.899 541.511 346.899 541.511L349.566 548.99C349.566 548.99 350.675 557.027 350.013 558.896C349.351 560.766 355.793 563.407 355.793 563.407C355.793 563.407 353.351 572.206 354.684 574.084C356.017 575.963 357.35 574.412 356.903 579.144C356.903 579.144 363.345 578.479 365.018 584.647L369.904 584.975C369.904 584.975 374.789 588.28 376.794 586.401C376.794 586.401 382.458 590.805 382.126 597.407C382.126 597.407 387.236 601.474 388.13 601.474C389.025 601.474 395.128 596.077 397.132 599.489C399.136 602.9 399.27 603.884 398.921 606.587L398.903 606.613Z" stroke="#FCFBFB" stroke-width="8" mask="url(#path-5-outside-3_0_1)" />
								</g>
								<g stroke='#cec6c6' stroke-width="4" id="Morowali">
									<mask id="path-6-outside-4_0_1" maskUnits="userSpaceOnUse" x="547.922" y="754.894" width="201" height="191" fill="black">
										<rect fill="white" x="547.922" y="754.894" width="201" height="191" />
										<path d="M553.492 799.94C553.492 799.94 561.858 800.816 563.312 793.242C563.312 793.242 561.072 787.612 560.295 786.836C559.518 786.06 561.657 785.285 561.657 785.285C561.657 785.285 568.854 778.295 570.408 773.541C570.408 773.541 574.002 767.527 578.573 764.808C583.145 762.089 587.617 758.996 589.171 758.895C590.726 758.795 588.394 764.233 596.175 765.785C603.957 767.336 615.524 767.527 615.524 767.527C615.524 767.527 617.654 767.92 619.556 770.63C621.458 773.34 630.401 783.925 632.248 783.925C632.248 783.925 633.61 784.801 635.842 784.701C635.842 784.701 637.012 785.285 636.911 787.612C636.811 789.939 643.815 800.423 643.815 800.423C643.815 800.423 652.465 811.775 654.806 813.326C654.806 813.326 653.837 819.44 655.291 821.092C655.291 821.092 655.583 826.43 660.932 829.441C660.932 829.441 667.443 842.444 670.268 844.288C673.094 846.131 667.251 846.03 666.675 847.007C666.675 847.007 667.452 852.929 667.452 854.188C667.452 854.188 674.456 856.031 679.311 864.956H687.541C687.541 864.956 690.778 867.356 691.134 868.551H696.977C696.977 868.551 697.682 871.435 696.557 872.347C695.432 873.26 695.432 882.394 699.721 881.974C704.009 881.554 705.28 880.569 705.28 880.569C705.28 880.569 710.629 879.866 712.248 881.135C713.866 882.403 717.597 886.19 717.597 886.19C717.597 886.19 715.905 896.583 706.972 900.516C706.972 900.516 705.426 905.781 712.184 907.752C718.941 909.723 722.461 915.764 723.376 918.994C724.29 922.225 729.923 922.644 732.035 920.965C732.035 920.965 733.306 920.053 735.839 920.473C735.839 920.473 736.68 925.245 741.682 925.108C741.682 925.108 745.961 928.411 743.008 928.548C740.054 928.685 734.778 928.475 735.135 933.111C735.491 937.746 735.839 938.376 733.516 938.732C731.194 939.088 729.712 939.508 729.365 939.854C729.018 940.201 725.918 940.42 725.918 939.079L724.226 939.152L724.089 936.624L718.74 936.834C718.74 936.834 718.036 938.732 718.036 939.435C718.036 940.137 715.503 941.333 714.378 940.913V935.155C714.378 935.155 716.564 932.062 716.207 927.216C715.85 922.371 710.227 921.102 710.227 921.102L702.976 920.965L694.317 912.324V906.986C694.317 906.986 695.514 906.283 694.6 904.741C693.686 903.199 684.459 901.365 684.459 901.365C684.459 901.365 680.235 899.823 679.458 895.251C678.681 890.679 673.048 891.528 673.048 891.528L671.073 892.231H666.217C666.217 892.231 655.94 895.041 655.163 896.519L649.74 896.446C649.74 896.446 644.318 893.307 640.578 893.563C640.578 893.563 640.322 894.074 637.762 893.764C635.201 893.453 633.665 890.597 631.516 890.442C629.368 890.287 625.216 887.276 625.116 886.911C625.015 886.546 619.895 886.144 619.895 886.144L614.052 882.978L614.509 880.067C614.509 880.067 611.848 877.612 611.793 875.979C611.738 874.345 610.97 872.192 615.89 869.947C620.809 867.702 620.498 867.958 620.498 867.958L620.398 861.726C620.398 861.726 622.757 858.459 624.494 857.282C626.231 856.104 626.131 851.56 626.131 851.56C626.131 851.56 634.479 843.329 628.636 839.141C622.793 834.953 617.316 824.723 617.316 824.723L608.511 824.313C608.511 824.313 605.383 817.259 603.747 816.748C602.11 816.237 593.551 816.648 593.551 816.648C593.551 816.648 589.299 811.894 585.66 811.538C585.66 811.538 582.533 808.828 581.765 807.039C580.997 805.251 571.158 802.851 567.171 803.206C567.171 803.206 563.148 802.495 562.023 802.13C560.898 801.765 557.003 800.797 557.003 800.797L553.483 800.642C553.483 800.642 552.221 800.35 553.483 799.958L553.492 799.94Z" />
									</mask>
									<path d="M553.492 799.94C553.492 799.94 561.858 800.816 563.312 793.242C563.312 793.242 561.072 787.612 560.295 786.836C559.518 786.06 561.657 785.285 561.657 785.285C561.657 785.285 568.854 778.295 570.408 773.541C570.408 773.541 574.002 767.527 578.573 764.808C583.145 762.089 587.617 758.996 589.171 758.895C590.726 758.795 588.394 764.233 596.175 765.785C603.957 767.336 615.524 767.527 615.524 767.527C615.524 767.527 617.654 767.92 619.556 770.63C621.458 773.34 630.401 783.925 632.248 783.925C632.248 783.925 633.61 784.801 635.842 784.701C635.842 784.701 637.012 785.285 636.911 787.612C636.811 789.939 643.815 800.423 643.815 800.423C643.815 800.423 652.465 811.775 654.806 813.326C654.806 813.326 653.837 819.44 655.291 821.092C655.291 821.092 655.583 826.43 660.932 829.441C660.932 829.441 667.443 842.444 670.268 844.288C673.094 846.131 667.251 846.03 666.675 847.007C666.675 847.007 667.452 852.929 667.452 854.188C667.452 854.188 674.456 856.031 679.311 864.956H687.541C687.541 864.956 690.778 867.356 691.134 868.551H696.977C696.977 868.551 697.682 871.435 696.557 872.347C695.432 873.26 695.432 882.394 699.721 881.974C704.009 881.554 705.28 880.569 705.28 880.569C705.28 880.569 710.629 879.866 712.248 881.135C713.866 882.403 717.597 886.19 717.597 886.19C717.597 886.19 715.905 896.583 706.972 900.516C706.972 900.516 705.426 905.781 712.184 907.752C718.941 909.723 722.461 915.764 723.376 918.994C724.29 922.225 729.923 922.644 732.035 920.965C732.035 920.965 733.306 920.053 735.839 920.473C735.839 920.473 736.68 925.245 741.682 925.108C741.682 925.108 745.961 928.411 743.008 928.548C740.054 928.685 734.778 928.475 735.135 933.111C735.491 937.746 735.839 938.376 733.516 938.732C731.194 939.088 729.712 939.508 729.365 939.854C729.018 940.201 725.918 940.42 725.918 939.079L724.226 939.152L724.089 936.624L718.74 936.834C718.74 936.834 718.036 938.732 718.036 939.435C718.036 940.137 715.503 941.333 714.378 940.913V935.155C714.378 935.155 716.564 932.062 716.207 927.216C715.85 922.371 710.227 921.102 710.227 921.102L702.976 920.965L694.317 912.324V906.986C694.317 906.986 695.514 906.283 694.6 904.741C693.686 903.199 684.459 901.365 684.459 901.365C684.459 901.365 680.235 899.823 679.458 895.251C678.681 890.679 673.048 891.528 673.048 891.528L671.073 892.231H666.217C666.217 892.231 655.94 895.041 655.163 896.519L649.74 896.446C649.74 896.446 644.318 893.307 640.578 893.563C640.578 893.563 640.322 894.074 637.762 893.764C635.201 893.453 633.665 890.597 631.516 890.442C629.368 890.287 625.216 887.276 625.116 886.911C625.015 886.546 619.895 886.144 619.895 886.144L614.052 882.978L614.509 880.067C614.509 880.067 611.848 877.612 611.793 875.979C611.738 874.345 610.97 872.192 615.89 869.947C620.809 867.702 620.498 867.958 620.498 867.958L620.398 861.726C620.398 861.726 622.757 858.459 624.494 857.282C626.231 856.104 626.131 851.56 626.131 851.56C626.131 851.56 634.479 843.329 628.636 839.141C622.793 834.953 617.316 824.723 617.316 824.723L608.511 824.313C608.511 824.313 605.383 817.259 603.747 816.748C602.11 816.237 593.551 816.648 593.551 816.648C593.551 816.648 589.299 811.894 585.66 811.538C585.66 811.538 582.533 808.828 581.765 807.039C580.997 805.251 571.158 802.851 567.171 803.206C567.171 803.206 563.148 802.495 562.023 802.13C560.898 801.765 557.003 800.797 557.003 800.797L553.483 800.642C553.483 800.642 552.221 800.35 553.483 799.958L553.492 799.94Z" fill="#bf7070" />
									<path d="M553.492 799.94C553.492 799.94 561.858 800.816 563.312 793.242C563.312 793.242 561.072 787.612 560.295 786.836C559.518 786.06 561.657 785.285 561.657 785.285C561.657 785.285 568.854 778.295 570.408 773.541C570.408 773.541 574.002 767.527 578.573 764.808C583.145 762.089 587.617 758.996 589.171 758.895C590.726 758.795 588.394 764.233 596.175 765.785C603.957 767.336 615.524 767.527 615.524 767.527C615.524 767.527 617.654 767.92 619.556 770.63C621.458 773.34 630.401 783.925 632.248 783.925C632.248 783.925 633.61 784.801 635.842 784.701C635.842 784.701 637.012 785.285 636.911 787.612C636.811 789.939 643.815 800.423 643.815 800.423C643.815 800.423 652.465 811.775 654.806 813.326C654.806 813.326 653.837 819.44 655.291 821.092C655.291 821.092 655.583 826.43 660.932 829.441C660.932 829.441 667.443 842.444 670.268 844.288C673.094 846.131 667.251 846.03 666.675 847.007C666.675 847.007 667.452 852.929 667.452 854.188C667.452 854.188 674.456 856.031 679.311 864.956H687.541C687.541 864.956 690.778 867.356 691.134 868.551H696.977C696.977 868.551 697.682 871.435 696.557 872.347C695.432 873.26 695.432 882.394 699.721 881.974C704.009 881.554 705.28 880.569 705.28 880.569C705.28 880.569 710.629 879.866 712.248 881.135C713.866 882.403 717.597 886.19 717.597 886.19C717.597 886.19 715.905 896.583 706.972 900.516C706.972 900.516 705.426 905.781 712.184 907.752C718.941 909.723 722.461 915.764 723.376 918.994C724.29 922.225 729.923 922.644 732.035 920.965C732.035 920.965 733.306 920.053 735.839 920.473C735.839 920.473 736.68 925.245 741.682 925.108C741.682 925.108 745.961 928.411 743.008 928.548C740.054 928.685 734.778 928.475 735.135 933.111C735.491 937.746 735.839 938.376 733.516 938.732C731.194 939.088 729.712 939.508 729.365 939.854C729.018 940.201 725.918 940.42 725.918 939.079L724.226 939.152L724.089 936.624L718.74 936.834C718.74 936.834 718.036 938.732 718.036 939.435C718.036 940.137 715.503 941.333 714.378 940.913V935.155C714.378 935.155 716.564 932.062 716.207 927.216C715.85 922.371 710.227 921.102 710.227 921.102L702.976 920.965L694.317 912.324V906.986C694.317 906.986 695.514 906.283 694.6 904.741C693.686 903.199 684.459 901.365 684.459 901.365C684.459 901.365 680.235 899.823 679.458 895.251C678.681 890.679 673.048 891.528 673.048 891.528L671.073 892.231H666.217C666.217 892.231 655.94 895.041 655.163 896.519L649.74 896.446C649.74 896.446 644.318 893.307 640.578 893.563C640.578 893.563 640.322 894.074 637.762 893.764C635.201 893.453 633.665 890.597 631.516 890.442C629.368 890.287 625.216 887.276 625.116 886.911C625.015 886.546 619.895 886.144 619.895 886.144L614.052 882.978L614.509 880.067C614.509 880.067 611.848 877.612 611.793 875.979C611.738 874.345 610.97 872.192 615.89 869.947C620.809 867.702 620.498 867.958 620.498 867.958L620.398 861.726C620.398 861.726 622.757 858.459 624.494 857.282C626.231 856.104 626.131 851.56 626.131 851.56C626.131 851.56 634.479 843.329 628.636 839.141C622.793 834.953 617.316 824.723 617.316 824.723L608.511 824.313C608.511 824.313 605.383 817.259 603.747 816.748C602.11 816.237 593.551 816.648 593.551 816.648C593.551 816.648 589.299 811.894 585.66 811.538C585.66 811.538 582.533 808.828 581.765 807.039C580.997 805.251 571.158 802.851 567.171 803.206C567.171 803.206 563.148 802.495 562.023 802.13C560.898 801.765 557.003 800.797 557.003 800.797L553.483 800.642C553.483 800.642 552.221 800.35 553.483 799.958L553.492 799.94Z" stroke="white" stroke-width="8" mask="url(#path-6-outside-4_0_1)" />
								</g>
								<g stroke='#cec6c6' stroke-width="4" id="Banggai">
									<mask id="path-7-outside-5_0_1" maskUnits="userSpaceOnUse" x="632.221" y="519.623" width="250" height="164" fill="black">
										<rect fill="white" x="632.221" y="519.623" width="250" height="164" />
										<path d="M636.221 584.357C636.221 584.357 636.221 593.301 637.179 595.92C638.137 598.538 643.035 609.743 643.035 609.743C643.035 609.743 645.067 611.413 647.816 610.931C650.565 610.449 654.147 607.715 654.147 607.357C654.147 607 659.045 608.67 659.045 608.67H662.51L663.701 607.241C663.701 607.241 667.525 610.94 667.167 615.944C667.167 615.944 678.396 624.646 670.274 634.779C670.274 634.779 667.766 638.237 662.985 638.711C662.985 638.711 666.692 649.442 666.692 650.871C666.692 652.301 663.585 651.827 663.468 652.418C663.352 653.008 660.844 657.189 661.436 657.904C662.027 658.618 665.143 661.96 665.734 662.193C666.325 662.425 663.11 667.679 663.826 670.413C664.543 673.148 667.766 679.116 667.766 679.116H689.033C689.033 679.116 695.605 676.731 699.662 671.843C703.719 666.956 713.398 665.409 713.398 665.409C713.398 665.409 715.906 663.381 717.697 663.506C717.697 663.506 719.729 655.759 722.478 654.329C722.478 654.329 723.553 652.185 727.018 650.398C730.483 648.611 732.749 643.249 732.749 643.249L743.503 634.546V628.113L753.657 624.181V617.39C753.657 617.39 754.257 615.603 755.69 614.647L758.914 612.502C758.914 612.502 758.439 609.518 760.821 609.286C763.204 609.053 766.194 608.928 766.194 608.928C766.194 608.928 765.594 604.514 769.06 601.298C772.525 598.081 778.256 590.691 778.256 590.691C778.256 590.691 775.99 581.872 781.121 579.486C786.253 577.101 794.858 577.94 794.858 577.94L804.295 574.956C804.295 574.956 809.668 574.84 811.942 575.43C814.217 576.02 818.157 574.715 818.39 570.426C818.39 570.426 820.064 566.727 824.604 565.181C824.604 565.181 832.726 569.595 831.176 574.241C829.627 578.888 830.818 581.872 830.818 581.872C830.818 581.872 836.075 582.47 838.465 585.571C840.856 588.671 845.754 590.217 845.754 590.217C845.754 590.217 849.219 595.346 849.936 595.462C850.652 595.579 857.458 596.418 859.49 595.703C861.523 594.989 865.463 592.719 865.704 585.687L868.57 582.828C868.57 582.828 865.579 579.486 867.97 572.695C870.361 565.904 874.543 565.904 874.543 565.904V559.828C874.543 559.828 875.734 555.772 877.291 555.298C878.849 554.824 874.301 548.507 874.301 548.507C874.301 548.507 864.388 542.788 868.687 538.258C868.687 538.258 871.91 537.427 865.938 535.639C859.965 533.852 851.485 529.796 849.927 528.009C849.927 528.009 834.159 525.391 828.069 526.338C821.98 527.286 818.157 525.623 818.157 525.623C818.157 525.623 814.933 533.487 801.43 533.969C801.43 533.969 795.099 534.085 792.109 535.398C792.109 535.398 788.169 534.567 786.253 535.997C786.253 535.997 782.671 536.712 780.28 535.639C780.28 535.639 773.474 544.218 775.982 544.583C778.489 544.949 778.972 546.129 784.104 545.656C789.235 545.182 793.067 549.945 793.067 549.945C793.067 549.945 802.746 549.704 803.104 553.045C803.104 553.045 797.015 554.475 795.816 554.949C794.616 555.423 779.222 556.329 777.773 556.403C776.323 556.478 769.368 561.033 769.368 561.033C769.368 561.033 761.396 564.724 753.566 554.741C753.566 554.741 751.825 553.369 748.276 556.046C744.728 558.722 737.914 557.492 734.282 554.957C730.65 552.422 722.103 557.052 722.103 557.052C722.103 557.052 712.532 557.193 710.574 556.254C710.574 556.254 708.542 556.179 705.793 558.348L697.388 557.767C697.388 557.767 692.457 557.043 689.849 558.49C687.242 559.936 686.809 561.889 686.809 561.889H683.477C683.477 561.889 683.693 566.594 681.811 568.614C679.928 570.634 681.519 575.272 681.519 575.272C681.519 575.272 676.663 585.18 668.908 580.841C668.908 580.841 662.602 578.597 658.47 580.409C658.47 580.409 650.857 593.717 641.144 585.255C641.144 585.255 638.886 583.734 636.246 584.382L636.221 584.357Z" />
									</mask>
									<path d="M636.221 584.357C636.221 584.357 636.221 593.301 637.179 595.92C638.137 598.538 643.035 609.743 643.035 609.743C643.035 609.743 645.067 611.413 647.816 610.931C650.565 610.449 654.147 607.715 654.147 607.357C654.147 607 659.045 608.67 659.045 608.67H662.51L663.701 607.241C663.701 607.241 667.525 610.94 667.167 615.944C667.167 615.944 678.396 624.646 670.274 634.779C670.274 634.779 667.766 638.237 662.985 638.711C662.985 638.711 666.692 649.442 666.692 650.871C666.692 652.301 663.585 651.827 663.468 652.418C663.352 653.008 660.844 657.189 661.436 657.904C662.027 658.618 665.143 661.96 665.734 662.193C666.325 662.425 663.11 667.679 663.826 670.413C664.543 673.148 667.766 679.116 667.766 679.116H689.033C689.033 679.116 695.605 676.731 699.662 671.843C703.719 666.956 713.398 665.409 713.398 665.409C713.398 665.409 715.906 663.381 717.697 663.506C717.697 663.506 719.729 655.759 722.478 654.329C722.478 654.329 723.553 652.185 727.018 650.398C730.483 648.611 732.749 643.249 732.749 643.249L743.503 634.546V628.113L753.657 624.181V617.39C753.657 617.39 754.257 615.603 755.69 614.647L758.914 612.502C758.914 612.502 758.439 609.518 760.821 609.286C763.204 609.053 766.194 608.928 766.194 608.928C766.194 608.928 765.594 604.514 769.06 601.298C772.525 598.081 778.256 590.691 778.256 590.691C778.256 590.691 775.99 581.872 781.121 579.486C786.253 577.101 794.858 577.94 794.858 577.94L804.295 574.956C804.295 574.956 809.668 574.84 811.942 575.43C814.217 576.02 818.157 574.715 818.39 570.426C818.39 570.426 820.064 566.727 824.604 565.181C824.604 565.181 832.726 569.595 831.176 574.241C829.627 578.888 830.818 581.872 830.818 581.872C830.818 581.872 836.075 582.47 838.465 585.571C840.856 588.671 845.754 590.217 845.754 590.217C845.754 590.217 849.219 595.346 849.936 595.462C850.652 595.579 857.458 596.418 859.49 595.703C861.523 594.989 865.463 592.719 865.704 585.687L868.57 582.828C868.57 582.828 865.579 579.486 867.97 572.695C870.361 565.904 874.543 565.904 874.543 565.904V559.828C874.543 559.828 875.734 555.772 877.291 555.298C878.849 554.824 874.301 548.507 874.301 548.507C874.301 548.507 864.388 542.788 868.687 538.258C868.687 538.258 871.91 537.427 865.938 535.639C859.965 533.852 851.485 529.796 849.927 528.009C849.927 528.009 834.159 525.391 828.069 526.338C821.98 527.286 818.157 525.623 818.157 525.623C818.157 525.623 814.933 533.487 801.43 533.969C801.43 533.969 795.099 534.085 792.109 535.398C792.109 535.398 788.169 534.567 786.253 535.997C786.253 535.997 782.671 536.712 780.28 535.639C780.28 535.639 773.474 544.218 775.982 544.583C778.489 544.949 778.972 546.129 784.104 545.656C789.235 545.182 793.067 549.945 793.067 549.945C793.067 549.945 802.746 549.704 803.104 553.045C803.104 553.045 797.015 554.475 795.816 554.949C794.616 555.423 779.222 556.329 777.773 556.403C776.323 556.478 769.368 561.033 769.368 561.033C769.368 561.033 761.396 564.724 753.566 554.741C753.566 554.741 751.825 553.369 748.276 556.046C744.728 558.722 737.914 557.492 734.282 554.957C730.65 552.422 722.103 557.052 722.103 557.052C722.103 557.052 712.532 557.193 710.574 556.254C710.574 556.254 708.542 556.179 705.793 558.348L697.388 557.767C697.388 557.767 692.457 557.043 689.849 558.49C687.242 559.936 686.809 561.889 686.809 561.889H683.477C683.477 561.889 683.693 566.594 681.811 568.614C679.928 570.634 681.519 575.272 681.519 575.272C681.519 575.272 676.663 585.18 668.908 580.841C668.908 580.841 662.602 578.597 658.47 580.409C658.47 580.409 650.857 593.717 641.144 585.255C641.144 585.255 638.886 583.734 636.246 584.382L636.221 584.357Z" fill="#bf7070" />
									<path d="M636.221 584.357C636.221 584.357 636.221 593.301 637.179 595.92C638.137 598.538 643.035 609.743 643.035 609.743C643.035 609.743 645.067 611.413 647.816 610.931C650.565 610.449 654.147 607.715 654.147 607.357C654.147 607 659.045 608.67 659.045 608.67H662.51L663.701 607.241C663.701 607.241 667.525 610.94 667.167 615.944C667.167 615.944 678.396 624.646 670.274 634.779C670.274 634.779 667.766 638.237 662.985 638.711C662.985 638.711 666.692 649.442 666.692 650.871C666.692 652.301 663.585 651.827 663.468 652.418C663.352 653.008 660.844 657.189 661.436 657.904C662.027 658.618 665.143 661.96 665.734 662.193C666.325 662.425 663.11 667.679 663.826 670.413C664.543 673.148 667.766 679.116 667.766 679.116H689.033C689.033 679.116 695.605 676.731 699.662 671.843C703.719 666.956 713.398 665.409 713.398 665.409C713.398 665.409 715.906 663.381 717.697 663.506C717.697 663.506 719.729 655.759 722.478 654.329C722.478 654.329 723.553 652.185 727.018 650.398C730.483 648.611 732.749 643.249 732.749 643.249L743.503 634.546V628.113L753.657 624.181V617.39C753.657 617.39 754.257 615.603 755.69 614.647L758.914 612.502C758.914 612.502 758.439 609.518 760.821 609.286C763.204 609.053 766.194 608.928 766.194 608.928C766.194 608.928 765.594 604.514 769.06 601.298C772.525 598.081 778.256 590.691 778.256 590.691C778.256 590.691 775.99 581.872 781.121 579.486C786.253 577.101 794.858 577.94 794.858 577.94L804.295 574.956C804.295 574.956 809.668 574.84 811.942 575.43C814.217 576.02 818.157 574.715 818.39 570.426C818.39 570.426 820.064 566.727 824.604 565.181C824.604 565.181 832.726 569.595 831.176 574.241C829.627 578.888 830.818 581.872 830.818 581.872C830.818 581.872 836.075 582.47 838.465 585.571C840.856 588.671 845.754 590.217 845.754 590.217C845.754 590.217 849.219 595.346 849.936 595.462C850.652 595.579 857.458 596.418 859.49 595.703C861.523 594.989 865.463 592.719 865.704 585.687L868.57 582.828C868.57 582.828 865.579 579.486 867.97 572.695C870.361 565.904 874.543 565.904 874.543 565.904V559.828C874.543 559.828 875.734 555.772 877.291 555.298C878.849 554.824 874.301 548.507 874.301 548.507C874.301 548.507 864.388 542.788 868.687 538.258C868.687 538.258 871.91 537.427 865.938 535.639C859.965 533.852 851.485 529.796 849.927 528.009C849.927 528.009 834.159 525.391 828.069 526.338C821.98 527.286 818.157 525.623 818.157 525.623C818.157 525.623 814.933 533.487 801.43 533.969C801.43 533.969 795.099 534.085 792.109 535.398C792.109 535.398 788.169 534.567 786.253 535.997C786.253 535.997 782.671 536.712 780.28 535.639C780.28 535.639 773.474 544.218 775.982 544.583C778.489 544.949 778.972 546.129 784.104 545.656C789.235 545.182 793.067 549.945 793.067 549.945C793.067 549.945 802.746 549.704 803.104 553.045C803.104 553.045 797.015 554.475 795.816 554.949C794.616 555.423 779.222 556.329 777.773 556.403C776.323 556.478 769.368 561.033 769.368 561.033C769.368 561.033 761.396 564.724 753.566 554.741C753.566 554.741 751.825 553.369 748.276 556.046C744.728 558.722 737.914 557.492 734.282 554.957C730.65 552.422 722.103 557.052 722.103 557.052C722.103 557.052 712.532 557.193 710.574 556.254C710.574 556.254 708.542 556.179 705.793 558.348L697.388 557.767C697.388 557.767 692.457 557.043 689.849 558.49C687.242 559.936 686.809 561.889 686.809 561.889H683.477C683.477 561.889 683.693 566.594 681.811 568.614C679.928 570.634 681.519 575.272 681.519 575.272C681.519 575.272 676.663 585.18 668.908 580.841C668.908 580.841 662.602 578.597 658.47 580.409C658.47 580.409 650.857 593.717 641.144 585.255C641.144 585.255 638.886 583.734 636.246 584.382L636.221 584.357Z" stroke="white" stroke-width="8" mask="url(#path-7-outside-5_0_1)" />
								</g>
								<g stroke='#cec6c6' stroke-width="4" id="Morowali-Utara">
									<mask id="path-8-outside-6_0_1" maskUnits="userSpaceOnUse" x="469.995" y="622.255" width="207" height="181" fill="black">
										<rect fill="white" x="469.995" y="622.255" width="207" height="181" />
										<path d="M489.655 723.971C489.655 723.971 487.702 728.436 486.024 730.11C484.346 731.784 475.673 744.753 475.673 744.753C475.673 744.753 473.995 748.517 473.995 750.75V758.004L475.114 760.936L475.389 764.143L475.531 766.65L476.365 772.231L486.006 772.93C486.006 772.93 498.869 774.047 505.439 779.902C505.439 779.902 517.876 778.369 521.098 784.924C521.098 784.924 525.43 788.973 527.667 793.295C529.905 797.618 533.819 795.944 533.819 795.944C533.819 795.944 542.484 793.854 552.409 798.176C552.409 798.176 559.395 797.344 561.49 791.896L558.552 785.341C558.552 785.341 557.85 784.641 561.49 781.718C565.13 778.795 571.415 768.05 571.415 768.05C571.415 768.05 582.174 759.679 586.231 758.562C586.231 758.562 587.208 754.939 586.231 751.449C585.255 747.959 579.804 746.152 579.937 742.804C579.937 742.804 568.477 734.991 567.917 729.41C567.358 723.829 564.144 721.881 562.884 723.271C561.623 724.662 561.765 729.268 561.765 729.268L553.518 729.685C553.518 729.685 550.757 728.391 552.613 726.629C552.613 726.629 553.793 724.689 553.882 721.996C553.971 719.303 560.718 719.976 560.718 719.976C560.718 719.976 565.441 720.233 565.867 715.6C566.293 710.967 565.867 709.621 566.541 709.205C567.216 708.788 568.317 708.443 568.317 709.798C568.317 711.153 568.406 719.4 568.406 719.4L575.747 719.569C575.747 719.569 576.422 719.569 576.591 717.797L579.041 717.629C579.041 717.629 581.828 724.361 586.134 724.361C586.134 724.361 589.596 726.133 590.013 730.252C590.013 730.252 600.559 731.518 603.595 731.43C606.631 731.341 611.612 726.886 611.612 726.886C611.612 726.886 615.242 727.222 615.491 724.024C615.491 724.024 621.226 719.817 622.584 714.59C623.942 709.364 626.126 704.315 627.564 703.642C629.002 702.968 629.171 697.246 629.171 697.246C629.171 697.246 634.151 690.425 639.043 691.692C639.043 691.692 641.493 693.313 643.517 691.532C645.541 689.752 649.589 687.227 654.995 687.475C654.995 687.475 656.549 687.387 660.18 682.621C663.81 677.855 664.228 678.059 667.246 677.749C667.246 677.749 663.491 673.993 664.414 668.971C665.337 663.948 667.068 661.831 665.346 660.901C663.624 659.971 659.114 657.641 663.029 654.585C663.029 654.585 665.071 653.566 666.713 653.646C668.356 653.726 667.415 648.251 665.302 644.965C663.189 641.679 663.73 637.613 663.73 637.613C663.73 637.613 656.123 636.284 655.341 631.279C654.56 626.274 655.031 626.265 655.031 626.265C655.031 626.265 646.872 625.876 642.718 629.782C642.718 629.782 638.013 631.43 632.757 629.197C632.757 629.197 629.073 632.758 624.368 632.758C619.663 632.758 614.488 637.923 614.488 637.923C614.488 637.923 604.998 638.153 602.175 641.838C599.352 645.523 591.194 649.979 588.85 645.904C586.506 641.829 578.109 639.251 576.386 640.899C576.386 640.899 576.937 645.984 569.879 644.965C569.879 644.965 564.153 651.068 559.528 652.397C554.903 653.726 552.16 656.702 543.531 654.744C543.531 654.744 527.064 659.829 519.536 667.89C512.008 675.951 498.212 679.627 493.818 679.317C489.424 679.007 482.837 679.158 482.837 679.158C482.837 679.158 478.292 687.998 477.901 693.003C477.901 693.003 474.448 697.778 476.33 702.472C478.212 707.167 479.783 710.613 480.014 712.721C480.014 712.721 481.186 714.759 482.597 715.148C482.597 715.148 485.305 722.704 489.637 723.971H489.655Z" />
									</mask>
									<path d="M489.655 723.971C489.655 723.971 487.702 728.436 486.024 730.11C484.346 731.784 475.673 744.753 475.673 744.753C475.673 744.753 473.995 748.517 473.995 750.75V758.004L475.114 760.936L475.389 764.143L475.531 766.65L476.365 772.231L486.006 772.93C486.006 772.93 498.869 774.047 505.439 779.902C505.439 779.902 517.876 778.369 521.098 784.924C521.098 784.924 525.43 788.973 527.667 793.295C529.905 797.618 533.819 795.944 533.819 795.944C533.819 795.944 542.484 793.854 552.409 798.176C552.409 798.176 559.395 797.344 561.49 791.896L558.552 785.341C558.552 785.341 557.85 784.641 561.49 781.718C565.13 778.795 571.415 768.05 571.415 768.05C571.415 768.05 582.174 759.679 586.231 758.562C586.231 758.562 587.208 754.939 586.231 751.449C585.255 747.959 579.804 746.152 579.937 742.804C579.937 742.804 568.477 734.991 567.917 729.41C567.358 723.829 564.144 721.881 562.884 723.271C561.623 724.662 561.765 729.268 561.765 729.268L553.518 729.685C553.518 729.685 550.757 728.391 552.613 726.629C552.613 726.629 553.793 724.689 553.882 721.996C553.971 719.303 560.718 719.976 560.718 719.976C560.718 719.976 565.441 720.233 565.867 715.6C566.293 710.967 565.867 709.621 566.541 709.205C567.216 708.788 568.317 708.443 568.317 709.798C568.317 711.153 568.406 719.4 568.406 719.4L575.747 719.569C575.747 719.569 576.422 719.569 576.591 717.797L579.041 717.629C579.041 717.629 581.828 724.361 586.134 724.361C586.134 724.361 589.596 726.133 590.013 730.252C590.013 730.252 600.559 731.518 603.595 731.43C606.631 731.341 611.612 726.886 611.612 726.886C611.612 726.886 615.242 727.222 615.491 724.024C615.491 724.024 621.226 719.817 622.584 714.59C623.942 709.364 626.126 704.315 627.564 703.642C629.002 702.968 629.171 697.246 629.171 697.246C629.171 697.246 634.151 690.425 639.043 691.692C639.043 691.692 641.493 693.313 643.517 691.532C645.541 689.752 649.589 687.227 654.995 687.475C654.995 687.475 656.549 687.387 660.18 682.621C663.81 677.855 664.228 678.059 667.246 677.749C667.246 677.749 663.491 673.993 664.414 668.971C665.337 663.948 667.068 661.831 665.346 660.901C663.624 659.971 659.114 657.641 663.029 654.585C663.029 654.585 665.071 653.566 666.713 653.646C668.356 653.726 667.415 648.251 665.302 644.965C663.189 641.679 663.73 637.613 663.73 637.613C663.73 637.613 656.123 636.284 655.341 631.279C654.56 626.274 655.031 626.265 655.031 626.265C655.031 626.265 646.872 625.876 642.718 629.782C642.718 629.782 638.013 631.43 632.757 629.197C632.757 629.197 629.073 632.758 624.368 632.758C619.663 632.758 614.488 637.923 614.488 637.923C614.488 637.923 604.998 638.153 602.175 641.838C599.352 645.523 591.194 649.979 588.85 645.904C586.506 641.829 578.109 639.251 576.386 640.899C576.386 640.899 576.937 645.984 569.879 644.965C569.879 644.965 564.153 651.068 559.528 652.397C554.903 653.726 552.16 656.702 543.531 654.744C543.531 654.744 527.064 659.829 519.536 667.89C512.008 675.951 498.212 679.627 493.818 679.317C489.424 679.007 482.837 679.158 482.837 679.158C482.837 679.158 478.292 687.998 477.901 693.003C477.901 693.003 474.448 697.778 476.33 702.472C478.212 707.167 479.783 710.613 480.014 712.721C480.014 712.721 481.186 714.759 482.597 715.148C482.597 715.148 485.305 722.704 489.637 723.971H489.655Z" fill="#f1be5b" />
									<path d="M489.655 723.971C489.655 723.971 487.702 728.436 486.024 730.11C484.346 731.784 475.673 744.753 475.673 744.753C475.673 744.753 473.995 748.517 473.995 750.75V758.004L475.114 760.936L475.389 764.143L475.531 766.65L476.365 772.231L486.006 772.93C486.006 772.93 498.869 774.047 505.439 779.902C505.439 779.902 517.876 778.369 521.098 784.924C521.098 784.924 525.43 788.973 527.667 793.295C529.905 797.618 533.819 795.944 533.819 795.944C533.819 795.944 542.484 793.854 552.409 798.176C552.409 798.176 559.395 797.344 561.49 791.896L558.552 785.341C558.552 785.341 557.85 784.641 561.49 781.718C565.13 778.795 571.415 768.05 571.415 768.05C571.415 768.05 582.174 759.679 586.231 758.562C586.231 758.562 587.208 754.939 586.231 751.449C585.255 747.959 579.804 746.152 579.937 742.804C579.937 742.804 568.477 734.991 567.917 729.41C567.358 723.829 564.144 721.881 562.884 723.271C561.623 724.662 561.765 729.268 561.765 729.268L553.518 729.685C553.518 729.685 550.757 728.391 552.613 726.629C552.613 726.629 553.793 724.689 553.882 721.996C553.971 719.303 560.718 719.976 560.718 719.976C560.718 719.976 565.441 720.233 565.867 715.6C566.293 710.967 565.867 709.621 566.541 709.205C567.216 708.788 568.317 708.443 568.317 709.798C568.317 711.153 568.406 719.4 568.406 719.4L575.747 719.569C575.747 719.569 576.422 719.569 576.591 717.797L579.041 717.629C579.041 717.629 581.828 724.361 586.134 724.361C586.134 724.361 589.596 726.133 590.013 730.252C590.013 730.252 600.559 731.518 603.595 731.43C606.631 731.341 611.612 726.886 611.612 726.886C611.612 726.886 615.242 727.222 615.491 724.024C615.491 724.024 621.226 719.817 622.584 714.59C623.942 709.364 626.126 704.315 627.564 703.642C629.002 702.968 629.171 697.246 629.171 697.246C629.171 697.246 634.151 690.425 639.043 691.692C639.043 691.692 641.493 693.313 643.517 691.532C645.541 689.752 649.589 687.227 654.995 687.475C654.995 687.475 656.549 687.387 660.18 682.621C663.81 677.855 664.228 678.059 667.246 677.749C667.246 677.749 663.491 673.993 664.414 668.971C665.337 663.948 667.068 661.831 665.346 660.901C663.624 659.971 659.114 657.641 663.029 654.585C663.029 654.585 665.071 653.566 666.713 653.646C668.356 653.726 667.415 648.251 665.302 644.965C663.189 641.679 663.73 637.613 663.73 637.613C663.73 637.613 656.123 636.284 655.341 631.279C654.56 626.274 655.031 626.265 655.031 626.265C655.031 626.265 646.872 625.876 642.718 629.782C642.718 629.782 638.013 631.43 632.757 629.197C632.757 629.197 629.073 632.758 624.368 632.758C619.663 632.758 614.488 637.923 614.488 637.923C614.488 637.923 604.998 638.153 602.175 641.838C599.352 645.523 591.194 649.979 588.85 645.904C586.506 641.829 578.109 639.251 576.386 640.899C576.386 640.899 576.937 645.984 569.879 644.965C569.879 644.965 564.153 651.068 559.528 652.397C554.903 653.726 552.16 656.702 543.531 654.744C543.531 654.744 527.064 659.829 519.536 667.89C512.008 675.951 498.212 679.627 493.818 679.317C489.424 679.007 482.837 679.158 482.837 679.158C482.837 679.158 478.292 687.998 477.901 693.003C477.901 693.003 474.448 697.778 476.33 702.472C478.212 707.167 479.783 710.613 480.014 712.721C480.014 712.721 481.186 714.759 482.597 715.148C482.597 715.148 485.305 722.704 489.637 723.971H489.655Z" stroke="#FFFEFE" stroke-width="8" mask="url(#path-8-outside-6_0_1)" />
								</g>
								<g stroke='#cec6c6' stroke-width="4" id="Touna">
									<mask id="path-9-outside-7_0_1" maskUnits="userSpaceOnUse" x="479.194" y="557.481" width="198" height="123" fill="black">
										<rect fill="white" x="479.194" y="557.481" width="198" height="123" />
										<path d="M485.343 648.578C485.343 648.578 483.487 648.578 484.494 656.765C485.501 664.951 488.724 672.056 489.564 672.521C489.564 672.521 492.507 674.425 493.032 675.313L494.678 675.721C494.678 675.721 502.56 675.313 506.378 673.185C510.196 671.056 526.038 661.534 528.736 660.638C531.433 659.741 536.617 655.636 542.161 654.468C542.161 654.468 547.187 654.124 549.815 654.26C552.442 654.396 562.793 649.939 562.793 649.939L568.424 645.074C568.424 645.074 573.004 644.593 573.599 644.385C574.195 644.177 574.571 643.697 575.701 640.824C575.701 640.824 578.626 639.04 583.127 642.401C587.629 645.762 588.005 644.865 588.233 646.514C588.461 648.162 593.636 647.402 594.538 646.442C595.44 645.482 596.64 644.865 598.514 644.457C600.388 644.049 603.838 639.936 604.591 639.728C605.345 639.52 605.721 638.632 608.042 639.728C610.363 640.824 614.417 637.88 614.417 637.88C614.417 637.88 618.542 634.455 620.267 634.247C621.992 634.039 628.07 633.358 629.795 630.886C629.795 630.886 630.469 629.79 635.873 631.638C635.873 631.638 639.095 632.39 646.075 628.621C646.075 628.621 648.098 627.661 652.976 628.069V633.895C652.976 633.895 658.081 639.24 663.852 637.6C669.623 635.959 672.557 628.965 672.557 628.965C672.557 628.965 673.38 622.484 670.079 620.019C666.777 617.554 665.131 613.233 665.131 613.233L663.178 608.848L661.899 607.272C661.899 607.272 661.225 609.6 657.924 608.776C654.622 607.952 653.501 606.376 650.874 606.376C650.874 606.376 649.228 606.992 648.702 608.224C648.177 609.456 643.229 611.313 640.602 610.281L634.822 597.941C634.822 597.941 633.018 591.364 633.245 585.53L633.324 584.778C633.324 584.778 621.099 585.874 616.44 584.778C616.44 584.778 612.911 582.585 612.088 581.009C611.265 579.433 606.159 578.336 604.364 578.2L604.513 573.879C604.513 573.879 606.763 571.687 606.684 567.918C606.606 564.149 604.513 561.476 601.509 562.844C598.505 564.213 595.58 565.789 595.58 565.789C595.58 565.789 596.184 570.654 594.153 570.934C592.121 571.214 591.823 571.278 591.456 570.182C591.088 569.086 590.781 567.646 590.781 567.646C590.781 567.646 588.303 566.205 588.382 568.95C588.461 571.695 588.233 572.311 588.233 572.311C588.233 572.311 577.505 575.464 576.375 577.656C575.246 579.849 574.65 588.011 565.499 590.067C565.499 590.067 563.774 591.236 563.695 594.869C563.695 594.869 555.971 596.997 553.265 600.83C550.559 604.663 544.184 612.689 543.886 615.298C543.886 615.298 535.558 618.859 534.656 622.156C533.754 625.452 535.26 627.845 532.554 628.941C532.554 628.941 530.224 639.632 525.425 642.585C520.626 645.538 520.022 655.956 510.118 651.291C510.118 651.291 507.718 648.754 502.087 648.618C502.087 648.618 499.232 647.178 499.013 646.77C498.794 646.362 492.55 649.995 485.317 648.586L485.343 648.578Z" />
									</mask>
									<path d="M485.343 648.578C485.343 648.578 483.487 648.578 484.494 656.765C485.501 664.951 488.724 672.056 489.564 672.521C489.564 672.521 492.507 674.425 493.032 675.313L494.678 675.721C494.678 675.721 502.56 675.313 506.378 673.185C510.196 671.056 526.038 661.534 528.736 660.638C531.433 659.741 536.617 655.636 542.161 654.468C542.161 654.468 547.187 654.124 549.815 654.26C552.442 654.396 562.793 649.939 562.793 649.939L568.424 645.074C568.424 645.074 573.004 644.593 573.599 644.385C574.195 644.177 574.571 643.697 575.701 640.824C575.701 640.824 578.626 639.04 583.127 642.401C587.629 645.762 588.005 644.865 588.233 646.514C588.461 648.162 593.636 647.402 594.538 646.442C595.44 645.482 596.64 644.865 598.514 644.457C600.388 644.049 603.838 639.936 604.591 639.728C605.345 639.52 605.721 638.632 608.042 639.728C610.363 640.824 614.417 637.88 614.417 637.88C614.417 637.88 618.542 634.455 620.267 634.247C621.992 634.039 628.07 633.358 629.795 630.886C629.795 630.886 630.469 629.79 635.873 631.638C635.873 631.638 639.095 632.39 646.075 628.621C646.075 628.621 648.098 627.661 652.976 628.069V633.895C652.976 633.895 658.081 639.24 663.852 637.6C669.623 635.959 672.557 628.965 672.557 628.965C672.557 628.965 673.38 622.484 670.079 620.019C666.777 617.554 665.131 613.233 665.131 613.233L663.178 608.848L661.899 607.272C661.899 607.272 661.225 609.6 657.924 608.776C654.622 607.952 653.501 606.376 650.874 606.376C650.874 606.376 649.228 606.992 648.702 608.224C648.177 609.456 643.229 611.313 640.602 610.281L634.822 597.941C634.822 597.941 633.018 591.364 633.245 585.53L633.324 584.778C633.324 584.778 621.099 585.874 616.44 584.778C616.44 584.778 612.911 582.585 612.088 581.009C611.265 579.433 606.159 578.336 604.364 578.2L604.513 573.879C604.513 573.879 606.763 571.687 606.684 567.918C606.606 564.149 604.513 561.476 601.509 562.844C598.505 564.213 595.58 565.789 595.58 565.789C595.58 565.789 596.184 570.654 594.153 570.934C592.121 571.214 591.823 571.278 591.456 570.182C591.088 569.086 590.781 567.646 590.781 567.646C590.781 567.646 588.303 566.205 588.382 568.95C588.461 571.695 588.233 572.311 588.233 572.311C588.233 572.311 577.505 575.464 576.375 577.656C575.246 579.849 574.65 588.011 565.499 590.067C565.499 590.067 563.774 591.236 563.695 594.869C563.695 594.869 555.971 596.997 553.265 600.83C550.559 604.663 544.184 612.689 543.886 615.298C543.886 615.298 535.558 618.859 534.656 622.156C533.754 625.452 535.26 627.845 532.554 628.941C532.554 628.941 530.224 639.632 525.425 642.585C520.626 645.538 520.022 655.956 510.118 651.291C510.118 651.291 507.718 648.754 502.087 648.618C502.087 648.618 499.232 647.178 499.013 646.77C498.794 646.362 492.55 649.995 485.317 648.586L485.343 648.578Z" fill="#f1be5b" />
									<path d="M485.343 648.578C485.343 648.578 483.487 648.578 484.494 656.765C485.501 664.951 488.724 672.056 489.564 672.521C489.564 672.521 492.507 674.425 493.032 675.313L494.678 675.721C494.678 675.721 502.56 675.313 506.378 673.185C510.196 671.056 526.038 661.534 528.736 660.638C531.433 659.741 536.617 655.636 542.161 654.468C542.161 654.468 547.187 654.124 549.815 654.26C552.442 654.396 562.793 649.939 562.793 649.939L568.424 645.074C568.424 645.074 573.004 644.593 573.599 644.385C574.195 644.177 574.571 643.697 575.701 640.824C575.701 640.824 578.626 639.04 583.127 642.401C587.629 645.762 588.005 644.865 588.233 646.514C588.461 648.162 593.636 647.402 594.538 646.442C595.44 645.482 596.64 644.865 598.514 644.457C600.388 644.049 603.838 639.936 604.591 639.728C605.345 639.52 605.721 638.632 608.042 639.728C610.363 640.824 614.417 637.88 614.417 637.88C614.417 637.88 618.542 634.455 620.267 634.247C621.992 634.039 628.07 633.358 629.795 630.886C629.795 630.886 630.469 629.79 635.873 631.638C635.873 631.638 639.095 632.39 646.075 628.621C646.075 628.621 648.098 627.661 652.976 628.069V633.895C652.976 633.895 658.081 639.24 663.852 637.6C669.623 635.959 672.557 628.965 672.557 628.965C672.557 628.965 673.38 622.484 670.079 620.019C666.777 617.554 665.131 613.233 665.131 613.233L663.178 608.848L661.899 607.272C661.899 607.272 661.225 609.6 657.924 608.776C654.622 607.952 653.501 606.376 650.874 606.376C650.874 606.376 649.228 606.992 648.702 608.224C648.177 609.456 643.229 611.313 640.602 610.281L634.822 597.941C634.822 597.941 633.018 591.364 633.245 585.53L633.324 584.778C633.324 584.778 621.099 585.874 616.44 584.778C616.44 584.778 612.911 582.585 612.088 581.009C611.265 579.433 606.159 578.336 604.364 578.2L604.513 573.879C604.513 573.879 606.763 571.687 606.684 567.918C606.606 564.149 604.513 561.476 601.509 562.844C598.505 564.213 595.58 565.789 595.58 565.789C595.58 565.789 596.184 570.654 594.153 570.934C592.121 571.214 591.823 571.278 591.456 570.182C591.088 569.086 590.781 567.646 590.781 567.646C590.781 567.646 588.303 566.205 588.382 568.95C588.461 571.695 588.233 572.311 588.233 572.311C588.233 572.311 577.505 575.464 576.375 577.656C575.246 579.849 574.65 588.011 565.499 590.067C565.499 590.067 563.774 591.236 563.695 594.869C563.695 594.869 555.971 596.997 553.265 600.83C550.559 604.663 544.184 612.689 543.886 615.298C543.886 615.298 535.558 618.859 534.656 622.156C533.754 625.452 535.26 627.845 532.554 628.941C532.554 628.941 530.224 639.632 525.425 642.585C520.626 645.538 520.022 655.956 510.118 651.291C510.118 651.291 507.718 648.754 502.087 648.618C502.087 648.618 499.232 647.178 499.013 646.77C498.794 646.362 492.55 649.995 485.317 648.586L485.343 648.578Z" stroke="#FEFEFE" stroke-width="8" mask="url(#path-9-outside-7_0_1)" />
								</g>
								<g stroke='#cec6c6' stroke-width="4" id="Poso">
									<mask id="path-10-outside-8_0_1" maskUnits="userSpaceOnUse" x="351.911" y="594.611" width="143" height="185" fill="black">
										<rect fill="white" x="351.911" y="594.611" width="143" height="185" />
										<path d="M359.033 666.824C359.033 666.824 359.368 662.806 362.61 660.798C365.853 658.791 369.762 653.211 370.433 651.089C370.433 651.089 374.457 652.428 378.704 651.647C378.704 651.647 381.385 644.952 385.521 645.398C385.521 645.398 390.439 638.48 386.638 634.685C382.838 630.89 379.375 626.652 373.002 623.749C373.002 623.749 371.662 622.968 376.132 621.63C380.603 620.291 379.486 616.385 379.486 616.385C379.486 616.385 381.497 615.939 385.521 616.831C385.521 616.831 388.428 612.367 389.769 611.921C391.109 611.474 397.703 609.801 399.716 609.355C401.729 608.909 408.658 604.891 408.658 604.891C408.658 604.891 425.98 602.772 429.446 600.985C432.911 599.2 433.135 598.082 435.593 598.865C435.593 598.865 438.388 607.236 435.593 609.69C432.797 612.144 431.034 620.514 436.834 622.411C442.633 624.307 445.987 631.562 445.537 638.034C445.537 638.034 449.338 639.038 450.343 645.51C450.343 645.51 451.684 647.741 455.373 644.729C459.062 641.717 460.626 641.603 460.626 641.603C460.626 641.603 468.897 636.916 476.72 636.916V643.723C476.72 643.723 483.872 644.057 484.654 646.96L482.419 646.848C482.419 646.848 481.637 671.623 492.367 676.756H481.749C481.749 676.756 474.039 692.045 474.15 697.959C474.15 697.959 478.51 706.664 478.51 710.791C478.51 710.791 482.757 714.475 484.656 719.943L488.233 722.62C488.233 722.62 482.645 733.556 475.158 742.15C475.158 742.15 470.911 750.855 474.264 760.004C474.264 760.004 475.046 771.386 476.052 772.501L471.022 773.617L469.235 775.29C469.235 775.29 463.647 776.74 457.835 773.282C452.024 769.822 445.319 765.36 445.319 765.36L442.3 764.022L416.482 732.329L413.464 728.534L410.783 725.185L409.107 722.731L404.86 721.839C404.86 721.839 401.729 732.106 400.724 733.221C400.724 733.221 398.378 743.6 395.471 746.723L385.188 742.37C385.188 742.37 366.637 746.054 358.142 736.568C358.142 736.568 361.272 732.884 358.142 726.301C358.142 726.301 357.025 723.624 359.706 723.624C362.387 723.624 366.188 721.058 363.842 715.925C361.496 710.791 359.036 710.011 359.036 710.011C359.036 710.011 357.137 707.334 362.501 705.881C367.866 704.429 370.435 704.543 370.435 704.543C370.435 704.543 370.435 696.732 366.411 693.941C366.411 693.941 367.975 687.915 364.177 683.786C364.177 683.786 368.201 670.619 363.171 667.94C363.171 667.94 360.49 668.497 359.036 666.824H359.033Z" />
									</mask>
									<path d="M359.033 666.824C359.033 666.824 359.368 662.806 362.61 660.798C365.853 658.791 369.762 653.211 370.433 651.089C370.433 651.089 374.457 652.428 378.704 651.647C378.704 651.647 381.385 644.952 385.521 645.398C385.521 645.398 390.439 638.48 386.638 634.685C382.838 630.89 379.375 626.652 373.002 623.749C373.002 623.749 371.662 622.968 376.132 621.63C380.603 620.291 379.486 616.385 379.486 616.385C379.486 616.385 381.497 615.939 385.521 616.831C385.521 616.831 388.428 612.367 389.769 611.921C391.109 611.474 397.703 609.801 399.716 609.355C401.729 608.909 408.658 604.891 408.658 604.891C408.658 604.891 425.98 602.772 429.446 600.985C432.911 599.2 433.135 598.082 435.593 598.865C435.593 598.865 438.388 607.236 435.593 609.69C432.797 612.144 431.034 620.514 436.834 622.411C442.633 624.307 445.987 631.562 445.537 638.034C445.537 638.034 449.338 639.038 450.343 645.51C450.343 645.51 451.684 647.741 455.373 644.729C459.062 641.717 460.626 641.603 460.626 641.603C460.626 641.603 468.897 636.916 476.72 636.916V643.723C476.72 643.723 483.872 644.057 484.654 646.96L482.419 646.848C482.419 646.848 481.637 671.623 492.367 676.756H481.749C481.749 676.756 474.039 692.045 474.15 697.959C474.15 697.959 478.51 706.664 478.51 710.791C478.51 710.791 482.757 714.475 484.656 719.943L488.233 722.62C488.233 722.62 482.645 733.556 475.158 742.15C475.158 742.15 470.911 750.855 474.264 760.004C474.264 760.004 475.046 771.386 476.052 772.501L471.022 773.617L469.235 775.29C469.235 775.29 463.647 776.74 457.835 773.282C452.024 769.822 445.319 765.36 445.319 765.36L442.3 764.022L416.482 732.329L413.464 728.534L410.783 725.185L409.107 722.731L404.86 721.839C404.86 721.839 401.729 732.106 400.724 733.221C400.724 733.221 398.378 743.6 395.471 746.723L385.188 742.37C385.188 742.37 366.637 746.054 358.142 736.568C358.142 736.568 361.272 732.884 358.142 726.301C358.142 726.301 357.025 723.624 359.706 723.624C362.387 723.624 366.188 721.058 363.842 715.925C361.496 710.791 359.036 710.011 359.036 710.011C359.036 710.011 357.137 707.334 362.501 705.881C367.866 704.429 370.435 704.543 370.435 704.543C370.435 704.543 370.435 696.732 366.411 693.941C366.411 693.941 367.975 687.915 364.177 683.786C364.177 683.786 368.201 670.619 363.171 667.94C363.171 667.94 360.49 668.497 359.036 666.824H359.033Z" fill="#f1be5b" />
									<path d="M359.033 666.824C359.033 666.824 359.368 662.806 362.61 660.798C365.853 658.791 369.762 653.211 370.433 651.089C370.433 651.089 374.457 652.428 378.704 651.647C378.704 651.647 381.385 644.952 385.521 645.398C385.521 645.398 390.439 638.48 386.638 634.685C382.838 630.89 379.375 626.652 373.002 623.749C373.002 623.749 371.662 622.968 376.132 621.63C380.603 620.291 379.486 616.385 379.486 616.385C379.486 616.385 381.497 615.939 385.521 616.831C385.521 616.831 388.428 612.367 389.769 611.921C391.109 611.474 397.703 609.801 399.716 609.355C401.729 608.909 408.658 604.891 408.658 604.891C408.658 604.891 425.98 602.772 429.446 600.985C432.911 599.2 433.135 598.082 435.593 598.865C435.593 598.865 438.388 607.236 435.593 609.69C432.797 612.144 431.034 620.514 436.834 622.411C442.633 624.307 445.987 631.562 445.537 638.034C445.537 638.034 449.338 639.038 450.343 645.51C450.343 645.51 451.684 647.741 455.373 644.729C459.062 641.717 460.626 641.603 460.626 641.603C460.626 641.603 468.897 636.916 476.72 636.916V643.723C476.72 643.723 483.872 644.057 484.654 646.96L482.419 646.848C482.419 646.848 481.637 671.623 492.367 676.756H481.749C481.749 676.756 474.039 692.045 474.15 697.959C474.15 697.959 478.51 706.664 478.51 710.791C478.51 710.791 482.757 714.475 484.656 719.943L488.233 722.62C488.233 722.62 482.645 733.556 475.158 742.15C475.158 742.15 470.911 750.855 474.264 760.004C474.264 760.004 475.046 771.386 476.052 772.501L471.022 773.617L469.235 775.29C469.235 775.29 463.647 776.74 457.835 773.282C452.024 769.822 445.319 765.36 445.319 765.36L442.3 764.022L416.482 732.329L413.464 728.534L410.783 725.185L409.107 722.731L404.86 721.839C404.86 721.839 401.729 732.106 400.724 733.221C400.724 733.221 398.378 743.6 395.471 746.723L385.188 742.37C385.188 742.37 366.637 746.054 358.142 736.568C358.142 736.568 361.272 732.884 358.142 726.301C358.142 726.301 357.025 723.624 359.706 723.624C362.387 723.624 366.188 721.058 363.842 715.925C361.496 710.791 359.036 710.011 359.036 710.011C359.036 710.011 357.137 707.334 362.501 705.881C367.866 704.429 370.435 704.543 370.435 704.543C370.435 704.543 370.435 696.732 366.411 693.941C366.411 693.941 367.975 687.915 364.177 683.786C364.177 683.786 368.201 670.619 363.171 667.94C363.171 667.94 360.49 668.497 359.036 666.824H359.033Z" stroke="white" stroke-width="8" mask="url(#path-10-outside-8_0_1)" />
								</g>
								<g stroke='#cec6c6' stroke-width="4" id="Sigi">
									<mask id="path-11-outside-9_0_1" maskUnits="userSpaceOnUse" x="279.327" y="544.116" width="123" height="208" fill="black">
										<rect fill="white" x="279.327" y="544.116" width="123" height="208" />
										<path d="M320.896 704.309C320.896 704.309 317.775 711.383 320.896 717.206C320.896 717.206 318.814 740.922 323.808 746.33C323.808 746.33 325.265 748.411 327.762 746.33C327.762 746.33 331.717 744.249 336.71 736.76C341.704 729.271 349.819 735.512 349.819 735.512C349.819 735.512 360.016 740.089 358.559 730.31C358.559 730.31 356.972 726.566 358.701 724.902C360.431 723.239 364.384 723.654 365.008 721.573C365.632 719.492 362.926 713.251 357.932 709.924C357.932 709.924 358.143 706.692 360.808 706.514C363.474 706.336 369.781 704.307 369.781 704.307C369.781 704.307 369.515 695.945 366.317 694.17C366.317 694.17 366.672 688.043 365.784 686.799C365.784 686.799 361.787 681.47 365.073 678.361V670.102C365.073 670.102 365.606 667.26 358.765 666.816C358.765 666.816 358.232 662.909 362.318 659.534C366.404 656.158 368.804 654.205 369.781 650.031C369.781 650.031 375.022 650.918 378.131 650.563C378.131 650.563 382.572 643.814 385.77 644.258C385.77 644.258 392.432 636.353 384.26 630.048C376.088 623.742 372.711 621.967 372.711 621.967C372.711 621.967 372.357 620.812 374.4 620.547C376.443 620.281 379.197 616.462 379.641 614.241C379.641 614.241 383.017 613.708 385.415 614.774L389.146 610.067L397.497 607.757V602.785C397.497 602.785 395.808 594.171 386.57 601.364C386.57 601.364 380.352 599.539 380.352 598.497C380.352 597.456 380.885 592.038 376.976 588.22C376.976 588.22 375.198 584.757 373.688 587.422L371.556 587.511C371.556 587.511 371.023 584.492 363.206 584.936C363.206 584.936 363.028 578.808 354.323 579.252V574.19L352.545 572.77C352.545 572.77 352.545 564.776 354.144 563.8C354.144 563.8 348.016 561.135 346.506 558.116C346.506 558.116 345.794 563.711 331.494 565.133L331.404 567.53L325.985 567.974L323.141 565.488C323.141 565.488 318.966 567.798 314.347 567.441L313.814 559.36L307.333 558.116C307.333 558.116 305.912 561.046 302.803 561.757C299.694 562.469 297.829 560.738 297.829 560.738C297.829 560.738 296.763 566.464 284.327 569.749C284.327 569.749 284.86 580.139 291.966 580.494C299.072 580.849 301.561 576.942 303.78 582.536C303.78 582.536 306.177 585.379 306.177 588.664C306.177 588.664 309.641 591.594 308.843 595.681C308.044 599.768 308.753 607.315 304.224 610.067C304.224 610.067 304.578 617.349 300.492 618.948L300.227 626.498C300.227 626.498 297.383 632.271 297.562 633.336C297.74 634.402 304.846 647.103 301.293 645.769C297.74 644.438 292.677 648.967 290.278 656.427C287.88 663.888 288.768 665.398 288.768 665.398C288.768 665.398 298.184 673.567 298.184 675.166C298.184 676.765 298.095 681.028 298.095 681.028C298.095 681.028 302.181 682.094 302.359 684.847C302.537 687.601 311.009 702.814 320.898 704.309H320.896Z" />
									</mask>
									<path d="M320.896 704.309C320.896 704.309 317.775 711.383 320.896 717.206C320.896 717.206 318.814 740.922 323.808 746.33C323.808 746.33 325.265 748.411 327.762 746.33C327.762 746.33 331.717 744.249 336.71 736.76C341.704 729.271 349.819 735.512 349.819 735.512C349.819 735.512 360.016 740.089 358.559 730.31C358.559 730.31 356.972 726.566 358.701 724.902C360.431 723.239 364.384 723.654 365.008 721.573C365.632 719.492 362.926 713.251 357.932 709.924C357.932 709.924 358.143 706.692 360.808 706.514C363.474 706.336 369.781 704.307 369.781 704.307C369.781 704.307 369.515 695.945 366.317 694.17C366.317 694.17 366.672 688.043 365.784 686.799C365.784 686.799 361.787 681.47 365.073 678.361V670.102C365.073 670.102 365.606 667.26 358.765 666.816C358.765 666.816 358.232 662.909 362.318 659.534C366.404 656.158 368.804 654.205 369.781 650.031C369.781 650.031 375.022 650.918 378.131 650.563C378.131 650.563 382.572 643.814 385.77 644.258C385.77 644.258 392.432 636.353 384.26 630.048C376.088 623.742 372.711 621.967 372.711 621.967C372.711 621.967 372.357 620.812 374.4 620.547C376.443 620.281 379.197 616.462 379.641 614.241C379.641 614.241 383.017 613.708 385.415 614.774L389.146 610.067L397.497 607.757V602.785C397.497 602.785 395.808 594.171 386.57 601.364C386.57 601.364 380.352 599.539 380.352 598.497C380.352 597.456 380.885 592.038 376.976 588.22C376.976 588.22 375.198 584.757 373.688 587.422L371.556 587.511C371.556 587.511 371.023 584.492 363.206 584.936C363.206 584.936 363.028 578.808 354.323 579.252V574.19L352.545 572.77C352.545 572.77 352.545 564.776 354.144 563.8C354.144 563.8 348.016 561.135 346.506 558.116C346.506 558.116 345.794 563.711 331.494 565.133L331.404 567.53L325.985 567.974L323.141 565.488C323.141 565.488 318.966 567.798 314.347 567.441L313.814 559.36L307.333 558.116C307.333 558.116 305.912 561.046 302.803 561.757C299.694 562.469 297.829 560.738 297.829 560.738C297.829 560.738 296.763 566.464 284.327 569.749C284.327 569.749 284.86 580.139 291.966 580.494C299.072 580.849 301.561 576.942 303.78 582.536C303.78 582.536 306.177 585.379 306.177 588.664C306.177 588.664 309.641 591.594 308.843 595.681C308.044 599.768 308.753 607.315 304.224 610.067C304.224 610.067 304.578 617.349 300.492 618.948L300.227 626.498C300.227 626.498 297.383 632.271 297.562 633.336C297.74 634.402 304.846 647.103 301.293 645.769C297.74 644.438 292.677 648.967 290.278 656.427C287.88 663.888 288.768 665.398 288.768 665.398C288.768 665.398 298.184 673.567 298.184 675.166C298.184 676.765 298.095 681.028 298.095 681.028C298.095 681.028 302.181 682.094 302.359 684.847C302.537 687.601 311.009 702.814 320.898 704.309H320.896Z" fill="#f1be5b" />
									<path d="M320.896 704.309C320.896 704.309 317.775 711.383 320.896 717.206C320.896 717.206 318.814 740.922 323.808 746.33C323.808 746.33 325.265 748.411 327.762 746.33C327.762 746.33 331.717 744.249 336.71 736.76C341.704 729.271 349.819 735.512 349.819 735.512C349.819 735.512 360.016 740.089 358.559 730.31C358.559 730.31 356.972 726.566 358.701 724.902C360.431 723.239 364.384 723.654 365.008 721.573C365.632 719.492 362.926 713.251 357.932 709.924C357.932 709.924 358.143 706.692 360.808 706.514C363.474 706.336 369.781 704.307 369.781 704.307C369.781 704.307 369.515 695.945 366.317 694.17C366.317 694.17 366.672 688.043 365.784 686.799C365.784 686.799 361.787 681.47 365.073 678.361V670.102C365.073 670.102 365.606 667.26 358.765 666.816C358.765 666.816 358.232 662.909 362.318 659.534C366.404 656.158 368.804 654.205 369.781 650.031C369.781 650.031 375.022 650.918 378.131 650.563C378.131 650.563 382.572 643.814 385.77 644.258C385.77 644.258 392.432 636.353 384.26 630.048C376.088 623.742 372.711 621.967 372.711 621.967C372.711 621.967 372.357 620.812 374.4 620.547C376.443 620.281 379.197 616.462 379.641 614.241C379.641 614.241 383.017 613.708 385.415 614.774L389.146 610.067L397.497 607.757V602.785C397.497 602.785 395.808 594.171 386.57 601.364C386.57 601.364 380.352 599.539 380.352 598.497C380.352 597.456 380.885 592.038 376.976 588.22C376.976 588.22 375.198 584.757 373.688 587.422L371.556 587.511C371.556 587.511 371.023 584.492 363.206 584.936C363.206 584.936 363.028 578.808 354.323 579.252V574.19L352.545 572.77C352.545 572.77 352.545 564.776 354.144 563.8C354.144 563.8 348.016 561.135 346.506 558.116C346.506 558.116 345.794 563.711 331.494 565.133L331.404 567.53L325.985 567.974L323.141 565.488C323.141 565.488 318.966 567.798 314.347 567.441L313.814 559.36L307.333 558.116C307.333 558.116 305.912 561.046 302.803 561.757C299.694 562.469 297.829 560.738 297.829 560.738C297.829 560.738 296.763 566.464 284.327 569.749C284.327 569.749 284.86 580.139 291.966 580.494C299.072 580.849 301.561 576.942 303.78 582.536C303.78 582.536 306.177 585.379 306.177 588.664C306.177 588.664 309.641 591.594 308.843 595.681C308.044 599.768 308.753 607.315 304.224 610.067C304.224 610.067 304.578 617.349 300.492 618.948L300.227 626.498C300.227 626.498 297.383 632.271 297.562 633.336C297.74 634.402 304.846 647.103 301.293 645.769C297.74 644.438 292.677 648.967 290.278 656.427C287.88 663.888 288.768 665.398 288.768 665.398C288.768 665.398 298.184 673.567 298.184 675.166C298.184 676.765 298.095 681.028 298.095 681.028C298.095 681.028 302.181 682.094 302.359 684.847C302.537 687.601 311.009 702.814 320.898 704.309H320.896Z" stroke="#FBFBFB" stroke-width="8" mask="url(#path-11-outside-9_0_1)" />
								</g>
								<g stroke='#cec6c6' stroke-width="4" id="Donggala">
									<mask id="path-12-outside-10_0_1" maskUnits="userSpaceOnUse" x="270.855" y="303.387" width="111" height="251" fill="black">
										<rect fill="white" x="270.855" y="303.387" width="111" height="251" />
										<path d="M311.552 526.387V529.228L315.111 534.434L317.963 541.379C317.963 541.379 330.613 550.063 336.134 550.063C341.655 550.063 345.224 547.536 349.32 551.327L346.468 543.118L346.286 537.911L348.248 534.282V532.391L348.066 528.914L343.252 523.385L342.899 520.858C342.899 520.858 343.97 520.069 339.511 515.49C335.052 510.91 331.492 504.754 331.492 504.754L331.674 496.232C331.674 496.232 326.507 493.077 328.823 486.759C328.823 486.759 328.287 481.23 327.397 479.026C327.397 479.026 332.028 476.812 328.823 470.817L326.153 466.551L327.933 464.813L327.397 460.708C327.397 460.708 332.564 456.29 328.823 451.388L325.435 446.182L332.21 438.126C332.21 438.126 334.708 435.598 332.21 425.812C332.21 425.812 331.856 422.81 333.818 419.495C335.78 416.179 335.78 413.177 335.78 410.65C335.78 410.65 339.875 410.175 342.019 405.909C344.163 401.643 347.894 403.696 347.894 403.696L351.099 400.693V396.275C351.099 396.275 359.826 393.121 359.826 391.221C359.826 389.321 359.472 384.115 356.974 381.113L352.697 378.424L352.879 371.954C352.879 371.954 357.864 370.216 357.692 363.27C357.692 363.27 360.726 360.743 363.395 361.38C363.395 361.38 367.137 359.166 363.395 356.173C363.395 356.173 364.467 351.594 368.027 350.491C371.586 349.389 371.95 347.489 371.95 345.751C371.95 344.012 372.84 339.594 372.84 339.594L377.825 332.335V313.068C377.825 313.068 370.16 310.38 369.452 307.387H360.898L355.913 312.127C355.913 312.127 352.525 311.5 349.502 320.022C349.502 320.022 347.54 320.811 353.061 332.183L354.305 344.021L343.081 349.55L327.761 349.712L323.312 356.818C323.312 356.818 327.589 359.82 323.666 364.552C319.742 369.284 314.575 371.811 325.445 379.867C325.445 379.867 330.966 385.235 327.225 389.501C323.484 393.766 318.852 391.239 318.852 391.239C318.852 391.239 315.111 391.078 311.552 388.551L304.605 391.078C304.605 391.078 304.069 395.182 309.954 397.871C315.839 400.559 325.991 409.243 323.494 418.392L324.03 428.501C324.03 428.501 320.47 438.762 314.413 443.502C314.413 443.502 308.326 441.289 304.605 442.078L303.189 437.498L297.486 434.657C297.486 434.657 299.802 427.712 292.137 425.185L286.434 423.447C286.434 423.447 284.654 426.449 285.19 428.026L274.855 425.974C274.855 425.974 274.855 432.444 283.41 439.075C291.965 445.707 292.784 450.026 305.505 444.757C305.505 444.757 311.916 444.596 310.854 449.023C309.792 453.45 312.634 454.704 312.634 454.704C312.634 454.704 307.82 461.174 309.6 464.176C309.6 464.176 304.251 469.544 304.251 476.964C304.251 476.964 301.045 481.857 301.399 483.121C301.753 484.385 303.897 487.7 301.935 492.593C301.935 492.593 301.227 500.963 308.174 517.694C308.174 517.694 307.284 521.637 311.562 526.378L311.552 526.387Z" />
									</mask>
									<path d="M311.552 526.387V529.228L315.111 534.434L317.963 541.379C317.963 541.379 330.613 550.063 336.134 550.063C341.655 550.063 345.224 547.536 349.32 551.327L346.468 543.118L346.286 537.911L348.248 534.282V532.391L348.066 528.914L343.252 523.385L342.899 520.858C342.899 520.858 343.97 520.069 339.511 515.49C335.052 510.91 331.492 504.754 331.492 504.754L331.674 496.232C331.674 496.232 326.507 493.077 328.823 486.759C328.823 486.759 328.287 481.23 327.397 479.026C327.397 479.026 332.028 476.812 328.823 470.817L326.153 466.551L327.933 464.813L327.397 460.708C327.397 460.708 332.564 456.29 328.823 451.388L325.435 446.182L332.21 438.126C332.21 438.126 334.708 435.598 332.21 425.812C332.21 425.812 331.856 422.81 333.818 419.495C335.78 416.179 335.78 413.177 335.78 410.65C335.78 410.65 339.875 410.175 342.019 405.909C344.163 401.643 347.894 403.696 347.894 403.696L351.099 400.693V396.275C351.099 396.275 359.826 393.121 359.826 391.221C359.826 389.321 359.472 384.115 356.974 381.113L352.697 378.424L352.879 371.954C352.879 371.954 357.864 370.216 357.692 363.27C357.692 363.27 360.726 360.743 363.395 361.38C363.395 361.38 367.137 359.166 363.395 356.173C363.395 356.173 364.467 351.594 368.027 350.491C371.586 349.389 371.95 347.489 371.95 345.751C371.95 344.012 372.84 339.594 372.84 339.594L377.825 332.335V313.068C377.825 313.068 370.16 310.38 369.452 307.387H360.898L355.913 312.127C355.913 312.127 352.525 311.5 349.502 320.022C349.502 320.022 347.54 320.811 353.061 332.183L354.305 344.021L343.081 349.55L327.761 349.712L323.312 356.818C323.312 356.818 327.589 359.82 323.666 364.552C319.742 369.284 314.575 371.811 325.445 379.867C325.445 379.867 330.966 385.235 327.225 389.501C323.484 393.766 318.852 391.239 318.852 391.239C318.852 391.239 315.111 391.078 311.552 388.551L304.605 391.078C304.605 391.078 304.069 395.182 309.954 397.871C315.839 400.559 325.991 409.243 323.494 418.392L324.03 428.501C324.03 428.501 320.47 438.762 314.413 443.502C314.413 443.502 308.326 441.289 304.605 442.078L303.189 437.498L297.486 434.657C297.486 434.657 299.802 427.712 292.137 425.185L286.434 423.447C286.434 423.447 284.654 426.449 285.19 428.026L274.855 425.974C274.855 425.974 274.855 432.444 283.41 439.075C291.965 445.707 292.784 450.026 305.505 444.757C305.505 444.757 311.916 444.596 310.854 449.023C309.792 453.45 312.634 454.704 312.634 454.704C312.634 454.704 307.82 461.174 309.6 464.176C309.6 464.176 304.251 469.544 304.251 476.964C304.251 476.964 301.045 481.857 301.399 483.121C301.753 484.385 303.897 487.7 301.935 492.593C301.935 492.593 301.227 500.963 308.174 517.694C308.174 517.694 307.284 521.637 311.562 526.378L311.552 526.387Z" fill="#f1be5b" />
									<path d="M311.552 526.387V529.228L315.111 534.434L317.963 541.379C317.963 541.379 330.613 550.063 336.134 550.063C341.655 550.063 345.224 547.536 349.32 551.327L346.468 543.118L346.286 537.911L348.248 534.282V532.391L348.066 528.914L343.252 523.385L342.899 520.858C342.899 520.858 343.97 520.069 339.511 515.49C335.052 510.91 331.492 504.754 331.492 504.754L331.674 496.232C331.674 496.232 326.507 493.077 328.823 486.759C328.823 486.759 328.287 481.23 327.397 479.026C327.397 479.026 332.028 476.812 328.823 470.817L326.153 466.551L327.933 464.813L327.397 460.708C327.397 460.708 332.564 456.29 328.823 451.388L325.435 446.182L332.21 438.126C332.21 438.126 334.708 435.598 332.21 425.812C332.21 425.812 331.856 422.81 333.818 419.495C335.78 416.179 335.78 413.177 335.78 410.65C335.78 410.65 339.875 410.175 342.019 405.909C344.163 401.643 347.894 403.696 347.894 403.696L351.099 400.693V396.275C351.099 396.275 359.826 393.121 359.826 391.221C359.826 389.321 359.472 384.115 356.974 381.113L352.697 378.424L352.879 371.954C352.879 371.954 357.864 370.216 357.692 363.27C357.692 363.27 360.726 360.743 363.395 361.38C363.395 361.38 367.137 359.166 363.395 356.173C363.395 356.173 364.467 351.594 368.027 350.491C371.586 349.389 371.95 347.489 371.95 345.751C371.95 344.012 372.84 339.594 372.84 339.594L377.825 332.335V313.068C377.825 313.068 370.16 310.38 369.452 307.387H360.898L355.913 312.127C355.913 312.127 352.525 311.5 349.502 320.022C349.502 320.022 347.54 320.811 353.061 332.183L354.305 344.021L343.081 349.55L327.761 349.712L323.312 356.818C323.312 356.818 327.589 359.82 323.666 364.552C319.742 369.284 314.575 371.811 325.445 379.867C325.445 379.867 330.966 385.235 327.225 389.501C323.484 393.766 318.852 391.239 318.852 391.239C318.852 391.239 315.111 391.078 311.552 388.551L304.605 391.078C304.605 391.078 304.069 395.182 309.954 397.871C315.839 400.559 325.991 409.243 323.494 418.392L324.03 428.501C324.03 428.501 320.47 438.762 314.413 443.502C314.413 443.502 308.326 441.289 304.605 442.078L303.189 437.498L297.486 434.657C297.486 434.657 299.802 427.712 292.137 425.185L286.434 423.447C286.434 423.447 284.654 426.449 285.19 428.026L274.855 425.974C274.855 425.974 274.855 432.444 283.41 439.075C291.965 445.707 292.784 450.026 305.505 444.757C305.505 444.757 311.916 444.596 310.854 449.023C309.792 453.45 312.634 454.704 312.634 454.704C312.634 454.704 307.82 461.174 309.6 464.176C309.6 464.176 304.251 469.544 304.251 476.964C304.251 476.964 301.045 481.857 301.399 483.121C301.753 484.385 303.897 487.7 301.935 492.593C301.935 492.593 301.227 500.963 308.174 517.694C308.174 517.694 307.284 521.637 311.562 526.378L311.552 526.387Z" stroke="white" stroke-width="8" mask="url(#path-12-outside-10_0_1)" />
								</g>
								<g stroke='#cec6c6' stroke-width="4" id="Palu">
									<mask id="path-13-outside-11_0_1" maskUnits="userSpaceOnUse" x="292.689" y="508.975" width="68.5534" height="73.2759" fill="black">
										<rect fill="white" x="292.689" y="508.975" width="68.5534" height="73.2759" />
										<path d="M299.269 553.915L309.02 549.967C309.02 549.967 310.546 558.784 313.601 558.942C316.656 559.101 319.036 558.338 319.217 554.859L319.926 541.25L316.621 535.545L312.786 529.642L311.859 526.742L312.656 521.784L319.735 517.163L328.281 515.641L333.002 518.386C333.002 518.386 334.806 521.866 323.796 525.759C323.796 525.759 321.886 531.364 329.739 529.284C337.591 527.203 338.63 527.961 338.63 527.961L339.676 532.118C339.676 532.118 320.723 536.303 324.689 539.895C328.655 543.487 329.25 549.233 334.273 549.494C334.273 549.494 339.331 552.609 344.073 551.435C348.815 550.261 351.268 551.627 351.465 554.671C351.663 557.715 353.659 561.022 353.659 561.022L352.004 565.038C352.004 565.038 347.521 571.589 331.646 572.185L330.905 576.066L325.516 575.787L321.87 573.098L312.63 574.049L310.706 562.53C310.706 562.53 305.741 557.637 301.298 559.906C296.854 562.175 297.253 554.73 299.269 553.915Z" />
									</mask>
									<path d="M299.269 553.915L309.02 549.967C309.02 549.967 310.546 558.784 313.601 558.942C316.656 559.101 319.036 558.338 319.217 554.859L319.926 541.25L316.621 535.545L312.786 529.642L311.859 526.742L312.656 521.784L319.735 517.163L328.281 515.641L333.002 518.386C333.002 518.386 334.806 521.866 323.796 525.759C323.796 525.759 321.886 531.364 329.739 529.284C337.591 527.203 338.63 527.961 338.63 527.961L339.676 532.118C339.676 532.118 320.723 536.303 324.689 539.895C328.655 543.487 329.25 549.233 334.273 549.494C334.273 549.494 339.331 552.609 344.073 551.435C348.815 550.261 351.268 551.627 351.465 554.671C351.663 557.715 353.659 561.022 353.659 561.022L352.004 565.038C352.004 565.038 347.521 571.589 331.646 572.185L330.905 576.066L325.516 575.787L321.87 573.098L312.63 574.049L310.706 562.53C310.706 562.53 305.741 557.637 301.298 559.906C296.854 562.175 297.253 554.73 299.269 553.915Z" fill="#bf7070" />
									<path d="M299.269 553.915L309.02 549.967C309.02 549.967 310.546 558.784 313.601 558.942C316.656 559.101 319.036 558.338 319.217 554.859L319.926 541.25L316.621 535.545L312.786 529.642L311.859 526.742L312.656 521.784L319.735 517.163L328.281 515.641L333.002 518.386C333.002 518.386 334.806 521.866 323.796 525.759C323.796 525.759 321.886 531.364 329.739 529.284C337.591 527.203 338.63 527.961 338.63 527.961L339.676 532.118C339.676 532.118 320.723 536.303 324.689 539.895C328.655 543.487 329.25 549.233 334.273 549.494C334.273 549.494 339.331 552.609 344.073 551.435C348.815 550.261 351.268 551.627 351.465 554.671C351.663 557.715 353.659 561.022 353.659 561.022L352.004 565.038C352.004 565.038 347.521 571.589 331.646 572.185L330.905 576.066L325.516 575.787L321.87 573.098L312.63 574.049L310.706 562.53C310.706 562.53 305.741 557.637 301.298 559.906C296.854 562.175 297.253 554.73 299.269 553.915Z" stroke="white" stroke-width="8" mask="url(#path-13-outside-11_0_1)" />
								</g>
								<g stroke='#cec6c6' stroke-width="4" id="Banggai-Laut">
									<g id="Vector">
										<mask id="path-14-outside-12_0_1" maskUnits="userSpaceOnUse" x="787.889" y="740.306" width="29" height="41" fill="black">
											<rect fill="white" x="787.889" y="740.306" width="29" height="41" />
											<path d="M791.903 771.674L794.18 767.127V757.692C794.18 757.692 797.507 747.209 798.38 746.502C799.253 745.795 802.403 743.875 808.183 747.197V750.872C808.183 750.872 812.241 754.029 812.241 755.537C812.241 757.044 811.486 763.358 809.304 764.029C807.121 764.701 801.246 768.164 800.267 772.675C799.288 777.186 793.118 777.858 792.434 775.231C791.75 772.604 791.903 771.674 791.903 771.674Z" />
										</mask>
										<path d="M791.903 771.674L794.18 767.127V757.692C794.18 757.692 797.507 747.209 798.38 746.502C799.253 745.795 802.403 743.875 808.183 747.197V750.872C808.183 750.872 812.241 754.029 812.241 755.537C812.241 757.044 811.486 763.358 809.304 764.029C807.121 764.701 801.246 768.164 800.267 772.675C799.288 777.186 793.118 777.858 792.434 775.231C791.75 772.604 791.903 771.674 791.903 771.674Z" fill="#f1be5b" />
										<path d="M791.903 771.674L794.18 767.127V757.692C794.18 757.692 797.507 747.209 798.38 746.502C799.253 745.795 802.403 743.875 808.183 747.197V750.872C808.183 750.872 812.241 754.029 812.241 755.537C812.241 757.044 811.486 763.358 809.304 764.029C807.121 764.701 801.246 768.164 800.267 772.675C799.288 777.186 793.118 777.858 792.434 775.231C791.75 772.604 791.903 771.674 791.903 771.674Z" stroke="white" stroke-width="8" mask="url(#path-14-outside-12_0_1)" />
									</g>
									<g id="Vector_2">
										<mask id="path-15-outside-13_0_1" maskUnits="userSpaceOnUse" x="831.518" y="715.855" width="32" height="33" fill="black">
											<rect fill="white" x="831.518" y="715.855" width="32" height="33" />
											<path d="M836.637 743.169C836.637 743.169 839.705 731.756 845.981 727.091C852.256 722.427 857.022 719.918 857.022 719.918C857.022 719.918 858.108 719.458 857.943 721.025C857.777 722.592 858.851 729.011 858.851 729.011L853.578 733.122C853.578 733.122 851.678 734.936 851.183 733.204C850.687 731.473 848.293 733.369 848.293 733.369L847.738 736.338C847.738 736.338 845.981 741.685 844.506 742.262C843.031 742.84 835.481 746.656 836.637 743.169Z" />
										</mask>
										<path d="M836.637 743.169C836.637 743.169 839.705 731.756 845.981 727.091C852.256 722.427 857.022 719.918 857.022 719.918C857.022 719.918 858.108 719.458 857.943 721.025C857.777 722.592 858.851 729.011 858.851 729.011L853.578 733.122C853.578 733.122 851.678 734.936 851.183 733.204C850.687 731.473 848.293 733.369 848.293 733.369L847.738 736.338C847.738 736.338 845.981 741.685 844.506 742.262C843.031 742.84 835.481 746.656 836.637 743.169Z" fill="#f1be5b" />
										<path d="M836.637 743.169C836.637 743.169 839.705 731.756 845.981 727.091C852.256 722.427 857.022 719.918 857.022 719.918C857.022 719.918 858.108 719.458 857.943 721.025C857.777 722.592 858.851 729.011 858.851 729.011L853.578 733.122C853.578 733.122 851.678 734.936 851.183 733.204C850.687 731.473 848.293 733.369 848.293 733.369L847.738 736.338C847.738 736.338 845.981 741.685 844.506 742.262C843.031 742.84 835.481 746.656 836.637 743.169Z" stroke="white" stroke-width="8" mask="url(#path-15-outside-13_0_1)" />
									</g>
									<g id="Vector_3">
										<mask id="path-16-outside-14_0_1" maskUnits="userSpaceOnUse" x="878.492" y="674.116" width="38" height="71" fill="black">
											<rect fill="white" x="878.492" y="674.116" width="38" height="71" />
											<path d="M889.205 688.29C889.205 688.29 888.343 692.225 886.798 693.473C885.253 694.722 883.247 697.784 883.247 698.656C883.247 699.527 882.764 702.013 883.247 702.59C883.731 703.167 886.999 706.23 886.999 706.23C886.999 706.23 884.498 709.587 884.215 711.024C883.931 712.461 883.931 717.066 883.931 717.066C883.931 717.066 882.492 718.032 882.492 719.846C882.492 721.66 883.165 728.386 884.509 729.529C885.854 730.671 888.155 734.417 891.045 734.805C893.935 735.194 898.052 733.557 899.598 733.651V739.022C899.598 739.022 900.848 741.991 902.677 739.505V736.537C902.677 736.537 908.056 730.683 910.746 729.823L911.512 721.766C911.512 721.766 910.84 714.958 908.54 711.024C906.239 707.09 907.678 699.798 907.678 699.798L905.756 691.164C905.756 691.164 906.522 682.154 904.021 682.047C901.52 681.941 899.126 676.676 898.642 680.516C898.158 684.356 897.687 689.244 897.687 689.244C897.687 689.244 893.935 690.199 893.369 687.996C892.803 685.793 889.24 688.279 889.24 688.279L889.205 688.29Z" />
										</mask>
										<path d="M889.205 688.29C889.205 688.29 888.343 692.225 886.798 693.473C885.253 694.722 883.247 697.784 883.247 698.656C883.247 699.527 882.764 702.013 883.247 702.59C883.731 703.167 886.999 706.23 886.999 706.23C886.999 706.23 884.498 709.587 884.215 711.024C883.931 712.461 883.931 717.066 883.931 717.066C883.931 717.066 882.492 718.032 882.492 719.846C882.492 721.66 883.165 728.386 884.509 729.529C885.854 730.671 888.155 734.417 891.045 734.805C893.935 735.194 898.052 733.557 899.598 733.651V739.022C899.598 739.022 900.848 741.991 902.677 739.505V736.537C902.677 736.537 908.056 730.683 910.746 729.823L911.512 721.766C911.512 721.766 910.84 714.958 908.54 711.024C906.239 707.09 907.678 699.798 907.678 699.798L905.756 691.164C905.756 691.164 906.522 682.154 904.021 682.047C901.52 681.941 899.126 676.676 898.642 680.516C898.158 684.356 897.687 689.244 897.687 689.244C897.687 689.244 893.935 690.199 893.369 687.996C892.803 685.793 889.24 688.279 889.24 688.279L889.205 688.29Z" fill="#f1be5b" />
										<path d="M889.205 688.29C889.205 688.29 888.343 692.225 886.798 693.473C885.253 694.722 883.247 697.784 883.247 698.656C883.247 699.527 882.764 702.013 883.247 702.59C883.731 703.167 886.999 706.23 886.999 706.23C886.999 706.23 884.498 709.587 884.215 711.024C883.931 712.461 883.931 717.066 883.931 717.066C883.931 717.066 882.492 718.032 882.492 719.846C882.492 721.66 883.165 728.386 884.509 729.529C885.854 730.671 888.155 734.417 891.045 734.805C893.935 735.194 898.052 733.557 899.598 733.651V739.022C899.598 739.022 900.848 741.991 902.677 739.505V736.537C902.677 736.537 908.056 730.683 910.746 729.823L911.512 721.766C911.512 721.766 910.84 714.958 908.54 711.024C906.239 707.09 907.678 699.798 907.678 699.798L905.756 691.164C905.756 691.164 906.522 682.154 904.021 682.047C901.52 681.941 899.126 676.676 898.642 680.516C898.158 684.356 897.687 689.244 897.687 689.244C897.687 689.244 893.935 690.199 893.369 687.996C892.803 685.793 889.24 688.279 889.24 688.279L889.205 688.29Z" stroke="white" stroke-width="8" mask="url(#path-16-outside-14_0_1)" />
									</g>
									<g id="Vector_4">
										<mask id="path-17-outside-15_0_1" maskUnits="userSpaceOnUse" x="921.766" y="763.009" width="12" height="20" fill="black">
											<rect fill="white" x="921.766" y="763.009" width="12" height="20" />
											<path d="M926.023 768.575C926.023 768.575 925.444 772.05 926.023 775.066C926.023 775.066 925.704 778.211 927.179 778.67C928.653 779.129 930.14 778.482 928.783 774.3C928.783 774.3 928.724 771.862 928.464 770.696C928.205 769.53 926.86 766.844 926.023 768.575Z" />
										</mask>
										<path d="M926.023 768.575C926.023 768.575 925.444 772.05 926.023 775.066C926.023 775.066 925.704 778.211 927.179 778.67C928.653 779.129 930.14 778.482 928.783 774.3C928.783 774.3 928.724 771.862 928.464 770.696C928.205 769.53 926.86 766.844 926.023 768.575Z" fill="#f1be5b" />
										<path d="M926.023 768.575C926.023 768.575 925.444 772.05 926.023 775.066C926.023 775.066 925.704 778.211 927.179 778.67C928.653 779.129 930.14 778.482 928.783 774.3C928.783 774.3 928.724 771.862 928.464 770.696C928.205 769.53 926.86 766.844 926.023 768.575Z" stroke="white" stroke-width="8" mask="url(#path-17-outside-15_0_1)" />
									</g>
									<g id="Vector_5">
										<mask id="path-18-outside-16_0_1" maskUnits="userSpaceOnUse" x="933.937" y="763.933" width="15" height="19" fill="black">
											<rect fill="white" x="933.937" y="763.933" width="15" height="19" />
											<path d="M937.937 778.353V773.665C937.937 773.665 938.585 769.837 942.702 768.023C942.702 768.023 943.599 767.304 944.059 769.943C944.519 772.581 944.767 773.418 944.578 776.374C944.389 779.331 937.948 778.365 937.948 778.365L937.937 778.353Z" />
										</mask>
										<path d="M937.937 778.353V773.665C937.937 773.665 938.585 769.837 942.702 768.023C942.702 768.023 943.599 767.304 944.059 769.943C944.519 772.581 944.767 773.418 944.578 776.374C944.389 779.331 937.948 778.365 937.948 778.365L937.937 778.353Z" fill="#f1be5b" />
										<path d="M937.937 778.353V773.665C937.937 773.665 938.585 769.837 942.702 768.023C942.702 768.023 943.599 767.304 944.059 769.943C944.519 772.581 944.767 773.418 944.578 776.374C944.389 779.331 937.948 778.365 937.948 778.365L937.937 778.353Z" stroke="white" stroke-width="8" mask="url(#path-18-outside-16_0_1)" />
									</g>
									<g id="Vector_6">
										<mask id="path-19-outside-17_0_1" maskUnits="userSpaceOnUse" x="949.131" y="760.842" width="27" height="35" fill="black">
											<rect fill="white" x="949.131" y="760.842" width="27" height="35" />
											<path d="M953.131 767.928V774.43C953.131 774.43 955.195 779.247 955.514 783.429C955.832 787.61 962.922 793.523 967.877 790.367C972.832 787.21 971.357 783.229 971.357 783.229L958.994 764.842H954.299C954.299 764.842 953.143 765.266 953.143 767.916L953.131 767.928Z" />
										</mask>
										<path d="M953.131 767.928V774.43C953.131 774.43 955.195 779.247 955.514 783.429C955.832 787.61 962.922 793.523 967.877 790.367C972.832 787.21 971.357 783.229 971.357 783.229L958.994 764.842H954.299C954.299 764.842 953.143 765.266 953.143 767.916L953.131 767.928Z" fill="#f1be5b" />
										<path d="M953.131 767.928V774.43C953.131 774.43 955.195 779.247 955.514 783.429C955.832 787.61 962.922 793.523 967.877 790.367C972.832 787.21 971.357 783.229 971.357 783.229L958.994 764.842H954.299C954.299 764.842 953.143 765.266 953.143 767.916L953.131 767.928Z" stroke="white" stroke-width="8" mask="url(#path-19-outside-17_0_1)" />
									</g>
									<g id="Vector_7">
										<mask id="path-20-outside-18_0_1" maskUnits="userSpaceOnUse" x="945.958" y="786.179" width="13" height="15" fill="black">
											<rect fill="white" x="945.958" y="786.179" width="13" height="15" />
											<path d="M950.1 792.24C950.1 792.24 950.489 790.179 951.515 790.179C952.542 790.179 954.346 790.827 954.476 792.24C954.606 793.654 954.476 796.221 954.476 796.221H950.1C950.1 796.221 949.781 793.265 950.1 792.24Z" />
										</mask>
										<path d="M950.1 792.24C950.1 792.24 950.489 790.179 951.515 790.179C952.542 790.179 954.346 790.827 954.476 792.24C954.606 793.654 954.476 796.221 954.476 796.221H950.1C950.1 796.221 949.781 793.265 950.1 792.24Z" fill="#f1be5b" />
										<path d="M950.1 792.24C950.1 792.24 950.489 790.179 951.515 790.179C952.542 790.179 954.346 790.827 954.476 792.24C954.606 793.654 954.476 796.221 954.476 796.221H950.1C950.1 796.221 949.781 793.265 950.1 792.24Z" stroke="white" stroke-width="8" mask="url(#path-20-outside-18_0_1)" />
									</g>
									<g id="Vector_8">
										<mask id="path-21-outside-19_0_1" maskUnits="userSpaceOnUse" x="965.093" y="786.556" width="17" height="24" fill="black">
											<rect fill="white" x="965.093" y="786.556" width="17" height="24" />
											<path d="M969.093 800.533V796.61C969.093 796.61 970.343 790.827 971.558 790.568C972.773 790.309 978.235 794.42 977.858 805.551C977.858 805.551 977.091 806.257 975.156 804.526C973.222 802.794 969.105 801.499 969.105 800.545L969.093 800.533Z" />
										</mask>
										<path d="M969.093 800.533V796.61C969.093 796.61 970.343 790.827 971.558 790.568C972.773 790.309 978.235 794.42 977.858 805.551C977.858 805.551 977.091 806.257 975.156 804.526C973.222 802.794 969.105 801.499 969.105 800.545L969.093 800.533Z" fill="#f1be5b" />
										<path d="M969.093 800.533V796.61C969.093 796.61 970.343 790.827 971.558 790.568C972.773 790.309 978.235 794.42 977.858 805.551C977.858 805.551 977.091 806.257 975.156 804.526C973.222 802.794 969.105 801.499 969.105 800.545L969.093 800.533Z" stroke="white" stroke-width="8" mask="url(#path-21-outside-19_0_1)" />
									</g>
									<g id="Vector_9">
										<mask id="path-22-outside-20_0_1" maskUnits="userSpaceOnUse" x="995.163" y="744.043" width="21" height="31" fill="black">
											<rect fill="white" x="995.163" y="744.043" width="21" height="31" />
											<path d="M999.422 749.812C999.422 749.812 998.525 751.497 1000.07 754.712C1001.62 757.928 1002.9 764.819 1005.23 764.842C1007.55 764.866 1009.22 769.248 1009.22 769.248C1009.22 769.248 1012.32 773.712 1011.8 768.011C1011.28 762.31 1010.12 757.539 1010.12 757.539C1010.12 757.539 1006.51 752.91 1004.97 752.91C1004.97 752.91 1003.16 746.973 999.422 749.812Z" />
										</mask>
										<path d="M999.422 749.812C999.422 749.812 998.525 751.497 1000.07 754.712C1001.62 757.928 1002.9 764.819 1005.23 764.842C1007.55 764.866 1009.22 769.248 1009.22 769.248C1009.22 769.248 1012.32 773.712 1011.8 768.011C1011.28 762.31 1010.12 757.539 1010.12 757.539C1010.12 757.539 1006.51 752.91 1004.97 752.91C1004.97 752.91 1003.16 746.973 999.422 749.812Z" fill="#f1be5b" />
										<path d="M999.422 749.812C999.422 749.812 998.525 751.497 1000.07 754.712C1001.62 757.928 1002.9 764.819 1005.23 764.842C1007.55 764.866 1009.22 769.248 1009.22 769.248C1009.22 769.248 1012.32 773.712 1011.8 768.011C1011.28 762.31 1010.12 757.539 1010.12 757.539C1010.12 757.539 1006.51 752.91 1004.97 752.91C1004.97 752.91 1003.16 746.973 999.422 749.812Z" stroke="white" stroke-width="8" mask="url(#path-22-outside-20_0_1)" />
									</g>
								</g>
								<g stroke='#cec6c6' stroke-width="4" id="Banggai-Kepulauan">
									<mask id="path-23-outside-21_0_1" maskUnits="userSpaceOnUse" x="787.889" y="610.615" width="120" height="79" fill="black">
										<rect fill="white" x="787.889" y="610.615" width="120" height="79" />
										<path d="M791.889 661.568V649.013C791.889 649.013 792.467 644.091 795.342 641.052C795.342 641.052 795.262 635.881 796.579 634.077C797.897 632.273 801.431 631.536 805.045 624.393C808.659 617.249 813.181 619.55 813.181 619.55C813.181 619.55 816.555 622.172 816.466 623.655C816.466 623.655 822.876 620.159 826.579 619.197C830.281 618.235 834.554 617.666 836.852 616.512C836.852 616.512 837.43 615.934 842.602 622.34C842.602 622.34 844.249 623.326 844.41 620.536C844.57 617.746 847.293 614.804 847.293 614.804C847.293 614.804 849.1 613.657 850.996 617.017C852.891 620.376 855.269 626.285 855.269 626.285C855.269 626.285 856.337 629.564 853.542 630.389C850.747 631.215 849.839 631.784 849.759 632.851C849.679 633.917 849.349 637.613 848.94 638.84C848.94 638.84 856.586 645.566 856.915 648.524C857.245 651.483 862.755 646.552 862.666 645.077C862.578 643.602 862.337 639.553 864.393 638.094C866.449 636.635 868.915 634.663 869.903 631.624C870.891 628.586 877.14 625.146 877.14 625.146C877.14 625.146 887.742 624.898 889.878 628.425C889.878 628.425 892.184 629.331 891.935 631.624C891.935 631.624 895.718 630.558 898.842 631.376C901.967 632.193 903.035 633.508 903.035 633.508C903.035 633.508 904.023 636.707 902.545 638.84C902.545 638.84 902.135 642.287 899.589 644.748C899.589 644.748 900.826 654.345 899.669 654.842C898.513 655.339 896.714 656.397 896.384 657.383C896.055 658.37 894.408 661.079 890.633 659.107C890.633 659.107 889.156 664.767 889.156 666.243H886.28C886.28 666.243 886.28 664.767 884.144 665.914C882.007 667.06 882.256 669.441 882.256 669.441C882.256 669.441 880.939 671.325 880.039 667.718C879.14 664.11 875.517 663.701 875.517 663.701C875.517 663.701 872.473 659.268 870.666 658.778C870.666 658.778 868.69 653.198 866.722 652.709C864.754 652.22 862.859 652.461 862.779 654.185C862.698 655.908 859.245 656.486 859.245 656.486C859.245 656.486 858.666 665.345 857.028 669.938L856.947 677.9C856.947 677.9 858.835 679.952 858.835 680.69C858.835 681.427 859.494 684.386 857.847 684.875C856.2 685.364 855.871 682.822 855.871 680.938C855.871 679.054 855.132 677.491 853.486 679.134C851.839 680.778 849.132 683.896 843.783 683.648C843.783 683.648 842.137 681.347 842.964 680.449L838.851 680.369C838.851 680.369 835.976 679.551 836.546 675.935C836.546 675.935 836.795 674.46 839.671 674.621L848.056 668.463C848.056 668.463 848.964 665.922 848.056 662.474C847.148 659.027 844.353 650.416 844.851 645.077C845.349 639.738 846.088 634.903 840.498 636.298C840.498 636.298 830.635 645.654 828 653.527C825.366 661.4 823.438 666.491 814.434 670.676L809.382 677.651C809.382 677.651 804.282 680.032 800.917 676.176C800.917 676.176 801.246 664.198 791.913 661.568H791.889Z" />
									</mask>
									<path d="M791.889 661.568V649.013C791.889 649.013 792.467 644.091 795.342 641.052C795.342 641.052 795.262 635.881 796.579 634.077C797.897 632.273 801.431 631.536 805.045 624.393C808.659 617.249 813.181 619.55 813.181 619.55C813.181 619.55 816.555 622.172 816.466 623.655C816.466 623.655 822.876 620.159 826.579 619.197C830.281 618.235 834.554 617.666 836.852 616.512C836.852 616.512 837.43 615.934 842.602 622.34C842.602 622.34 844.249 623.326 844.41 620.536C844.57 617.746 847.293 614.804 847.293 614.804C847.293 614.804 849.1 613.657 850.996 617.017C852.891 620.376 855.269 626.285 855.269 626.285C855.269 626.285 856.337 629.564 853.542 630.389C850.747 631.215 849.839 631.784 849.759 632.851C849.679 633.917 849.349 637.613 848.94 638.84C848.94 638.84 856.586 645.566 856.915 648.524C857.245 651.483 862.755 646.552 862.666 645.077C862.578 643.602 862.337 639.553 864.393 638.094C866.449 636.635 868.915 634.663 869.903 631.624C870.891 628.586 877.14 625.146 877.14 625.146C877.14 625.146 887.742 624.898 889.878 628.425C889.878 628.425 892.184 629.331 891.935 631.624C891.935 631.624 895.718 630.558 898.842 631.376C901.967 632.193 903.035 633.508 903.035 633.508C903.035 633.508 904.023 636.707 902.545 638.84C902.545 638.84 902.135 642.287 899.589 644.748C899.589 644.748 900.826 654.345 899.669 654.842C898.513 655.339 896.714 656.397 896.384 657.383C896.055 658.37 894.408 661.079 890.633 659.107C890.633 659.107 889.156 664.767 889.156 666.243H886.28C886.28 666.243 886.28 664.767 884.144 665.914C882.007 667.06 882.256 669.441 882.256 669.441C882.256 669.441 880.939 671.325 880.039 667.718C879.14 664.11 875.517 663.701 875.517 663.701C875.517 663.701 872.473 659.268 870.666 658.778C870.666 658.778 868.69 653.198 866.722 652.709C864.754 652.22 862.859 652.461 862.779 654.185C862.698 655.908 859.245 656.486 859.245 656.486C859.245 656.486 858.666 665.345 857.028 669.938L856.947 677.9C856.947 677.9 858.835 679.952 858.835 680.69C858.835 681.427 859.494 684.386 857.847 684.875C856.2 685.364 855.871 682.822 855.871 680.938C855.871 679.054 855.132 677.491 853.486 679.134C851.839 680.778 849.132 683.896 843.783 683.648C843.783 683.648 842.137 681.347 842.964 680.449L838.851 680.369C838.851 680.369 835.976 679.551 836.546 675.935C836.546 675.935 836.795 674.46 839.671 674.621L848.056 668.463C848.056 668.463 848.964 665.922 848.056 662.474C847.148 659.027 844.353 650.416 844.851 645.077C845.349 639.738 846.088 634.903 840.498 636.298C840.498 636.298 830.635 645.654 828 653.527C825.366 661.4 823.438 666.491 814.434 670.676L809.382 677.651C809.382 677.651 804.282 680.032 800.917 676.176C800.917 676.176 801.246 664.198 791.913 661.568H791.889Z" fill="#76bf70" />
									<path d="M791.889 661.568V649.013C791.889 649.013 792.467 644.091 795.342 641.052C795.342 641.052 795.262 635.881 796.579 634.077C797.897 632.273 801.431 631.536 805.045 624.393C808.659 617.249 813.181 619.55 813.181 619.55C813.181 619.55 816.555 622.172 816.466 623.655C816.466 623.655 822.876 620.159 826.579 619.197C830.281 618.235 834.554 617.666 836.852 616.512C836.852 616.512 837.43 615.934 842.602 622.34C842.602 622.34 844.249 623.326 844.41 620.536C844.57 617.746 847.293 614.804 847.293 614.804C847.293 614.804 849.1 613.657 850.996 617.017C852.891 620.376 855.269 626.285 855.269 626.285C855.269 626.285 856.337 629.564 853.542 630.389C850.747 631.215 849.839 631.784 849.759 632.851C849.679 633.917 849.349 637.613 848.94 638.84C848.94 638.84 856.586 645.566 856.915 648.524C857.245 651.483 862.755 646.552 862.666 645.077C862.578 643.602 862.337 639.553 864.393 638.094C866.449 636.635 868.915 634.663 869.903 631.624C870.891 628.586 877.14 625.146 877.14 625.146C877.14 625.146 887.742 624.898 889.878 628.425C889.878 628.425 892.184 629.331 891.935 631.624C891.935 631.624 895.718 630.558 898.842 631.376C901.967 632.193 903.035 633.508 903.035 633.508C903.035 633.508 904.023 636.707 902.545 638.84C902.545 638.84 902.135 642.287 899.589 644.748C899.589 644.748 900.826 654.345 899.669 654.842C898.513 655.339 896.714 656.397 896.384 657.383C896.055 658.37 894.408 661.079 890.633 659.107C890.633 659.107 889.156 664.767 889.156 666.243H886.28C886.28 666.243 886.28 664.767 884.144 665.914C882.007 667.06 882.256 669.441 882.256 669.441C882.256 669.441 880.939 671.325 880.039 667.718C879.14 664.11 875.517 663.701 875.517 663.701C875.517 663.701 872.473 659.268 870.666 658.778C870.666 658.778 868.69 653.198 866.722 652.709C864.754 652.22 862.859 652.461 862.779 654.185C862.698 655.908 859.245 656.486 859.245 656.486C859.245 656.486 858.666 665.345 857.028 669.938L856.947 677.9C856.947 677.9 858.835 679.952 858.835 680.69C858.835 681.427 859.494 684.386 857.847 684.875C856.2 685.364 855.871 682.822 855.871 680.938C855.871 679.054 855.132 677.491 853.486 679.134C851.839 680.778 849.132 683.896 843.783 683.648C843.783 683.648 842.137 681.347 842.964 680.449L838.851 680.369C838.851 680.369 835.976 679.551 836.546 675.935C836.546 675.935 836.795 674.46 839.671 674.621L848.056 668.463C848.056 668.463 848.964 665.922 848.056 662.474C847.148 659.027 844.353 650.416 844.851 645.077C845.349 639.738 846.088 634.903 840.498 636.298C840.498 636.298 830.635 645.654 828 653.527C825.366 661.4 823.438 666.491 814.434 670.676L809.382 677.651C809.382 677.651 804.282 680.032 800.917 676.176C800.917 676.176 801.246 664.198 791.913 661.568H791.889Z" stroke="white" stroke-width="8" mask="url(#path-23-outside-21_0_1)" />
								</g>
								<g className="hidden" id="gorontalo">
									<rect id="Rectangle 130" x="621.616" y="200" width="162.01" height="48.7462" rx="12" fill="#CEC6C6" />
									<text id="GORONTALO" fill="white" font-family="Montserrat" font-size="17" font-weight="900" letter-spacing="0em"><tspan x="644.032" y="225.197">GORONTALO</tspan></text>
								</g>
								<g className="hidden" id="sulbar">
									<rect id="Rectangle 130_2" x="129.905" y="770.617" width="162.01" height="86.0227" rx="12" fill="#CEC6C6" />
									<text id="SULAWESI &#226;&#128;&#168;BARAT" fill="white" font-family="Montserrat" font-size="17" font-weight="900" letter-spacing="0em"><tspan x="159.867" y="802.392">SULAWESI &#x2028;</tspan><tspan x="179.041" y="823.392">BARAT</tspan></text>
								</g>
								<g className="hidden" id="sulsel">
									<rect id="Rectangle 130_3" x="290.428" y="870.978" width="162.01" height="86.0227" rx="12" fill="#CEC6C6" />
									<text id="SULAWESI &#226;&#128;&#168;SELATAN" fill="white" font-family="Montserrat" font-size="17" font-weight="900" letter-spacing="0em"><tspan x="320.389" y="902.753">SULAWESI &#x2028;</tspan><tspan x="329.304" y="923.753">SELATAN</tspan></text>
								</g>
								<g className="hidden" id="sulteng">
									<rect id="Rectangle 130_4" x="822.337" y="853.77" width="162.01" height="86.0227" rx="12" fill="#CEC6C6" />
									<text id="SULAWESI &#226;&#128;&#168;TENGGARA" fill="white" font-family="Montserrat" font-size="17" font-weight="900" letter-spacing="0em"><tspan x="852.298" y="885.544">SULAWESI &#x2028;</tspan><tspan x="852.132" y="906.544">TENGGARA</tspan></text>
								</g>
								<g className="hidden" id="manado">
									<rect id="Rectangle 130_5" x="807.997" y="228.675" width="162.01" height="48.7462" rx="12" fill="#CEC6C6" />
									<text id="MANADO" fill="white" font-family="Montserrat" font-size="17" font-weight="900" letter-spacing="0em"><tspan x="846.135" y="253.872">MANADO</tspan></text>
								</g>
								<g className="hidden" id="papua">
									<rect id="Rectangle 130_6" x="970" y="142" width="119" height="43" rx="12" fill="#CEC6C6" />
									<text id="Papua" fill="white" font-family="Montserrat" font-size="17" font-weight="900" letter-spacing="0em"><tspan x="999.351" y="168.733">Papua</tspan></text>
								</g>
								<g className="hidden" id="papua-pegunungan">
									<rect id="Rectangle 130_7" x="982" y="215" width="130" height="65" rx="12" fill="#CEC6C6" />
									<text id="Papua Pegunungan" fill="white" font-family="Montserrat" font-size="17" font-weight="900" letter-spacing="0em"><tspan x="1016.8" y="241.733">Papua &#10;</tspan><tspan x="989.128" y="262.733">Pegunungan</tspan></text>
								</g>
								<g className="hidden" id="maluku">
									<rect id="Rectangle 130_8" x="995" y="800" width="119" height="43" rx="12" fill="#CEC6C6" />
									<text id="Maluku" fill="white" font-family="Montserrat" font-size="17" font-weight="900" letter-spacing="0em"><tspan x="1019.13" y="826.733">Maluku</tspan></text>
								</g>
								<g className="hidden" id="papua-barat-daya">
									<rect id="Rectangle 130_9" x="986" y="931" width="130" height="65" rx="12" fill="#CEC6C6" />
									<text id="Papua Barat Daya" fill="white" font-family="Montserrat" font-size="17" font-weight="900" letter-spacing="0em"><tspan x="1020.8" y="957.733">Papua &#10;</tspan><tspan x="1001.68" y="978.733">Barat Daya</tspan></text>
								</g>
								<g className="hidden" id="papua-selatan">
									<rect id="Rectangle 130_10" x="987" y="387" width="130" height="65" rx="12" fill="#CEC6C6" />
									<text id="Papua Selatan" fill="white" font-family="Montserrat" font-size="17" font-weight="900" letter-spacing="0em"><tspan x="1021.8" y="413.733">Papua &#10;</tspan><tspan x="1018.64" y="434.733">Selatan</tspan></text>
								</g>
								<g className="hidden" id="maluku-utara">
									<rect id="Rectangle 130_11" x="992" y="495" width="119" height="64" rx="12" fill="#CEC6C6" />
									<text id="Maluku Utara" fill="white" font-family="Montserrat" font-size="17" font-weight="900" letter-spacing="0em"><tspan x="1013.58" y="521.733">Maluku &#10;</tspan><tspan x="1025.24" y="542.733">Utara</tspan></text>
								</g>
								<g className="hidden" id="papua-barat">
									<rect id="Rectangle 130_12" x="993" y="626" width="119" height="64" rx="12" fill="#CEC6C6" />
									<text id="Papua Barat" fill="white" font-family="Montserrat" font-size="17" font-weight="900" letter-spacing="0em"><tspan x="1022.35" y="652.733">Papua&#10;</tspan><tspan x="1026.33" y="673.733">Barat</tspan></text>
								</g>
								<g className="hidden" id="ntt">
									<rect id="Rectangle 130_13" x="634" y="1010" width="74" height="43" rx="12" fill="#CEC6C6" />
									<text id="NTT" fill="white" font-family="Montserrat" font-size="17" font-weight="900" letter-spacing="0em"><tspan x="652.25" y="1036.73">NTT</tspan></text>
								</g>
								<g className="hidden" id="ntb">
									<rect id="Rectangle 130_14" x="780" y="1007" width="74" height="43" rx="12" fill="#CEC6C6" />
									<text id="NTB" fill="white" font-family="Montserrat" font-size="17" font-weight="900" letter-spacing="0em"><tspan x="797.32" y="1033.73">NTB</tspan></text>
								</g>
								<g className="hidden" id="bali">
									<rect id="Rectangle 130_15" x="476" y="1013" width="74" height="43" rx="12" fill="#CEC6C6" />
									<text id="Bali_2" fill="white" font-family="Montserrat" font-size="17" font-weight="900" letter-spacing="0em"><tspan x="494.74" y="1039.73">Bali</tspan></text>
								</g>
								<g className="hidden" id="jatim">
									<rect id="Rectangle 130_16" x="95" y="676" width="138" height="43" rx="12" fill="#CEC6C6" />
									<text id="Jawa Timur" fill="white" font-family="Montserrat" font-size="17" font-weight="900" letter-spacing="0em"><tspan x="111.964" y="702.733">Jawa Timur</tspan></text>
								</g>
								<g className="hidden" id="yogya">
									<rect id="Rectangle 130_17" x="78" y="1013" width="143" height="43" rx="12" fill="#CEC6C6" />
									<text id="Yogyakarta" fill="white" font-family="Montserrat" font-size="17" font-weight="900" letter-spacing="0em"><tspan x="92.9298" y="1039.73"> Yogyakarta</tspan></text>
								</g>
								<g className="hidden" id="jabar">
									<rect id="Rectangle 130_18" x="70" y="551" width="143" height="43" rx="12" fill="#CEC6C6" />
									<text id="Jawa barat" fill="white" font-family="Montserrat" font-size="17" font-weight="900" letter-spacing="0em"><tspan x="89.7277" y="577.733">Jawa barat</tspan></text>
								</g>
								<g className="hidden" id="jateng">
									<rect id="Rectangle 130_19" x="40" y="438" width="143" height="43" rx="12" fill="#CEC6C6" />
									<text id="Jawa Tengah" fill="white" font-family="Montserrat" font-size="17" font-weight="900" letter-spacing="0em"><tspan x="49.8082" y="464.733">Jawa Tengah</tspan></text>
								</g>
								<g className="hidden" id="jakarta">
									<rect id="Rectangle 130_20" x="92" y="255" width="143" height="43" rx="12" fill="#CEC6C6" />
									<text id="DKI Jakarta" fill="white" font-family="Montserrat" font-size="17" font-weight="900" letter-spacing="0em"><tspan x="108.192" y="281.733">DKI Jakarta</tspan></text>
								</g>
								<g className="hidden" id="bangka">
									<rect id="Rectangle 130_21" x="192" y="157" width="115" height="63" rx="12" fill="#CEC6C6" />
									<text id="Bangka belitung" fill="white" font-family="Montserrat" font-size="17" font-weight="900" letter-spacing="0em"><tspan x="214.785" y="183.733">Bangka&#10;</tspan><tspan x="211.299" y="204.733">belitung</tspan></text>
								</g>
								<g className="hidden" id="kepulauan-riau">
									<rect id="Rectangle 130_22" x="342" y="93" width="115" height="64" rx="12" fill="#CEC6C6" />
									<text id="Kepulauan Riau" fill="white" font-family="Montserrat" font-size="17" font-weight="900" letter-spacing="0em"><tspan x="348.441" y="119.733">Kepulauan &#10;</tspan><tspan x="379.818" y="140.733">Riau</tspan></text>
								</g>
								<g className="hidden" id="jambi">
									<rect id="Rectangle 130_23" x="92" y="351" width="115" height="43" rx="12" fill="#CEC6C6" />
									<text id="Jambi" fill="white" font-family="Montserrat" font-size="17" font-weight="900" letter-spacing="0em"><tspan x="122.414" y="377.733">Jambi</tspan></text>
								</g>
								<g className="hidden" id="banten">
									<rect id="Rectangle 130_24" x="55" y="920" width="115" height="43" rx="12" fill="#CEC6C6" />
									<text id="Banten" fill="white" font-family="Montserrat" font-size="17" font-weight="900" letter-spacing="0em"><tspan x="80.0099" y="946.733">Banten</tspan></text>
								</g>
								<g className="hidden" id="sumsel">
									<rect id="Rectangle 130_25" x="385" width="115" height="65" rx="12" fill="#CEC6C6" />
									<text id="Sumatera Selatan" fill="white" font-family="Montserrat" font-size="17" font-weight="900" letter-spacing="0em"><tspan x="399.111" y="25.5945">Sumatera&#10;</tspan><tspan x="408.64" y="46.5945">Selatan</tspan></text>
								</g>
								<g className="hidden" id="aceh">
									<rect id="Rectangle 130_26" x="80" y="93" width="107" height="48" rx="12" fill="#CEC6C6" />
									<text id="Aceh" fill="white" font-family="Montserrat" font-size="17" font-weight="900" letter-spacing="0em"><tspan x="106.772" y="118.594">Aceh</tspan></text>
								</g>
								<g className="hidden" id="bengkulu">
									<rect id="Rectangle 130_27" x="279" y="1016" width="115" height="44" rx="12" fill="#CEC6C6" />
									<text id="Bengkulu" fill="white" font-family="Montserrat" font-size="17" font-weight="900" letter-spacing="0em"><tspan x="292.447" y="1041.73">Bengkulu</tspan></text>
								</g>
							</g>
						</g>
					</svg>

				</div>
			</center>
			<br />
			<footer className="mt-10 px-4 sm:px-10 py-6 bg-no-repeat bg-cover bg-[url('/footer.png')] text-white">
				<div className="flex flex-col md:flex-row justify-between items-center gap-6">
					<div className="flex flex-col sm:flex-row gap-6 sm:gap-4">
						<div className="flex items-center gap-4">
							<Image src={bank} alt="bank" width={45} height={45} />
							<div className="flex flex-col">
								<p className="text-sm">Kantor Perwakilan</p>
								<h1 className="text-lg">Bank Indonesia</h1>
								<p className="text-sm">Provinsi Sulawesi Tengah</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<Image src={sulaw} alt="sulaw" width={30} height={30} />
							<div>
								<h1 className="text-lg">Pemerintahan</h1>
								<p className="text-sm">Provinsi Sulawesi Tengah</p>
							</div>
						</div>
					</div>
					<div className="text-center md:text-right w-full md:w-auto">
						<p className="font-bold text-lg">
							SEKRETARIAT TPID SULAWESI TENGAH KANTOR PERWAKILAN BANK INDONESIA
							PROVINSI SULAWESI TENGAH
						</p>
						<p>
							Jl. Sam Ratulangi No.23 Besusu Barat, Kec. Palu Timur, Kota Palu,
							Sulawesi Tengah 94118
						</p>
					</div>
				</div>
			</footer>

		</div>
	);
};
export default FlowChart;   