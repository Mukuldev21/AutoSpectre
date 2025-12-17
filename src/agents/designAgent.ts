
export function designTests(flows: any[]) {
  return flows.map(f => ({ flow: f.name }));
}
