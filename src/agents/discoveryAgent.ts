
export async function discoverFlows(dom: any) {
  const flows = [];
  if (dom.inputs.includes('password')) flows.push({ name: 'Login', critical: true });
  return flows;
}
