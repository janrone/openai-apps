import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generateimage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
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

      <main className={styles.main}>
        <img src="/img-logo.png" className={styles.icon} />
        <h3>My painter</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter detail of the generate image infomation "
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Begin Paint" />
        </form>
        <div className={styles.result}>{result}</div>
        <div ><img style={{width:'512px'}} src={result}/></div>
      </main>
    </div>
  );
}
