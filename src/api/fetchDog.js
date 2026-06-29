const API_URL = "https://api.thedogapi.com/v1/images/search?has_breeds=true&limit=1";

export async function fetchDog() {
  const res = await fetch(API_URL, {
    headers: {
      "x-api-key": "live_mQZ3ZGHeywr9bWxxphTWmhKuDoppQTLoyneB5vu34HaLwraZUp7csdhAintmbopj",
    },
  });
  if (!res.ok) throw new Error("API error");
  const data = await res.json();
  const item = data[0];
  if (!item?.breeds?.length) return null;
  const breed = item.breeds[0];
  return {
    id: item.id,
    image: item.url,
    name: breed.name || "Unknown",
    temperament: breed.temperament || "",
    origin: breed.origin || "Unknown",
    bredFor: breed.bred_for || "Unknown",
    lifeSpan: breed.life_span || "Unknown",
  };
}