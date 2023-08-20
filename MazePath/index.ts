/*
 *
 *  Given a matrix with walls and
 *  an end point. Find the path
 *  from start to end;
 *
 *  Start: S;
 *  End:   E;
 *  Wall:  W;
 *  path:  P;
 *
 */

/*
 *
 *  Base case:
 *  1. If end return path;
 *  2. If wall return false;
 *  3. If off board return false;
 *  4. If we have seen it return false;
 *
 */
enum Options {
  Start = "S",
  End = "E",
  Wall = "W",
  Path = "P",
}

class PathFinder {
  private visited: Set<string> = new Set();
  private maze: Array<string[]>;
  private height: number;
  private width: number;

  constructor(maze: Array<string[]>) {
    this.maze = maze;
    this.height = maze.length - 1;
    this.width = maze[0].length - 1;
  }

  public path_finder() {
    for (let x = 0; x < this.height + 1; x++) {
      // parse every element of top and bottom
      if (x === 0 || x === this.height) {
        for (let y = 0; y < this.width + 1; y++) {
          if (this.maze[x][y] === Options.Start) {
            return this._iterate({ target: [x, y], path: [[x, y]] });
          }
        }
      }

      if (this.maze[x][0] === Options.Start) {
        return this._iterate({ target: [x, 0], path: [[x, 0]] });
      }

      if (this.maze[x][this.width] === Options.Start) {
        return this._iterate({
          target: [x, this.width],
          path: [[x, this.width]],
        });
      }
    }
  }

  private _iterate({
    target,
    path,
  }: {
    target: [number, number];
    path: Array<number[]>;
  }): any {
    const [x, y] = target;
    this.visited.add(`${x}${y}`);
    // base cases
    switch (this.maze[x][y]) {
      case Options.End:
        return [...path, target];
      case Options.Wall:
        return false;
      case Options.Path:
      case Options.Start:
        const start_next_locations = this.determine_sides(target);
        for (const target of start_next_locations) {
          const res = this._iterate({ target, path: [...path, target] });
          if (res) return res;
        }
    }
  }

  private determine_sides(location: [number, number]): Array<[number, number]> {
    const [x, y] = location;
    const return_vals: Array<[number, number]> = [];
    if (x + 1 <= this.height && this.visited.has(`${x + 1}, ${y}`))
      return_vals.push([x + 1, y]);
    if (x - 1 >= 0 && !this.visited.has(`${x - 1}, $y`))
      return_vals.push([x - 1, y]);
    if (y + 1 <= this.width && !this.visited.has(`${x}, ${y + 1}`))
      return_vals.push([x, y + 1]);
    if (y - 1 >= 0 && !this.visited.has(`${x}${y - 1}`))
      return_vals.push([x, y - 1]);

    return return_vals;
  }
}

export function test_path_finder() {
  const test_data = [
    ["W", "W", "W", "w", "E", "W"],
    ["W", "P", "P", "P", "P", "P"],
    ["W", "S", "W", "W", "W", "W"],
  ];

  const p = new PathFinder(test_data);
  const res = p.path_finder();
  console.log("found path: ", res);
}
