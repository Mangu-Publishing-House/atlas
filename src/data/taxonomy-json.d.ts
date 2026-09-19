declare module "@/data/taxonomy.json" {
  const value: {
    source: string;
    generated: string;
    n: number;
    rels: number;
    poly: number;
    tops: number[];
    terms: {
      i: number;
      l: string;
      bt: number[];
      nt: number[];
      d: number;
      n: number;
      f: number;
    }[];
  };
  export default value;
}
