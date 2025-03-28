import {
    Links,
    Meta,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from "@remix-run/react";
import type {LinksFunction, LoaderFunction} from "@remix-run/node";

import "./styles/tailwind.css";
import App from "~/App";
import {ApplicationStateProvider} from "~/hooks/applicationStore";

export const links: LinksFunction = () => [
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
    }
];

export const loader: LoaderFunction = async () => {
  return {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  };
};

export default function Root() {
  const env = useLoaderData();

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Cash register simulator</title>
        <Meta/>
        <Links/>
      </head>
      <body className="h-full bg-gray-100">
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(env)}`,
          }}
        />
        <ApplicationStateProvider>
          <App />
        </ApplicationStateProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
