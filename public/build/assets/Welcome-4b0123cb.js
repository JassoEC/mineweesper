import{j as e,a as s,d as t}from"./app-d684ac51.js";function i({auth:r,laravelVersion:a,phpVersion:o}){return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Welcome"}),e.jsx("div",{className:"relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white",children:e.jsxs("div",{className:"max-w-7xl mx-auto p-6 lg:p-8 border",children:[e.jsx("div",{className:"flex justify-center",children:e.jsx("img",{src:"https://i0.wp.com/www.geeksgyaan.com/wp-content/uploads/2021/08/minesweeper.webp?resize=696%2C340&ssl=1",alt:"",className:""})}),e.jsx("div",{className:"text-center",children:r.user?e.jsx(t,{href:route("dashboard"),className:"text-4xl font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500",children:"Dashboard"}):e.jsxs(e.Fragment,{children:[e.jsx(t,{href:route("login"),className:"text-4xl font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500",children:"Log in"}),e.jsx(t,{href:route("register"),className:"ml-4 text-4xl font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500",children:"Register"})]})})]})}),e.jsx("style",{children:`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `})]})}export{i as default};