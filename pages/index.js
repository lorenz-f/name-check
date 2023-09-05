import { useState } from "react";

export default function UsernameForm() {
  const [username, setUsername] = useState("");
  const [availability, setAvailability] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        const data = await response.json();
        setAvailability(data);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="font-inter h-screen w-screen flex flex-col items-center justify-center overflow-x-hidden">
      <header
        className="flex flex-row h-[5%] sm:h-1/5 bg-black text-white font-2xl w-screen px-4 sm:items-center sm:justify-center flex-wrap"
      >
        <form
          className="flex flex-row sm:flex-col items-center text-xl space-x-3 text-white transition-all ease-in-out cursor-pointer rounded sm:space-x-0 sm:space-y-2"
          onSubmit={handleSubmit}
        >
          <h1 className="font-breeSerif text-2xl sm:text-xl">NameCheck</h1>
          <input
            className="rounded text-black text-lg px-1.5 sm:w-[90vw] sm:h-"
            type="text"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <button className="text-base sm:text-2xl" type="submit">
            Search
          </button>
        </form>
        <a
          className="flex ml-auto mr-0 text-center items-center justify-center sm:hidden"
          href="https://github.com/lorenz-f/name-check"
        >
          GitHub
        </a>
      </header>
      <div className="h-full flex flex-col w-full text-2xl sm:text-lg flex-wrap">
        <div
          className={`instagram-gradient h-1/4 space-y-3 w-full items-center justify-center flex flex-col`}
        >
          <img
            className="w-16 h-16 sm:w-12 sm:h-12 flex flex-col"
            src="/icons/instagram-icon.png"
          />
          <p className={`${availability == null ? "loader" : ""} text-white`}>
            {availability == null
              ? "Awaiting search"
              : availability.instagram
              ? "Available"
              : "Taken"}{" "}
          </p>
        </div>
        <div
          className={`h-1/4 w-full bg-[#1DA1F2] space-y-3 items-center justify-center flex flex-col`}
        >
          <img
            className="w-16 h-16 sm:w-12 sm:h-12 flex flex-col"
            src="/icons/twitter-icon.png"
          />
          <p className={`${availability == null ? "loader" : ""} text-white`}>
            {availability == null
              ? "Awaiting search"
              : availability.twitter
              ? "Available"
              : "Taken"}{" "}
          </p>
        </div>
        <div
          className={`h-1/4 w-full bg-white space-y-3 items-center justify-center flex flex-col`}
        >
          <img
            className={`w-16 h-16 sm:w-12 sm:h-12 flex flex-col`}
            src="/icons/tiktok-icon.png"
          />
          <p className={`${availability == null ? "loader" : ""}`}>
            {availability == null
              ? "Awaiting search"
              : availability.tiktok
              ? "Available"
              : "Taken"}{" "}
          </p>
        </div>
        <div
          className={`h-1/4 w-full bg-[#FF5700] space-y-3 items-center justify-center flex flex-col`}
        >
          <img
            className={`w-16 h-16 sm:w-12 sm:h-12 flex flex-col`}
            src="/icons/reddit-icon.png"
          />
          <p className={`${availability == null ? "loader" : ""} text-white`}>
            {availability == null
              ? "Awaiting search"
              : availability.reddit
              ? "Available"
              : "Taken"}{" "}
          </p>
        </div>
      </div>
    </main>
  );
}
