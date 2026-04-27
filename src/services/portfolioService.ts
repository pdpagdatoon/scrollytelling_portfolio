import { portfolioData } from "@/data/portfolio";
import type { PortfolioData } from "@/types/portfolio";

export interface PortfolioDataSource {
  getPortfolioData(): Promise<PortfolioData>;
}

export class StaticPortfolioDataSource implements PortfolioDataSource {
  async getPortfolioData(): Promise<PortfolioData> {
    return portfolioData;
  }
}

export class PortfolioService {
  constructor(private readonly dataSource: PortfolioDataSource) {}

  async getPortfolio(): Promise<PortfolioData> {
    return this.dataSource.getPortfolioData();
  }
}

const defaultDataSource = new StaticPortfolioDataSource();
export const portfolioService = new PortfolioService(defaultDataSource);