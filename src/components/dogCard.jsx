import Tag from "./Tag";

export default function DogCard({ dog, banList, onToggleBan }) {
  const temperamentTraits = dog.temperament
    ? dog.temperament.split(",").map((t) => t.trim())
    : [];

  return (
    <div className="dog-card">
      <div className="card-img-wrap">
        <img
          src={dog.image}
          alt={dog.name}
          className="card-img"
          key={dog.id}
        />
        <div className="card-img-overlay">
          <h2 className="dog-name">{dog.name}</h2>
        </div>
      </div>

      <div className="card-body">
        <div className="attr-row">
          <span className="attr-label">Origin</span>
          <Tag
            label={dog.origin}
            banned={banList.includes(dog.origin)}
            onClick={() => onToggleBan(dog.origin)}
          />
        </div>

        <div className="attr-row">
          <span className="attr-label">Bred For</span>
          <Tag
            label={dog.bredFor}
            banned={banList.includes(dog.bredFor)}
            onClick={() => onToggleBan(dog.bredFor)}
          />
        </div>

        <div className="attr-row">
          <span className="attr-label">Life Span</span>
          <span className="attr-static">{dog.lifeSpan}</span>
        </div>

        {temperamentTraits.length > 0 && (
          <div className="attr-row attr-row--column">
            <span className="attr-label">Temperament</span>
            <div className="tag-group">
              {temperamentTraits.map((trait) => (
                <Tag
                  key={trait}
                  label={trait}
                  banned={banList.includes(trait)}
                  onClick={() => onToggleBan(trait)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}