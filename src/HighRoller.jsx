import React, { useState, useEffect } from "react";
export const HighRoller = () => {
  const [multipliers, setMultipliers] = useState({
    x1: [99, 99, 99],
    x5: [99, 99, 99],
    x10: [99, 99, 99],
    x20: [99, 99, 99],
    x1000: [99, 99, 99, 99],
  });

  const [x1000, setx1000] = useState([9, 9, 9, 9]);
  const [targets, setTargets] = useState([10, 20, 30, 40]);
  const [results, setResults] = useState([]);
  const [offset, setOffset] = useState(0);

  const handleMultiplierChange = (multiplier, index, value) => {
    const updatedMultipliers = { ...multipliers };
    updatedMultipliers[multiplier][index] = parseInt(value, 10) || 0;
    setMultipliers(updatedMultipliers);
  };

  const handleTargetsChange = (e) => {
    const newTargets = e.target.value
      .split(",")
      .map((target) => parseInt(target.trim(), 10) || 0);
    setTargets(newTargets);
  };

  const runMainFunction = () => {
    const firstmove = {
      x1: multipliers.x1[0],
      x5: multipliers.x5[0],
      x10: multipliers.x10[0],
      x20: multipliers.x20[0],
      x1000: multipliers.x1000[0],
    };
    const secondmove = {
      x1: multipliers.x1[1],
      x5: multipliers.x5[1],
      x10: multipliers.x10[1],
      x20: multipliers.x20[1],
      x1000: multipliers.x1000[1],
    };
    const thirdmove = {
      x1: multipliers.x1[2],
      x5: multipliers.x5[2],
      x10: multipliers.x10[2],
      x20: multipliers.x20[2],
      x1000: multipliers.x1000[2],
    };

    const newResults = [];

    for (let target of targets) {
      for (let a in firstmove) {
        if (firstmove[a] + multipliers.x1000[1] === target) {
          newResults.push(
            `${target} can be done on the second move with ${a}-x1000`
          );
        }
        for (let b in secondmove) {
          if (
            firstmove[a] + secondmove[b] + multipliers["x1000"][2] ===
            target
          ) {
            newResults.push(
              `${target} can be done on the third move with ${a}-${b}-x1000`
            );
          }
          for (let c in thirdmove) {
            if (
              firstmove[a] +
                secondmove[b] +
                thirdmove[c] +
                multipliers["x1000"][3] ===
              target
            ) {
              newResults.push(
                `${target} can be done on the fourth move with ${a}-${b}-${c}-x1000`
              );
            }
          }
        }
      }
    }

    setResults(newResults);
  };

  const setTargetChange = (a = []) => {
    setTargets([...a]);
  };

  const useOffset = () => {
    setTargetChange(
      targets
        .map((e) => e - offset)
        .map((e) => (e <= 0 ? 40 + e : e))
        .sort((a, b) => a - b)
    );
  };

  useEffect(() => {
    runMainFunction();
  }, [multipliers, x1000, targets]);

  return (
    <>
      <h2>High Roller</h2>
      <div className="grid grid-cols-2">
        <div>
          <div>
            <h2>x1000</h2>
            <div className="grid grid-cols-4">
              <th>Move 1</th>
              <th>Move 2</th>
              <th>Move 3</th>
              <th>Move 4</th>

              {multipliers["x1000"].map((value, index) => (
                <input
                  key={index}
                  type="number"
                  value={value}
                  onChange={(e) =>
                    handleMultiplierChange("x1000", index, e.target.value)
                  }
                />
              ))}
            </div>
          </div>
          <div>
            <th>SMALL MULTIPLIERS</th>
          </div>
          <div className="grid grid-cols-4">
            <div>x1</div>
            {multipliers["x1"].map((value, index) => (
              <input
                key={index}
                type="number"
                value={value}
                onChange={(e) =>
                  handleMultiplierChange("x1", index, e.target.value)
                }
              />
            ))}
            <div>x5</div>
            {multipliers["x5"].map((value, index) => (
              <input
                key={index}
                type="number"
                value={value}
                onChange={(e) =>
                  handleMultiplierChange("x5", index, e.target.value)
                }
              />
            ))}
            <div>x10</div>
            {multipliers["x10"].map((value, index) => (
              <input
                key={index}
                type="number"
                value={value}
                onChange={(e) =>
                  handleMultiplierChange("x10", index, e.target.value)
                }
              />
            ))}

            <div>x20</div>
            {multipliers["x20"].map((value, index) => (
              <input
                key={index}
                type="number"
                value={value}
                onChange={(e) =>
                  handleMultiplierChange("x20", index, e.target.value)
                }
              />
            ))}
          </div>
          <div>
            <h2>Targets</h2>
            <input
              type="text"
              value={targets.join(", ")}
              onChange={handleTargetsChange}
            />
          </div>
          <div>
            <div>
              <button onClick={() => setTargetChange([16, 26, 32, 40])}>
                Electric Company
              </button>
            </div>
            <div>
              <button onClick={() => setTargetChange([10, 16, 24, 40])}>
                Water Works
              </button>
            </div>
            <div>
              <button onClick={() => setTargetChange([6, 14, 30, 40])}>
                Luxury Tax
              </button>
            </div>
            <div>
              <button onClick={() => setTargetChange([8, 24, 34, 40])}>
                Income Tax
              </button>
            </div>
          </div>

          <div>
            <input
              type="number"
              value={offset}
              onChange={(e) => setOffset(e.target.value)}
            />
            <button onClick={useOffset}>USE OFFSET</button>
          </div>
        </div>

        <div>
          <h2>Results</h2>
          <ul>
            {results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
