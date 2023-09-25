/*
 *
 * The question is as follows:
 * If we are at a dmv and we need to be serviced, determine
 * how long it will take to get to the front of the line.
 *
 *
 * Given x number of servers, who process people at rate y
 * And n number of people in line ahead of us.
 *
 * Solve for when we will be served.
 *
 */

interface Servers {
  name: string;
  processTime: number;
}
/**
 *
 * @param servers {name: string, processTime: number}
 * @param peopleInLine number
 *
 * @returns number
 *
 * @description This function accepts a number of servers
 * and the amount of time that they take to process each
 * person in line, and then calculates the time in seconds
 * from now until you will be processed.
 *
 */
class server_solver {
  private servers: Servers[] = [];
  private peopleInLine: number = 0;
  private maxTime: number = 0;

  constructor(servers: Servers[], peopleInLine: number) {
    this.servers = servers;
    this.peopleInLine = peopleInLine;
  }

  /*
   *
   * Binary search to find the time we want
   *
   */

  private BSearch(): number {
    /*
     *
     * Create an ordered array from 0 to the maxTime
     *
     */

    const availableTime = Array.from({ length: this.maxTime }, (_, i) => i);
    let max = availableTime.length - 1;
    let min = 0;

    while (min < max) {
      const pivot = Math.floor((max - min) / 2 + min);
      const peopleProcessed = this.peopleProcessedAtPointInTime(
        availableTime[pivot]
      );

      if (peopleProcessed === this.peopleInLine) {
        return pivot;
      }

      if (peopleProcessed > this.peopleInLine) {
        // Look to the bottom half
        max = pivot;
        continue;
      }

      min = pivot + 1;
    }

    return this.maxTime;
  }

  private findMaxTime() {
    let maximumProcesserTime = 0;
    for (const { processTime } of this.servers) {
      if (processTime > maximumProcesserTime) {
        maximumProcesserTime = processTime;
      }
    }
    this.maxTime = this.peopleInLine * maximumProcesserTime;
  }

  /*
   *
   * Solve for people processed at point in time
   *
   */

  private peopleProcessedAtPointInTime(currTime: number): number {
    let peopleProccessed = 0;

    for (const { processTime } of this.servers) {
      peopleProccessed += Math.floor(currTime / processTime);
    }
    return peopleProccessed;
  }

  public findTimeInQue(): number {
    this.findMaxTime();
    return this.BSearch();
  }
}

export function example() {
  const servers: Servers[] = [
    { name: "Dobby", processTime: 20 },
    { name: "ron", processTime: 30 },
    { name: "harry", processTime: 40 },
    { name: "Lupin", processTime: 15 },
  ];

  const dmv_solve = new server_solver(servers, 500);
  console.log("Time until the front: ", dmv_solve.findTimeInQue());
}
