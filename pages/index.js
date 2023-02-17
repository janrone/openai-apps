import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Analytics } from '@vercel/analytics/react';
import styles from "./index.module.css";
import { Github } from "../components/shared/icons";
import { Twitter } from "../components/shared/icons";
import { LoadingCircle } from "../components/shared/icons";
import "tailwindcss/tailwind.css";


export default function Home() {
  const [infoInput, setInfoInput] = useState("");
  const [result, setResult] = useState("EX: sunset glow");
  const [image_url, setUrl] = useState("/img-sunset-1.png");
  const [isLoaded, setLoaded] = useState(true);

  function handleLoad() {
    setLoaded(true)
  }

  async function onSubmit(event) {
    setLoaded(false)
    event.preventDefault();
    try {
      const response = await fetch("/api/generateimage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: infoInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setUrl(data.image_url);
      setInfoInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      setLoaded(true)
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <meta name="referrer" content="no-referrer" />
        <title>OpenAI Apps
        </title>
        <link rel="icon" href="/img-logo.png" />


      </Head>

      <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
        <Link href="/" className="flex items-center font-display text-2xl">
          <Image
            src="/img-logo.png"
            alt="Logo image of a chat bubble"
            width="50"
            height="50"
            className="mr-2 rounded-sm"
          ></Image>
          <p className="text-2xl font-semibold">My Painter</p>
        </Link>
        <div className="flex items-center space-x-4">
          <a
            href="https://twitter.com/janronehoo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="h-6 w-6" viewBox="0 0 1155 1000" fill="none" />
          </a>
          <a
            href="https://github.com/janrone/openai-apps"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
          </a>
        </div>
      </div>


      <main className={styles.main}>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="input"
            placeholder="Enter detail of the generate image infomation "
            value={infoInput}
            onChange={(e) => setInfoInput(e.target.value)}
          />
          <input type="submit" value="Begin Paint" />
        </form>
        <div className={styles.result}>{result}</div>
        <div style={{ position: "relative" }}>
          <img onLoad={handleLoad} style={{ width: '512px', marginBottom: '40px', opacity: isLoaded ? 1 : ' 0.25' }} src={image_url} />

          {!isLoaded && (
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <span><LoadingCircle /></span>
            </div>
          )}

        </div>

      </main>


      <div className="absolute w-full border-t border-gray-200 bg-white py-5 text-center">
        <p className="text-gray-500">
          Powered by{" "}
          <a
            className="font-semibold text-gray-600 transition-colors hover:text-black"
            href="https://openai.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenAI
          </a>{" "}
          and{" "}

          <a
            className="font-semibold text-gray-600 transition-colors hover:text-black"
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel
          </a>
          .
        </p>
      </div>

      <Analytics />

    </div>
  );
}
