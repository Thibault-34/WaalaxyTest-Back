export default class JobScheduler {
  private interval: number;
  private schedulers: Map<String, NodeJS.Timeout> = new Map();
  private job: (id: any) => void;

  public constructor(job: (id: any) => void, interval = 24 * 60 * 60 * 1000) {
    this.interval = interval;
    this.job = job;
  }

  public setScheduler(id: string, timestamp = this.getNextTimestamp(Date.now())) {
    const delay = timestamp - Date.now();
    const scheduler = setInterval(() => {
      this.resetScheduler(id);
      this.job(id);
    }, delay);

    this.schedulers.set(id, scheduler);
  }

  public removeScheduler(id: string) {
    const scheduler = this.schedulers.get(id);
    if (scheduler) clearInterval(scheduler);
  }

  public resetScheduler(id: string) {
    this.removeScheduler(id);
    this.setScheduler(id);
  }

  public getNextTimestamp(lastTimestamp: number) {
    return lastTimestamp + this.interval;
  }
}
