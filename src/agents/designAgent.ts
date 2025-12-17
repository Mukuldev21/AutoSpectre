export function designTests(flows: any[]) {
  return flows.map(f => ({
    flow: f.name,
    priority: f.critical ? 'P0' : 'P1'
  }));
}
