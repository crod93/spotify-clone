export default function fetcher(url: string, data = undefined) {
  return fetch(`${window.location.origin}/api${url}`, {});
}
