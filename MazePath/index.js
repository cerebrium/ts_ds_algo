"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.test_path_finder = void 0;
/*
 *
 *  Base case:
 *  1. If end return path;
 *  2. If wall return false;
 *  3. If off board return false;
 *  4. If we have seen it return false;
 *
 */
var Options;
(function (Options) {
    Options["Start"] = "S";
    Options["End"] = "E";
    Options["Wall"] = "W";
    Options["Path"] = "P";
})(Options || (Options = {}));
class PathFinder {
    constructor(maze) {
        this.visited = new Set();
        this.maze = maze;
        this.height = maze.length - 1;
        this.width = maze[0].length - 1;
    }
    path_finder() {
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
    _iterate({ target, path, }) {
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
                    if (res)
                        return res;
                }
        }
    }
    determine_sides(location) {
        const [x, y] = location;
        const return_vals = [];
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
function test_path_finder() {
    const test_data = [
        ["W", "W", "W", "w", "E", "W"],
        ["W", "P", "P", "P", "P", "P"],
        ["W", "S", "W", "W", "W", "W"],
    ];
    const p = new PathFinder(test_data);
    const res = p.path_finder();
    console.log("found path: ", res);
}
exports.test_path_finder = test_path_finder;
