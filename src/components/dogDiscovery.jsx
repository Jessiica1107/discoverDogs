import { useState, useCallback } from "react";
import { fetchDog } from "../api/fetchDog";
import DogCard from "./DogCard";
import BanSidebar from "./BanSidebar";

const MAX_RETRIES = 10;

export default function DogDiscovery() {
    const [dog, setDog] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [banList, setBanList] = useState([]);

    const toggleBan = useCallback((value) => {
        setBanList((prev) =>
            prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
        );
    }, []);

const discover = useCallback(async () => {
  setLoading(true);
  setError(null);
  try {
    let attempts = 0;
    
    while (attempts < MAX_RETRIES) {
      const result = await fetchDog();

      if (!result) continue; 
      attempts++;

      const traits = result.temperament
        ? result.temperament.split(",").map((t) => t.trim())
        : [];

      const currentDogAttributes = [
        ...traits, 
        result.origin, 
        result.bredFor,
        result.name
      ].filter(val => val && val !== "Unknown" && val !== "");

      const isBanned = currentDogAttributes.some((val) => 
        banList.includes(val)
      );

      if (!isBanned) {
        setDog(result);
        setLoading(false);
        return;
      }
    }
    
    setError("No results found outside your ban list. Try removing some bans.");
  } catch (err) {
    console.error(err);
    setError("Failed to fetch. Check your connection and try again.");
  }
  setLoading(false);
}, [banList]);

    return (
        <div className="app">
            <header className="header">
                <div className="header-inner">
                    <div className="logo">
                        <span className="logo-text">dogDiscover</span>
                    </div>
                </div>
            </header>

            <main className="main">
                <section className="card-area">
                    <button
                        className="discover-btn"
                        onClick={discover}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="btn-inner">
                                <span className="spinner" /> Fetching…
                            </span>
                        ) : (
                            <span className="btn-inner">
                                <span className="btn-icon"></span> Discover
                            </span>
                        )}
                    </button>

                    {error && <p className="error-msg">{error}</p>}

                    {!dog && !loading && !error && (
                        <div className="empty-state">
                            <p>Hit the discover button to see some dogs.</p>
                        </div>
                    )}

                    {dog && !loading && (
                        <DogCard dog={dog} banList={banList} onToggleBan={toggleBan} />
                    )}
                </section>

                <BanSidebar
                    banList={banList}
                    onToggleBan={toggleBan}
                    onClearAll={() => setBanList([])}
                />
            </main>
        </div>
    );
}