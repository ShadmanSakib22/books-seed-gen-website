import { Shuffle, Download } from "lucide-react";

export const Toolbar = ({
  language,
  setLanguage,
  seed,
  setSeed,
  generateRandomSeed,
  avgReviews,
  setAvgReviews,
  avgLikes,
  setAvgLikes,
  exportToCSV,
  booksLength,
  languages,
}) => {
  return (
    <div className="bg-base-200 p-4 rounded-lg mb-6 shadow-lg border-2 border-base-300">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="flex flex-wrap gap-4">
          <div className="form-control max-w-[160px]">
            <div className="text-xs text-accent mb-2">Region:</div>
            <select
              className="select select-sm select-accent w-full"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control max-w-[160px]">
            <div className="text-xs text-accent mb-2">Seed:</div>
            <div className="flex gap-1">
              <input
                type="text"
                className="input input-sm input-accent w-full"
                value={seed}
                maxLength={8}
                pattern="[a-zA-Z0-9]*"
                onChange={(e) => {
                  // Only allow alphanumeric characters
                  const alphanumericValue = e.target.value.replace(
                    /[^a-zA-Z0-9]/g,
                    ""
                  );
                  setSeed(alphanumericValue);
                }}
                placeholder="Enter seed"
              />
              <button
                className="btn btn-accent btn-sm px-2 text-accent-content"
                onClick={generateRandomSeed}
              >
                <Shuffle size={20} />
              </button>
            </div>
          </div>

          <div className="form-control max-w-[120px]">
            <div className="text-xs text-accent mb-2">Average Reviews:</div>
            <input
              type="number"
              className="input input-sm input-accent w-full"
              value={avgReviews}
              onChange={(e) => {
                const value = e.target.value;
                setAvgReviews(value === "" ? 0 : parseFloat(value));
              }}
              min="0"
              step="0.1"
              placeholder="Average Reviews"
            />
          </div>

          <div className="form-control max-w-[160px]">
            <div className="text-xs text-accent mb-2">
              Average Likes: {avgLikes}
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              className="range range-sm range-accent"
              value={avgLikes}
              onChange={(e) => setAvgLikes(parseFloat(e.target.value))}
            />
          </div>
        </div>
        <button
          className="btn btn-sm btn-success"
          onClick={exportToCSV}
          disabled={booksLength === 0}
        >
          Export to CSV
          <Download size={20} />
        </button>
      </div>
    </div>
  );
};
