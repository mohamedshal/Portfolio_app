import ecommerceImage from "../images/ecommerce3332.png";
import cryptoImage from "../images/crypto.png";
import weatherImage from "../images/weather.png";
import prayerImage from "../images/prayertimings.png";
import crudsImage from "../images/crudsPhoto.png";
import FormBuilderImage from "../images/form-builder.png";

export const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

export const SKILLS = [
	{ name: "HTML5", level: 95, icon: "devicon-html5-plain colored", cat: "Frontend" },
	{ name: "CSS3", level: 95, icon: "devicon-css3-plain colored", cat: "Frontend" },
	{ name: "JavaScript", level: 95, icon: "devicon-javascript-plain colored", cat: "Language" },
	{ name: "React.js", level: 93, icon: "devicon-react-original colored", cat: "Frontend" },
	{ name: "Zustand", level: 91, icon: "🧠", cat: "Frontend" },
	{ name: "Redux Toolkit", level: 85, icon: "devicon-redux-original colored", cat: "Frontend" },
	{ name: "TypeScript", level: 78, icon: "devicon-typescript-plain colored", cat: "Language" },
	{
		name: "Tailwind CSS",
		level: 90,
		icon: "devicon-tailwindcss-original colored",
		cat: "Frontend",
	},
	{ name: "Bootstrap", level: 95, icon: "devicon-bootstrap-plain colored", cat: "Frontend" },
	{ name: "Sass", level: 92, icon: "devicon-sass-original colored", cat: "Frontend" },
	{ name: "Next.js", level: 88, icon: "devicon-nextjs-original", cat: "Frontend" },
	{ name: "Node.js", level: 82, icon: "devicon-nodejs-plain colored", cat: "Backend" },
	{ name: "Express.js", level: 80, icon: "devicon-express-original", cat: "Backend" },
	{ name: "NestJS", level: 80, icon: "devicon-nestjs-original colored", cat: "Backend" },
	{ name: "MongoDB", level: 80, icon: "devicon-mongodb-plain colored", cat: "Database" },
];

export const PROJECTS = [
	{
		title: "E-Commerce Store",
		subtitle: "Frontend Web App",
		desc: "Responsive e-commerce interface with product listing, filtering, and smooth UI interactions.",
		tags: ["React", "CSS", "JavaScript"],
		accent: "#22c55e",
		icon: "🛒",
		num: "01",
		image: ecommerceImage,
		projectUrl: "https://e-commerce3x1.netlify.app/",
		detailsUrl: "https://e-commerce3x1.netlify.app/",
		kind: "frontend",
	},
	{
		title: "Advanced Form Builder",
		subtitle: "Form Builder",
		desc: "Advanced React form builder with drag-and-drop, validation, conditional logic, and customization",
		tags: ["React", "API", "TypeScript"],
		accent: "#eab308",
		icon: "🪙",
		num: "02",
		image: FormBuilderImage,
		projectUrl: "https://advanced-form-builder-nf0sfvthr.vercel.app/",
		detailsUrl: "https://advanced-form-builder-nf0sfvthr.vercel.app/",
		kind: "frontend",
	},
	{
		title: "Weather App",
		subtitle: "Forecast Interface",
		desc: "Weather lookup project with location-based results and clear, responsive UI sections.",
		tags: ["React", "Weather API", "Tailwind"],
		accent: "#f97316",
		icon: "⛅",
		num: "03",
		image: weatherImage,
		projectUrl: "https://weathertemp123.netlify.app/",
		detailsUrl: "https://weathertemp123.netlify.app/",
		kind: "frontend",
	},
	{
		title: "Prayer Timings",
		subtitle: "Utility App",
		desc: "Prayer times web app focused on daily schedule access with fast and minimal interface.",
		tags: ["React", "Date/Time", "Utility"],
		accent: "#a78bfa",
		icon: "🕌",
		num: "04",
		image: prayerImage,
		projectUrl: "https://theprayerstimings.netlify.app/",
		detailsUrl: "https://theprayerstimings.netlify.app/",
		kind: "frontend",
	},
	{
		title: "CRUDS",
		subtitle: "Product Manager",
		desc: "Classic CRUD application for creating, updating, searching, and deleting product entries.",
		tags: ["HTML", "CSS", "JavaScript", "CRUD"],
		accent: "#38bdf8",
		icon: "🧾",
		num: "05",
		image: crudsImage,
		projectUrl: "https://mohamedshal.github.io/CRUDS/",
		detailsUrl: "https://mohamedshal.github.io/CRUDS/",
		kind: "frontend",
	},
	{
		title: "E-commerce Node.js API",
		subtitle: "Backend Project",
		desc: "Backend-only e-commerce service built with Node.js and Express.js including routes, models, and controllers.",
		tags: ["Node.js", "Express.js", "REST API", "Backend"],
		accent: "#14b8a6",
		icon: "🛠️",
		num: "06",
		image: null,
		projectUrl: "https://github.com/mohamedshal/E-commerce_Nodejs",
		detailsUrl: "https://github.com/mohamedshal/E-commerce_Nodejs",
		kind: "backend",
	},
];

export const TIMELINE = [
	{
		year: "2025",
		title: "Backend & Full-Stack Path",
		desc: "Joined ITI 9-month scholarship, learning Node.js and Express.js to build backend systems and full-stack applications.",
	},
	{
		year: "2024",
		title: "Advanced Projects",
		desc: "Built 15+ projects using React, TypeScript, and APIs, focusing on performance, clean code, and real-world use cases.",
	},
	{
		year: "2024",
		title: "React Development",
		desc: "Learned React.js through Tarmeez Academy, working with state, props, and Redux Toolkit to build scalable front-end applications.",
	},
	{
		year: "2023",
		title: "Front-End Development",
		desc: "Expanded skills in HTML, CSS, and responsive design, creating multiple projects and improving UI development using modern tools.",
	},
	{
		year: "2022",
		title: "JavaScript Foundations",
		desc: "Learned JavaScript fundamentals through Elzero Web School and Nouvil Academy, building a strong base in core programming concepts.",
	},
];
